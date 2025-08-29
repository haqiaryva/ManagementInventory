<?php

namespace App\Http\Controllers;

use App\Models\BarangKeluar;
use App\Models\AtkItem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class BarangKeluarController extends Controller
{
    /**
     * Menampilkan daftar barang keluar dengan filter
     */
    public function index(Request $request)
    {
        $query = BarangKeluar::with(['atkItem', 'approver'])
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

    /**
     * Menampilkan form untuk membuat barang keluar baru
     */
    public function create(Request $request)
    {
        // Jika ada atk_item_id, ambil single item
        if ($request->has('atk_item_id')) {
            $atkItem = AtkItem::findOrFail($request->atk_item_id);
            
            return Inertia::render('barangKeluar/create', [
                'atkItem' => $atkItem, // Kirim sebagai single object
            ]);
        }

        // Jika tidak ada, kirim semua items (untuk case lain)
        return Inertia::render('barangKeluar/create', [
            'atkItems' => AtkItem::all(),
        ]);
    }

    /**
     * Menyimpan data barang keluar baru
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'tanggal' => 'required|date',
            'penerima' => 'required|string',
            'atk_item_id' => 'required|exists:atk_items,id',
            'qty' => 'required|integer|min:1',
            'satuan' => 'required|string',
        ]);

        // Cek stok tersedia
        $atkItem = AtkItem::findOrFail($validatedData['atk_item_id']);
        
        if ($atkItem->qty < $validatedData['qty']) {
            return redirect()->back()->withErrors([
                'qty' => 'Stok tidak mencukupi. Stok tersedia: ' . $atkItem->qty
            ]);
        }

        // Buat barang keluar dengan status pending
        BarangKeluar::create([
            'tanggal' => $validatedData['tanggal'],
            'penerima' => $validatedData['penerima'],
            'atk_item_id' => $validatedData['atk_item_id'],
            'qty' => $validatedData['qty'],
            'satuan' => $validatedData['satuan'],
            'pic' => Auth::user()->name,
            'status' => 'pending', // Default status pending
        ]);

        return redirect()->route('atkItems.index')
            ->with('success', 'Permintaan barang keluar berhasil diajukan! Menunggu approval.');
    }

    /**
     * Menampilkan daftar permintaan yang perlu approval
     */
    public function approvalIndex(Request $request)
    {
        $query = BarangKeluar::with(['atkItem', 'approver'])
            ->where('status', 'pending')
            ->latest();

        $requests = $query->paginate(10)->withQueryString();

        return Inertia::render('approval/index', [
            'requests' => $requests,
            'filters' => $request->all()
        ]);
    }

    /**
     * Menyetujui permintaan barang keluar
     */
    public function approve($id)
    {
        $barangKeluar = BarangKeluar::findOrFail($id);

        // Cek stok tersedia
        $atkItem = $barangKeluar->atkItem;
        
        if ($atkItem->qty < $barangKeluar->qty) {
            return redirect()->back()->withErrors([
                'qty' => 'Stok tidak mencukupi. Stok tersedia: ' . $atkItem->qty
            ]);
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

    /**
     * Menolak permintaan barang keluar
     */
    public function reject(Request $request, $id)
    {
        $validatedData = $request->validate([
            'rejection_reason' => 'required|string|max:500',
        ]);

        $barangKeluar = BarangKeluar::findOrFail($id);

        $barangKeluar->update([
            'status' => 'rejected',
            'approved_by' => Auth::id(),
            'approved_at' => now(),
            'rejection_reason' => $validatedData['rejection_reason'],
        ]);

        return redirect()->back()->with('success', 'Permintaan barang keluar berhasil ditolak!');
    }

    /**
     * Menampilkan form penyelesaian barang keluar
     */
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
                'atk_item_id' => $barangKeluar->atk_item_id,
                'penerima' => $barangKeluar->penerima,
            ],
        ]);
    }

    /**
     * Menyelesaikan proses barang keluar
     */
    public function finish(Request $request, $id)
    {
        $validatedData = $request->validate([
            'qty' => 'required|integer|min:1',
        ]);

        // Cari record yang sudah ada
        $barangKeluar = BarangKeluar::findOrFail($id);

        // Validasi stok sebelum update
        $atkItem = AtkItem::findOrFail($barangKeluar->atk_item_id);
        
        if ($atkItem->qty < $validatedData['qty']) {
            return back()->withErrors([
                'qty' => "Stok tidak mencukupi. Stok tersedia: {$atkItem->qty}"
            ]);
        }

        // Update record yang sudah ada dengan status approved
        $barangKeluar->update([
            'qty' => $validatedData['qty'],
            'status' => 'approved',
            'approved_by' => Auth::id(),
            'approved_at' => now(),
            'tanggal' => now()->toDateString(),
        ]);

        // Kurangi stok barang
        $atkItem->decrement('qty', $validatedData['qty']);

        return redirect()->route('barangKeluar.index')
            ->with('success', 'Barang keluar berhasil dicatat!');
    }

    /**
     * Menampilkan informasi barang keluar untuk user
     */
    public function information(Request $request)
    {
        $userName = Auth::user()->name;

        $requests = BarangKeluar::with('atkItem')
            ->whereIn('status', ['approved', 'rejected', 'pending'])
            ->where(function ($q) use ($userName) {
                $q->where('penerima', $userName)
                    ->orWhere('pic', $userName);
            })
            ->orderBy('tanggal', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('information/index', [
            'requests' => $requests,
        ]);
    }
}