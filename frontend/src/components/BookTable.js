import React, { useState, useEffect } from 'react'
import { checkUrl } from '../utils'
import Table from 'react-bootstrap/Table'

const BookTable = ({ bookData }) => {

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>id</th>
                    <th>title</th>
                    <th>author</th>
                    <th>identifier</th>
                    <th>epub_file</th>
                    <th>uploaded_at</th>
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
                        <td>{book.uploaded_at}</td>
                    </tr>
                ))
                ) : (
                    <tr>
                        <td colSpan='4'>No values found</td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
}

export default BookTable;