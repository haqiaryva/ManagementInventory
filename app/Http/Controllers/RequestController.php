<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Unit;
use App\Models\Request as RequestModel;
use APP\Models\AtkItem;
use App\Models\BarangMasuk;


class RequestController extends Controller
{
    public function index(Request $request)
    {

        $requests = RequestModel::with('unit')->orderBy('created_at', 'desc')->paginate(10);

        if (config('app.env') === 'production') {
            $requests->withPath(secure_url($request->path()));
        }

        return Inertia::render('requests/index', [
            'requests' => $requests
        ]);
    }

    public function create()
    {
        $units = Unit::all();
        return Inertia::render('requests/create', [
            'units' => $units
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            // 'atk_item_id' => 'nullable|exists:atk_items,id',
            'nama_barang' => 'nullable|string|max:255',
            'tanggal' => 'required|date',
            'penerima' => 'required|string|max:255',
            // 'unit_id' => 'required|integer|exists:units,id',
            // 'unit' => 'required|string|max:255',
            'qty' => 'required|integer|min:1',
            'satuan' => 'required|string|max:50',
            'pic' => 'required|string|max:255',
        ]);

        // Pastikan user mengisi salah satu: atk_item_id atau nama_barang_baru
        // if (!$request->atk_item_id && !$request->nama_barang_baru) {
        //     return back()->withErrors(['atk_item_id' => 'Pilih barang atau isi nama barang baru'])->withInput();
        // }

        RequestModel::create([
            // 'atk_item_id' => $request->atk_item_id,
            'nama_barang' => $request->nama_barang ?? 'null', // disimpan jika barang baru
            'tanggal' => $request->tanggal,
            'penerima' => $request->penerima,
            // 'unit_id' => $request->unit_id,
            'qty' => $request->qty,
            'satuan' => $request->satuan,
            'pic' =>  Auth::user()->name,
            'status' => 'pending',
        ]);

        return redirect()->route('requests.index')->with('success', 'Permintaan ATK berhasil dikirim!');
    }

    // (Opsional) Update status oleh admin
    public function updateStatus($id)
    {
        $request = RequestModel::findOrFail($id);

        // Redirect ke form finish, bukan langsung update status
        return redirect()->route('requests.finishForm', $id);
    }


    public function finishForm($id)
    {
        $request = RequestModel::findOrFail($id);

        // Tampilkan form hanya jika barang baru (tidak ada di atk_items)
        $isBarangBaru = !$request->nama_barang || $request->nama_barang === 'null' ? false : true;

        return Inertia::render('requests/finish', [
            'request' => $request,
            'isBarangBaru' => $isBarangBaru,
        ]);
    }

    public function finish(Request $req, $id)
    {
        $requestModel = RequestModel::findOrFail($id);

        // Validasi input
        $rules = [
            'kode_barang' => 'required|string|max:255|unique:atk_items,kode_barang',
            'lokasi_simpan' => 'required|string|max:255',
            'qty' => 'required|integer|min:1', // Tambahkan validasi untuk qty
        ];

        $req->validate($rules);

        // Buat barang baru di atk_items
        $atkItem = \App\Models\AtkItem::create([
            'nama_barang' => $requestModel->nama_barang,
            'kode_barang' => $req->kode_barang,
            'qty' => 0, // Akan ditambah di bawah
            'satuan' => $requestModel->satuan,
            'lokasi_simpan' => $req->lokasi_simpan,
        ]);

        // Catat barang masuk - gunakan qty dari input form, bukan dari model Request
        \App\Models\BarangMasuk::create([
            'atk_item_id' => $atkItem->id,
            'tanggal' => now()->toDateString(),
            'qty' => $req->qty, // Gunakan qty dari input form
            'satuan' => $requestModel->satuan,
            'pic' => Auth::user()->name,
        ]);

        // Update stok - gunakan qty dari input form
        $atkItem->qty += $req->qty;
        $atkItem->save();

        // Update status request
        $requestModel->status = 'done';
        $requestModel->save();

        return redirect()->route('barangMasuk.index')->with('success', 'Request selesai & barang masuk dicatat!');
    }
}
