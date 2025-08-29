<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Request as RequestModel;
use App\Models\AtkItem;
use App\Models\BarangMasuk;

class RequestController extends Controller
{
    /**
     * Menampilkan daftar permintaan ATK
     */
    public function index(Request $request)
    {

        $userName = Auth::user()->name;
        $requests = RequestModel::orderBy('created_at', 'desc')->paginate(10);

        // Gunakan secure URL di production environment
        if (config('app.env') === 'production') {
            $requests->withPath(secure_url($request->path()));
        }

        return Inertia::render('requests/index', [
            'requests' => $requests
        ]);
    }

    /**
     * Menampilkan form untuk membuat permintaan ATK baru
     */
    public function create()
    {
        return Inertia::render('requests/create');
    }

    /**
     * Menyimpan permintaan ATK baru ke database
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nama_barang' => 'nullable|string|max:255',
            'tanggal' => 'required|date',
            'penerima' => 'required|string|max:255',
            'qty' => 'required|integer|min:1',
            'satuan' => 'required|string|max:50',
            'pic' => 'required|string|max:255',
        ]);

        // Buat record permintaan baru
        RequestModel::create([
            'nama_barang' => $validatedData['nama_barang'] ?? null,
            'tanggal' => $validatedData['tanggal'],
            'penerima' => $validatedData['penerima'],
            'qty' => $validatedData['qty'],
            'satuan' => $validatedData['satuan'],
            'pic' => Auth::user()->name,
            'status' => 'pending',
        ]);

        return redirect()->route('requests.index')
            ->with('success', 'Permintaan ATK berhasil dikirim!');
    }

    /**
     * Mengarahkan ke form penyelesaian permintaan
     */
    public function updateStatus($id)
    {
        $request = RequestModel::findOrFail($id);
        
        return redirect()->route('requests.finishForm', $id);
    }

    /**
     * Menampilkan form penyelesaian permintaan
     */
    public function finishForm($id)
    {
        $request = RequestModel::findOrFail($id);
        
        // Periksa apakah ini barang baru
        $isBarangBaru = !empty($request->nama_barang) && $request->nama_barang !== 'null';

        return Inertia::render('requests/finish', [
            'request' => $request,
            'isBarangBaru' => $isBarangBaru,
        ]);
    }

    /**
     * Menyelesaikan permintaan dan menambahkan barang ke inventory
     */
    public function finish(Request $request, $id)
    {
        $requestModel = RequestModel::findOrFail($id);
        
        // Validasi input
        $validatedData = $request->validate([
            'kode_barang' => 'required|string|max:255|unique:atk_items,kode_barang',
            'lokasi_simpan' => 'required|string|max:255',
            'qty' => 'required|integer|min:1',
        ]);

        // Buat item ATK baru
        $atkItem = AtkItem::create([
            'nama_barang' => $requestModel->nama_barang,
            'kode_barang' => $validatedData['kode_barang'],
            'qty' => 0, // Akan diupdate setelah barang masuk dicatat
            'satuan' => $requestModel->satuan,
            'lokasi_simpan' => $validatedData['lokasi_simpan'],
        ]);

        // Catat barang masuk
        BarangMasuk::create([
            'atk_item_id' => $atkItem->id,
            'tanggal' => now()->toDateString(),
            'qty' => $validatedData['qty'],
            'satuan' => $requestModel->satuan,
            'pic' => Auth::user()->name,
        ]);

        // Update stok barang
        $atkItem->increment('qty', $validatedData['qty']);

        // Update status permintaan
        $requestModel->update(['status' => 'done']);

        return redirect()->route('barangMasuk.index')
            ->with('success', 'Request selesai & barang masuk dicatat!');
    }

    /**
     * Menolak permintaan dan mengubah status menjadi reject
     */
    public function reject($id)
    {
        $request = RequestModel::findOrFail($id);
        
        // Update status menjadi reject
        $request->update(['status' => 'rejected']);
        
        return redirect()->route('requests.index')
            ->with('success', 'Request berhasil ditolak!');
    }
}