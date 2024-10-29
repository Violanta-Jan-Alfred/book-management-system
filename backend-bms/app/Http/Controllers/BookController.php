<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    // GET /api/books - List all books
    public function index()
    {
        return Book::all();
    }

    // GET /api/books/{id} - Show details of a specific book
    public function show($id)
    {
        $book = Book::find($id);
        return $book ? $book : response()->json(['error' => 'Book not found'], 404);
    }

    // POST /api/books - Create a new book
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'published_year' => 'required|integer',
            'genre' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $book = Book::create($validatedData);
        return response()->json($book, 201);
    }

    // PUT /api/books/{id} - Update an existing book
    public function update(Request $request, $id)
    {
        $book = Book::find($id);
        if (!$book) {
            return response()->json(['error' => 'Book not found'], 404);
        }

        $validatedData = $request->validate([
            'title' => 'string|max:255',
            'author' => 'string|max:255',
            'published_year' => 'integer',
            'genre' => 'string|max:255',
            'description' => 'string',
        ]);

        $book->update($validatedData);
        return response()->json($book);
    }

    // DELETE /api/books/{id} - Delete a book
    public function destroy($id)
    {
        $book = Book::find($id);
        if (!$book) {
            return response()->json(['error' => 'Book not found'], 404);
        }

        $book->delete();
        return response()->json(['message' => 'Book deleted successfully']);
    }
}
