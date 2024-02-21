<?php

// Simulate data storage
$books = [
    ['id' => 1, 'title' => 'Harry Potter and the Sorcerer\'s Stone', 'author' => 'J.K. Rowling'],
    ['id' => 2, 'title' => 'The Hobbit', 'author' => 'J.R.R. Tolkien'],
    ['id' => 3, 'title' => 'To Kill a Mockingbird', 'author' => 'Harper Lee']
];

// Get all books
function getBooks()
{
    global $books;
    return json_encode($books);
}

// Get a single book by ID
function getBookById($id)
{
    global $books;
    foreach ($books as $book) {
        if ($book['id'] == $id) {
            return json_encode($book);
        }
    }
    return json_encode(['error' => 'Book not found']);
}

// Add a new book
function addBook($data)
{
    global $books;
    $newBook = json_decode($data, true);
    $newBook['id'] = count($books) + 1;
    $books[] = $newBook;
    return json_encode(['message' => 'Book added successfully', 'book' => $newBook]);
}
