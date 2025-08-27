<?php

// namespace App\Http\Controllers;

// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Auth;
// use Inertia\Inertia;
// use App\Models\AtkItem;
// use App\Models\Unit;
// use App\Models\BarangKeluar;

// class BarangKeluarController extends Controller
// {
//     public function index(Request $request)
//     {

//         $query = BarangKeluar::with(['atkItem', 'unit']);

//         // Filter tanggal
//         if ($request->filled('start_date')) {
//             $query->whereDate('tanggal', '>=', $request->start_date);
//         }

//         if ($request->filled('end_date')) {
//             $query->whereDate('tanggal', '<=', $request->end_date);
//         }

//         $barangKeluar = $query
//             ->orderBy('tanggal', 'desc')
//             ->orderBy('created_at', 'desc')
//             ->paginate(10)
//             ->withQueryString();

//         // dd($barangKeluar);

//         if (config('app.env') === 'production') {
//             $barangKeluar->setPath(secure_url($request->path()));
//         }

//         return Inertia::render('barangKeluar/index', [
//             'barangKeluar' => $barangKeluar,
//             'filters' => $request->only(['start_date', 'end_date'])
//         ]);
//     }

//     public function create(Request $request)
//     {
//         $atkItem = AtkItem::findOrFail($request->atk_item_id);
//         $units = Unit::all();
//         return inertia('barangKeluar/create', [
//             'atkItem' => $atkItem,
//             'units' => $units
//         ]);
//     }

//     public function store(Request $request)
//     {
//         $request->validate([
//             'atk_item_id' => 'required|exists:atk_items,id',
//             'tanggal' => 'required|date',
//             'qty' => 'required|integer|min:1',
//             'satuan' => 'required|string|max:50', // pastikan satuan diisi
//             'penerima' => 'required|string|max:255',
//             'unit_id' => 'required|integer|exists:units,id',
//             // 'unit' => 'required|string|max:255',
//             'pic' => 'required|string|max:255',
//         ]);

//         $atkItem = AtkItem::findOrFail($request->atk_item_id);
//         $units = Unit::findOrFail($request->unit_id);

//         if ($request->qty > $atkItem->qty) {
//             return back()->withErrors(['qty' => 'Jumlah melebihi stok tersedia.']);
//         }

//         $data = $request->all();
//         $data['pic'] = Auth::user()->name; // pastikan PIC diisi otomatis
//         $data['satuan'] = $atkItem->satuan; // ambil satuan dari item ATK
//         // $data['unit'] = $units->nama_unit;

//         BarangKeluar::create($data);

//         // Kurangi stok
//         $atkItem->qty -= $request->qty;
//         $atkItem->save();

//         return redirect()->route('barangKeluar.index')->with('success', 'Barang berhasil diambil.');
//     }
// }


namespace App\Http\Controllers;

use App\Models\BarangKeluar;
use App\Models\AtkItem;
use App\Models\Unit;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class BarangKeluarController extends Controller
{
    public function index(Request $request)
    {
        $query = BarangKeluar::with(['atkItem', 'unit', 'approver'])
            ->where('status', 'approved');

        // Filter tanggal
        if ($request->filled('start_date')) {
            $query->whereDate('tanggal', '>=', $request->start_date);
        }
        if ($request->filled('end_date')) {
            $query->whereDate('tanggal', '<=', $request->end_date);
        }

        // Filter berdasarkan role
        if (Auth::user()->role === 'user') {
            // User hanya lihat barang keluar yang sudah approved
            $query->where('status', 'approved');
        } else {
            // Admin/Superadmin bisa lihat semua
            if ($request->filled('status')) {
                $query->where('status', $request->status);
            }
        }

        $barangKeluar = $query
            ->orderBy('tanggal', 'desc')
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('barangKeluar/index', [
            'barangKeluar' => $barangKeluar,
            'filters' => $request->only(['start_date', 'end_date', 'status'])
        ]);
    }

    // public function create()
    // {
    //     $atkItems = AtkItem::all();
    //     $units = Unit::all();

    //     return Inertia::render('barangKeluar/create', [
    //         'atkItems' => $atkItems,
    //         'units' => $units
    //     ]);
    // }

    public function create(Request $request)
    {
        // Jika ada atk_item_id, ambil single item
        if ($request->has('atk_item_id')) {
            $atkItem = AtkItem::findOrFail($request->atk_item_id);
            return inertia('barangKeluar/create', [
                'atkItem' => $atkItem, // Kirim sebagai single object
                'units' => Unit::all()
            ]);
        }

        // Jika tidak ada, kirim semua items (untuk case lain)
        return inertia('barangKeluar/create', [
            'atkItems' => AtkItem::all(),
            // 'units' => Unit::all()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'tanggal' => 'required|date',
            'penerima' => 'required|string',
            // 'unit_id' => 'required|exists:units,id',
            'atk_item_id' => 'required|exists:atk_items,id',
            'qty' => 'required|integer|min:1',
            'satuan' => 'required|string',
        ]);

        // Cek stok tersedia
        $atkItem = AtkItem::findOrFail($request->atk_item_id);
        if ($atkItem->qty < $request->qty) {
            return redirect()->back()->withErrors(['qty' => 'Stok tidak mencukupi. Stok tersedia: ' . $atkItem->qty]);
        }

        // Buat barang keluar dengan status pending
        BarangKeluar::create([
            'tanggal' => $request->tanggal,
            'penerima' => $request->penerima,
            // 'unit_id' => $request->unit_id,
            'atk_item_id' => $request->atk_item_id,
            'qty' => $request->qty,
            'satuan' => $request->satuan,
            'pic' => Auth::user()->name,
            'status' => 'pending', // Default status pending
        ]);

        return redirect()->route('atkItems.index')->with('success', 'Permintaan barang keluar berhasil diajukan! Menunggu approval.');
    }

    // Method untuk approval
    public function approvalIndex(Request $request)
    {
        $query = BarangKeluar::with(['atkItem', 'unit', 'approver'])
            ->where('status', 'pending')
            ->latest();

        $requests = $query->paginate(10)->withQueryString();


        return Inertia::render('approval/index', [
            'requests' => $requests,
            'filters' => $request->all()
        ]);
    }

    public function approve($id)
    {
        $barangKeluar = BarangKeluar::findOrFail($id);

        // Cek stok tersedia
        $atkItem = $barangKeluar->atkItem;
        if ($atkItem->qty < $barangKeluar->qty) {
            return redirect()->back()->withErrors(['qty' => 'Stok tidak mencukupi. Stok tersedia: ' . $atkItem->qty]);
        }

        // Update status menjadi approved
        $barangKeluar->update([
            'status' => 'approved',
            'approved_by' => Auth::id(),
            'approved_at' => now(),
        ]);

        // Kurangi stok ATK
        $atkItem->decrement('qty', $barangKeluar->qty);

        return redirect()->back()->with('success', 'Permintaan barang keluar berhasil disetujui!');
    }

    public function finishForm($id)
{
    $barangKeluar = BarangKeluar::with('atkItem')->findOrFail($id);

    return Inertia::render('approval/finish', [
        'request' => [
            'id' => $barangKeluar->id,
            'nama_barang' => $barangKeluar->atkItem->nama_barang,
            'kode_barang' => $barangKeluar->atkItem->kode_barang,
            'lokasi_simpan' => $barangKeluar->atkItem->lokasi_simpan,
            'qty' => $barangKeluar->qty,
            'satuan' => $barangKeluar->satuan,
            'stok_aktual' => $barangKeluar->atkItem->qty,
            // ✅ Tambahkan field yang diperlukan
            'atk_item_id' => $barangKeluar->atk_item_id,
            'penerima' => $barangKeluar->penerima,
        ],
    ]);
}

// Method finish - perbaiki logic untuk memastikan data tersimpan
public function finish(Request $request, $id)
{
    $request->validate([
        'qty' => 'required|integer|min:1',
    ]);

    // ✅ Cari record yang sudah ada
    $barangKeluar = BarangKeluar::findOrFail($id);
    
    // ✅ Validasi stok sebelum update
    $atkItem = AtkItem::findOrFail($barangKeluar->atk_item_id);
    if ($atkItem->qty < $request->qty) {
        return back()->withErrors([
            'qty' => "Stok tidak mencukupi. Stok tersedia: {$atkItem->qty}"
        ]);
    }

    // ✅ Update record yang sudah ada dengan status approved
    $barangKeluar->update([
        'qty' => $request->qty,
        'status' => 'approved',
        'approved_by' => Auth::id(),
        'approved_at' => now(),
        'tanggal' => now()->toDateString(), // ✅ Set tanggal saat ini
    ]);

    // ✅ Kurangi stok barang
    $atkItem->decrement('qty', $request->qty);

    return redirect()->route('barangKeluar.index')
        ->with('success', 'Barang keluar berhasil dicatat!');
}

    // public function reject(Request $request, $id)
    // {
    //     $request->validate([
    //         'rejection_reason' => 'required|string|max:500',
    //     ]);

    //     $barangKeluar = BarangKeluar::findOrFail($id);

    //     $barangKeluar->update([
    //         'status' => 'rejected',
    //         'approved_by' => Auth::id(),
    //         'approved_at' => now(),
    //         'rejection_reason' => $request->rejection_reason,
    //     ]);

    //     return redirect()->back()->with('success', 'Permintaan barang keluar berhasil ditolak!');
    // }
}
