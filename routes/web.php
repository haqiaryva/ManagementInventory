<?php

use App\Http\Controllers\AtkItemController;
use App\Http\Controllers\BarangKeluarController;
use App\Http\Controllers\BarangMasukController;
use App\Http\Controllers\RequestController;
use App\Http\Controllers\UnitController;
use App\Http\Controllers\UserController;
use App\Models\BarangKeluar;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// if (config('app.env') === 'production') {
//     \Illuminate\Support\Facades\URL::forceScheme('https');
//     \Illuminate\Support\Facades\URL::forceRootUrl(config('app.url'));
// }

Route::get('/', function () {
    return Inertia::render('auth/login');
})->name('home');

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');

//     Route::get('/atkItems', [AtkItemController::class, 'index'])->name('atkItems.index');
//     Route::get('/atkItems', [AtkItemController::class, 'index'])->name('atkItems.index');
//     // Route::get('/atkItems/create', [AtkItemController::class, 'create'])->name('atkItems.create');
//     // Route::get('/atkItems/habis', [AtkItemController::class, 'habis'])->name('atkItems.habis');
//     Route::get('/atkItems/export-pdf', [AtkItemController::class, 'exportPdf'])->name('atkItems.exportPdf');
//     Route::post('/atkItems/store', [AtkItemController::class, 'store'])->name('atkItems.store');
//     Route::get('/atkItems/{id}/edit', [AtkItemController::class, 'edit'])->name('atkItems.edit');
//     Route::patch('/atkItems/{id}', [AtkItemController::class, 'update'])->name('atkItems.update');

//     Route::get('/barangMasuk', [BarangMasukController::class, 'index'])->name('barangMasuk.index');
//     Route::get('/barangMasuk/create', [BarangMasukController::class, 'create'])->name('barangMasuk.create');
//     Route::post('/barangMasuk/store', [BarangMasukController::class, 'store'])->name('barangMasuk.store');

//     Route::get('/barangKeluar', [BarangKeluarController::class, 'index'])->name('barangKeluar.index');
//     Route::get('/barangKeluar/create', [BarangKeluarController::class, 'create'])->name('barangKeluar.create');
//     Route::post('/barangKeluar/store', [BarangKeluarController::class, 'store'])->name('barangKeluar.store');

//     Route::get('/barangKosong', [AtkItemController::class, 'habis'])->name('barangKosong.index');

//     Route::get('/requests', [RequestController::class, 'index'])->name('requests.index');
//     Route::get('/requests/create', [RequestController::class, 'create'])->name('requests.create');
//     Route::post('/requests/store', [RequestController::class, 'store'])->name('requests.store');
//     Route::patch('/requests/{id}/done', [RequestController::class, 'updateStatus'])->name('requests.updateStatus');

//     Route::get('/units', [UnitController::class, 'index'])->name('unit.index');
//     Route::get('/units/create', [UnitController::class, 'create'])->name('unit.create');
//     Route::post('/units/store', [UnitController::class, 'store'])->name('unit.store');

//     // Route::get('users', [RegisteredUserController::class, 'index'])->name('register.index');
//     // Route::get('users', [RegisteredUserController::class, 'create'])->name('register.create');
//     // // Route::post('users', [RegisteredUserController::class, 'store'])->name('register.store');

//     Route::get('manageUser', [\App\Http\Controllers\UserController::class, 'index'])->name('manageUser.index');
//     Route::get('manageUser/create', [\App\Http\Controllers\UserController::class, 'create'])->name('manageUser.create');
//     Route::post('manageUser/store', [\App\Http\Controllers\UserController::class, 'store'])->name('manageUser.store');
// });

//==========================================================================================================================================

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');

//     Route::get('/atkItems', [AtkItemController::class, 'index'])->name('atkItems.index');
//     Route::post('/atkItems/store', [AtkItemController::class, 'store'])->name('atkItems.store');
//     // Route::get('/atkItems/export-pdf', [AtkItemController::class, 'exportPdf'])->name('atkItems.exportPdf');

//     Route::get('/barangMasuk', [BarangMasukController::class, 'index'])->name('barangMasuk.index');
//     Route::get('/barangMasuk/create', [BarangMasukController::class, 'create'])->name('barangMasuk.create');
//     Route::post('/barangMasuk/store', [BarangMasukController::class, 'store'])->name('barangMasuk.store');

//     Route::get('/barangKeluar', [BarangKeluarController::class, 'index'])->name('barangKeluar.index');
//     Route::get('/barangKeluar/create', [BarangKeluarController::class, 'create'])->name('barangKeluar.create');
//     Route::post('/barangKeluar/store', [BarangKeluarController::class, 'store'])->name('barangKeluar.store');

//     Route::get('/requests', [RequestController::class, 'index'])->name('requests.index');
//     Route::get('/requests/create', [RequestController::class, 'create'])->name('requests.create');
//     Route::post('/requests/store', [RequestController::class, 'store'])->name('requests.store');
//     // Route::patch('/requests/{id}/done', [RequestController::class, 'updateStatus'])->name('requests.updateStatus');

//     // Route::get('/barangKosong', [AtkItemController::class, 'habis'])->name('barangKosong.index');
// });

// // Route khusus superadmin
// Route::middleware(['auth', 'verified', 'role:superadmin'])->group(function () {
//     Route::get('/manageUser', [UserController::class, 'index'])->name('manageUser.index');
//     Route::get('/manageUser/create', [UserController::class, 'create'])->name('manageUser.create');
//     Route::post('/manageUser/store', [UserController::class, 'store'])->name('manageUser.store');

//     Route::get('/units', [UnitController::class, 'index'])->name('unit.index');
//     Route::get('/units/create', [UnitController::class, 'create'])->name('unit.create');
//     Route::post('/units/store', [UnitController::class, 'store'])->name('unit.store');

//     // Route edit ATK (hanya admin)
//     Route::get('/atkItems/{id}/edit', [AtkItemController::class, 'edit'])->name('atkItems.edit');
//     Route::patch('/atkItems/{id}', [AtkItemController::class, 'update'])->name('atkItems.update');
// });

// //Route untuk admin dan superadmin
// Route::middleware(['auth', 'verified', 'role:admin,superadmin'])->group(function () {
//     // Route untuk barang masuk (hanya admin/superadmin)
//     Route::get('/barangMasuk', [BarangMasukController::class, 'approve'])->name('approval.index');
//     Route::get('/barangMasuk/create', [BarangMasukController::class, 'create'])->name('barangMasuk.create');
//     Route::post('/barangMasuk/store', [BarangMasukController::class, 'store'])->name('barangMasuk.store');

//     // Route untuk approval barang keluar
//     Route::get('/approvals', [BarangKeluarController::class, 'approvalIndex'])->name('approvals.index');
//     Route::patch('/approvals/{id}/approve', [BarangKeluarController::class, 'approve'])->name('approvals.approve');
//     Route::patch('/barangKeluar/{id}/reject', [BarangKeluarController::class, 'reject'])->name('barangKeluar.reject');

//     // Route untuk requests (admin bisa update status)
//     Route::patch('/requests/{id}/done', [RequestController::class, 'updateStatus'])->name('requests.updateStatus');

//     // Route untuk tambah/edit ATK (hanya admin/superadmin)
//     Route::post('/atkItems/store', [AtkItemController::class, 'store'])->name('atkItems.store');
// });


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
    Route::get('/approval/{id}/finish', [BarangKeluarController::class, 'finishForm'])->name('approval.finishForm');
    Route::post('/approval/{id}/finish', [BarangKeluarController::class, 'finish'])->name('approval.finish');
    
    // Route untuk requests (admin bisa update status)
    // Route::patch('/requests/{id}/done', [RequestController::class, 'updateStatus'])->name('requests.updateStatus');

    // Route untuk tambah/edit ATK (hanya admin/superadmin)
    Route::post('/atkItems/store', [AtkItemController::class, 'store'])->name('atkItems.store');

    Route::get('/barangKosong', [AtkItemController::class, 'habis'])->name('barangKosong.index');

    Route::get('/requests/{id}/finish', [RequestController::class, 'finishForm'])->name('requests.finishForm');
    Route::post('/requests/{id}/finish', [RequestController::class, 'finish'])->name('requests.finish');
});

// Route khusus superadmin
Route::middleware(['auth', 'verified', 'role:superadmin'])->group(function () {
    Route::get('/manageUser', [UserController::class, 'index'])->name('manageUser.index');
    Route::get('/manageUser/create', [UserController::class, 'create'])->name('manageUser.create');
    Route::post('/manageUser/store', [UserController::class, 'store'])->name('manageUser.store');

    Route::get('/units', [UnitController::class, 'index'])->name('unit.index');
    Route::get('/units/create', [UnitController::class, 'create'])->name('unit.create');
    Route::post('/units/store', [UnitController::class, 'store'])->name('unit.store');

    // Route edit ATK (hanya superadmin)
    Route::get('/atkItems/{id}/edit', [AtkItemController::class, 'edit'])->name('atkItems.edit');
    Route::patch('/atkItems/{id}', [AtkItemController::class, 'update'])->name('atkItems.update');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
