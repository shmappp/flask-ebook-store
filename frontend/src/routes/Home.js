import React, { useState, useEffect } from 'react';
import '../App.css';
import DarkModeToggle from '../components/DarkModeToggle.js';
import BookTable from '../components/BookTable.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import UploadButton from '../components/UploadEpubButton.js';

export const Home = () => {
  const [bookData, setBookData] = useState([])

  const fetchBooks = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/book_list`)
    .then((response) => response.json())
    .then((data) => setBookData(data))
    .catch((error) => console.error("Error fetching data", error))
  }
  
  useEffect(() => {
    fetchBooks();
  }, [])


  return (
      <div className="App">
        <div style={{ position: 'absolute', right: '20px' }}>
          <DarkModeToggle/>
        </div>
      <br/>
      <h1>.epub store</h1>
      <br/>
      <Container className='justify-content-md-center align-items-center'>
        <Row>
      <div className='upload-section'>
        <h4>Upload file</h4>
        <UploadButton fetchBooks={fetchBooks}/>
      </div>
        </Row>
      </Container>
      <br/>
      <Container className='justify-content-md-center align-items-center'>
          <div className='center'>
              <BookTable bookData={bookData} fetchBooks={fetchBooks} />
          </div>
      </Container>
      </div>
  );
}

export default Home;
