import React, { useState, useEffect } from 'react'
import '../App.css'
import { useParams } from 'react-router'
import { ReactReader } from 'react-reader'

export const Reader = () => {
    const [location, setLocation] = useState(0);
    const { id } = useParams();
    //const rendition = useRef(null);

    return (
        <div style={{ height: '100vh' }}>
            <ReactReader
                url={`${process.env.REACT_APP_BACKEND_URL}/book/${id}/file.epub`} // TODO: get rid of this hacky bullshit, why are we just appending file.epub and not using secondary arguments
                location={location}
                //locationChanged={(epubcfi) => setLocation(epubcfi)}
                getRendition={(rendition) => {
                    rendition.on("locationChanged", (loc) => {
                        setLocation(loc.start.cfi)
                    })
                }}
            />
        </div>
    )
}

export default Reader;