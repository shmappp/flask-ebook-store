import React, { useState } from 'react'
import Button from 'react-bootstrap/esm/Button';

const UploadButton = ({ callback }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = ({ target }) => {
        if (target.files) {
            setFile(target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (file) {
            console.log('Uploading file...');
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/upload`, {
                method: 'POST',
                body: formData
            });

            const data = await result.json();
            console.log(data);

            callback();
        } catch (error) {
            console.error('Error uploading file', error);
        }

    };

    return (
        <>
        <div>
            <input 
                id='epub-file-upload' 
                type='file' 
                onChange={handleFileChange}
                className='choose-file-box'
            />
        </div>
        {file && (
            <section>
                File details:
                <ul>
                    <li>Filename: {file.name}</li>
                    <li>File type: {file.type}</li>
                    <li>File size: {file.size} bytes</li>
                </ul>
            </section>
        )}
        {file && (
            <Button
                onClick={handleUpload}>
            Upload
            </Button>
        )}
        </>
    )
 }

 export default UploadButton;