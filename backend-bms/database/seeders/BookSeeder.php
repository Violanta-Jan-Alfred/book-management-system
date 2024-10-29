<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Book;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Book::create([
            'title' => 'The Great Gatsby',
            'author' => 'F. Scott Fitzgerald',
            'published_year' => 1925,
            'genre' => 'Classic Fiction',
            'description' => 'A novel set in the Roaring Twenties, exploring themes of wealth and social upheaval.',
        ]);

        Book::create([
            'title' => 'To Kill a Mockingbird',
            'author' => 'Harper Lee',
            'published_year' => 1960,
            'genre' => 'Historical Fiction',
            'description' => 'A story of racial injustice and childhood innocence in the American South.',
        ]);
    }
}
