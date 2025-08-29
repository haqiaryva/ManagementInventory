<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Request extends Model
{
    protected $table = 'requests';

    protected $fillable = [
        'atk_item_id',
        "nama_barang",
        'tanggal',
        'penerima',
        'unit_id',
        'qty',
        'satuan',
        'pic',
        'status',
    ];

    public function atkItem()
    {
        return $this->belongsTo(AtkItem::class, 'atk_item_id');
    }

}
