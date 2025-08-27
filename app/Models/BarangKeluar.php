<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BarangKeluar extends Model
{
    protected $table = 'barang_keluars';

    protected $fillable = [
        'atk_item_id',
        'tanggal',
        'penerima',
        'unit_id',
        'qty',
        'satuan',
        'pic',
        'status', 
        'approved_by',
        'approved_at',
    ];
    public function atkItem()
    {
        return $this->belongsTo(AtkItem::class, 'atk_item_id');
    }

    public function unit()
    {
        return $this->belongsTo(Unit::class, 'unit_id');
    }

    public function approver()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }
}
