<?php

namespace App\Http\Controllers;

use App\Models\AtkItem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class AtkItemController extends Controller
{
    public function index(Request $request)
    {
        $query = AtkItem::query();
        //Pencarian
        if ($request->filled('q')) {
            $q = $request->q;
            $query->where(function ($sub) use ($q) {
                $sub->where('nama_barang', 'like', "%$q%")
                    ->orWhere('kode_barang', 'like', "%$q%");
            });
        }

        //Filter sort
        if ($request->filled('sort_qty')) {
            $sort = $request->sort_qty == 'asc' ? 'asc' : 'desc';
            $query->orderBy('qty', $sort)->orderBy('nama_barang', 'asc');
        } else {
            $query->orderBy('kode_barang', 'asc');
        }

        $items = $query->paginate(10)->withQueryString();

        // Ensure HTTPS URLs in production
        if (config('app.env') === 'production') {
            $items->setPath(secure_url($request->path()));
        }

        return Inertia::render('atkItems/index', [
            'filters' => [
                'q' => $request->q,
                'sort_qty' => $request->sort_qty,
            ],
            'items' => $items,
        ]);
    }


    public function create()
    {
        return view('atk_items.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_barang' => 'required|string|max:255',
            'kode_barang' => 'required|string|unique:atk_items',
            'qty' => 'required|integer|min:0',
            'satuan' => 'required|string|max:50',
            'lokasi_simpan' => 'required|string|max:255',
        ]);

        AtkItem::create($request->all());

        return redirect()->route('atkItems.index')->with('success', 'Barang berhasil ditambahkan!');
    }

    public function show($id)
    {
        $item = AtkItem::findOrFail($id);
        return view('atk_items.show', compact('item'));
    }

    public function habis()
    {
        $barangKosong = AtkItem::where('qty', 0)
            ->paginate(10); // ambil barang dengan qty 0
        return Inertia::render('barangKosong/index', [
            'barangKosong' => $barangKosong,
        ]);
    }

    public function exportPdf()
    {
        $items = AtkItem::where('qty', 0)->get();  // atau query sesuai kebutuhan
        $pdf = Pdf::loadView('barang_kosong.pdf', compact('items'));
        return $pdf->stream('LaporanBarangKosong.pdf');
    }

    public function edit($id)
    {
        $item = AtkItem::findOrFail($id);
        return Inertia::render('atkItems/edit', [
            'item' => $item,
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nama_barang' => 'required|string|max:255',
            'kode_barang' => 'required|string|unique:atk_items,kode_barang,' . $id,
            'qty' => 'required|integer|min:0',
            'satuan' => 'required|string|max:50',
            'lokasi_simpan' => 'required|string|max:255',
        ]);

        $item = AtkItem::findOrFail($id);
        $item->update($request->all());

        return redirect()->route('atkItems.index')->with('success', 'Barang berhasil diupdate!');
    }
}
