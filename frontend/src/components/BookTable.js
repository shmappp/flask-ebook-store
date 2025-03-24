import React, { useState, useEffect } from 'react'
import { checkUrl } from '../utils'

const BookTable = () => {
    const [bookData, setBookData] = useState([])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/book_list`)
            .then((response) => response.json())
            .then((data) => setBookData(data))
            .catch((error) => console.error("Error fetching data", error))
    }, [])

    return (
        <table className='bookTable' border='1'>
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
                        <td>checkUrl({book.identifier}) ?
                            <a href={book.identifier}>{book.identifier}
                                :
                            {book.identifier}</a></td>
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
        </table>
    );
}

export default BookTable;