<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Book; 

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(BookSeeder::class);
        Book::factory()->count(10)->create(); 
    }
}
