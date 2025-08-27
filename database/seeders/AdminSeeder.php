<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'name' => 'Super Admin',
                'email' => 'SuperAdmin1',
                'role' => 'superadmin',
                'password' => Hash::make('SuperAdmin123'),
            ],
            [
                'name' => 'Admin1',
                'email' => 'Admin1',
                'role' => 'admin',
                'password' => Hash::make('Admin123'),
            ],
            [
                'name' => 'Admin2',
                'email' => 'Admin2',
                'role' => 'admin',
                'password' => Hash::make('WitelJakut'),
            ]
        ]);
    }
}
