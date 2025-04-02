import React, { useState, useEffect } from 'react'
import '../App.css'
import { useParams } from 'react-router'
import { ReactReader } from 'react-reader'
import { Link } from 'react-router'

export const Reader = () => {
    const [location, setLocation] = useState(0);
    const { id } = useParams();
    //const rendition = useRef(null);

    return (
        <>
            <div className="flex h-screen">
                <div className="w-1/3 p-4 border-r">
                    <Link to="/" className="text-blue-500">back to library</Link>
                </div>
                <div style={{ height: '100vh' }}>
                    <ReactReader
                        url={`${process.env.REACT_APP_BACKEND_URL}/book/${id}/file.epub`} // TODO: get rid of this hacky bullshit, why are we just appending file.epub and not using secondary arguments
                        location={location}
                        locationChanged={(epubcfi) => setLocation(epubcfi)}
                        getRendition={(rendition) => { 
                            rendition.on("locationChanged", (loc) => {
                                console.log('New location: ', loc)
                                setLocation(loc.start);
                            })
                        }}
                    />
                </div>
            </div>
        </>
    )
}

export default Reader;