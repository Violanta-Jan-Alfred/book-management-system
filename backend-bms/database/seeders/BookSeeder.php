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

        Book::create([
            'title' => '1984',
            'author' => 'George Orwell',
            'published_year' => 1949,
            'genre' => 'Dystopian Fiction',
            'description' => 'A novel that explores a totalitarian society under constant surveillance and control.',
        ]);
        
        Book::create([
            'title' => 'Pride and Prejudice',
            'author' => 'Jane Austen',
            'published_year' => 1813,
            'genre' => 'Romantic Fiction',
            'description' => 'A story of manners, upbringing, and marriage in early 19th-century England.',
        ]);
        
        Book::create([
            'title' => 'The Catcher in the Rye',
            'author' => 'J.D. Salinger',
            'published_year' => 1951,
            'genre' => 'Coming-of-Age Fiction',
            'description' => 'A novel about teenage rebellion and alienation in post-war America.',
        ]);
        
    }
}
