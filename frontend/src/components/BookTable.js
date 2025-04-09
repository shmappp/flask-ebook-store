import React, { useState, useEffect } from 'react'
import { checkUrl } from '../utils'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/esm/Button'
import { Link } from 'react-router'

const BookTable = ({ bookData, fetchBooks }) => {

    const handleDeleteClick = async (book) => {
        const confirm = window.confirm(`confirm delete book ${book.id}?`)
        if (confirm) {
            try {
                const result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/remove_book`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({id: book.id})
                });

                const data = await result.json();
                console.log(data);

                fetchBooks();
            } catch (error) {
                console.error('Error deleting file', error);
            }
        } else {
            console.log(`deletion of book ${book.id} cancelled`);
        }

    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>id</th>
                    <th>title</th>
                    <th>author</th>
                    <th>identifier</th>
                    <th>epub_file</th>
                    <th>owner</th>
                    <th>uploaded_at</th>
                    <th>word_count</th>
                    <th>read</th>
                    <th>delete?</th>
                </tr>
            </thead>
            <tbody>
                {bookData.length > 0 ? (
                    bookData.map((book) => (
                    <tr key={book.id}>
                        <td>{book.id}</td>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{checkUrl(book.identifier) ? (
                            <a href={book.identifier} 
                                target='_blank' 
                                rel='noopener noreferrer'>{book.identifier}</a>
                        )
                            :
                        (book.identifier)}</td>
                        <td>{book.epub_file}</td>
                        <td>{book.owner}</td>
                        <td>{book.uploaded_at}</td>
                        <td>{book.word_count}</td>
                        <td><Link to={`/read/${book.id}`}><Button /></Link></td>
                        <td><Button onClick={() => handleDeleteClick(book)} /></td>
                    </tr>
                ))
                ) : (
                    <tr>
                        <td colSpan='10'>No values found</td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
}

export default BookTable;