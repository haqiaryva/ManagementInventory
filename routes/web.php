<?php

use App\Http\Controllers\AtkItemController;
use App\Http\Controllers\BarangKeluarController;
use App\Http\Controllers\BarangMasukController;
use App\Http\Controllers\RequestController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('auth/login');
})->name('home');

//=====================================================================================================================================

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Route untuk semua user
    Route::get('/atkItems', [AtkItemController::class, 'index'])->name('atkItems.index');
    Route::get('/atkItems/export-pdf', [AtkItemController::class, 'exportPdf'])->name('atkItems.exportPdf');

    // Route untuk user bisa ambil barang
    Route::get('/barangKeluar', [BarangKeluarController::class, 'index'])->name('barangKeluar.index');
    Route::get('/barangKeluar/create', [BarangKeluarController::class, 'create'])->name('barangKeluar.create');
    Route::post('/barangKeluar/store', [BarangKeluarController::class, 'store'])->name('barangKeluar.store');

    // Route untuk requests (semua user)
    Route::get('/requests', [RequestController::class, 'index'])->name('requests.index');
    Route::get('/requests/create', [RequestController::class, 'create'])->name('requests.create');
    Route::post('/requests/store', [RequestController::class, 'store'])->name('requests.store');

    // Route untuk halaman information
    Route::get('/information', [BarangKeluarController::class, 'information'])->name('information.index');
});

// Route khusus admin dan superadmin
Route::middleware(['auth', 'verified', 'role:admin,superadmin'])->group(function () {
    // Route untuk barang masuk (hanya admin/superadmin)
    Route::get('/barangMasuk', [BarangMasukController::class, 'index'])->name('barangMasuk.index');
    Route::get('/barangMasuk/create', [BarangMasukController::class, 'create'])->name('barangMasuk.create');
    Route::post('/barangMasuk/store', [BarangMasukController::class, 'store'])->name('barangMasuk.store');

    // Route untuk approval barang keluar
    Route::get('/approval', [BarangKeluarController::class, 'approvalIndex'])->name('approval.index');
    Route::patch('/approval/{id}/approve', [BarangKeluarController::class, 'approve'])->name('approval.approve');
    Route::post('/approval/{id}/reject', [BarangKeluarController::class, 'reject'])->name('approval.reject');
    Route::get('/approval/{id}/finish', [BarangKeluarController::class, 'finishForm'])->name('approval.finishForm');
    Route::post('/approval/{id}/finish', [BarangKeluarController::class, 'finish'])->name('approval.finish');

    // Route untuk tambah/edit ATK (hanya admin/superadmin)
    Route::post('/atkItems/store', [AtkItemController::class, 'store'])->name('atkItems.store');

    // Route untuk lihat barang yang stoknya 0
    Route::get('/barangKosong', [AtkItemController::class, 'habis'])->name('barangKosong.index');

    // Route untuk penyelesaian requests
    Route::get('/requests/{id}/finish', [RequestController::class, 'finishForm'])->name('requests.finishForm');
    Route::post('/requests/{id}/finish', [RequestController::class, 'finish'])->name('requests.finish');
    Route::get('/requests/{id}/reject', [RequestController::class, 'reject'])->name('requests.reject');
});

// Route khusus superadmin
Route::middleware(['auth', 'verified', 'role:superadmin'])->group(function () {
    // Route manage user (hanya superadmin)
    Route::get('/manageUser', [UserController::class, 'index'])->name('manageUser.index');
    Route::get('/manageUser/create', [UserController::class, 'create'])->name('manageUser.create');
    Route::post('/manageUser/store', [UserController::class, 'store'])->name('manageUser.store');

    // Route edit ATK (hanya superadmin)
    Route::get('/atkItems/{id}/edit', [AtkItemController::class, 'edit'])->name('atkItems.edit');
    Route::patch('/atkItems/{id}', [AtkItemController::class, 'update'])->name('atkItems.update');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
