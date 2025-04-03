import React, { useState, useEffect, useRef } from 'react'
import '../App.css'
import { useParams } from 'react-router'
import { ReactReader, ReactReaderStyle, IReactReaderStyle } from 'react-reader'
import { Link } from 'react-router'
import DarkModeToggle from '../components/DarkModeToggle'
import { getBootstrapTheme } from '../utils'



export const Reader = () => {
    const [location, setLocation] = useState(0);
    const [theme, setTheme] = useState(getBootstrapTheme());
    const rendition = useRef(null);
    const { id } = useParams();

    useEffect(() => { 
        const obs = new MutationObserver(() => {
            const newTheme = getBootstrapTheme() 
            setTheme(newTheme);
            console.log('mutation set', newTheme)
        });

        obs.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["data-bs-theme"],
          });
        }, [])

    useEffect(() => {
        if (theme && rendition.current) {
            updateTheme(rendition.current, theme);
        }
    }, [theme]);


    return (
        <>
            <div>
                <div className="p-4 position-relative w-100 overflow-hidden">
                    <Link to="/" className="text-blue-500">back to library</Link>
                    <span style = {{position: 'absolute', right: '20px'}}><DarkModeToggle/></span>
                </div>
                <div style={{ height: '100vh' }}>
                    <ReactReader
                        url={`${process.env.REACT_APP_BACKEND_URL}/book/${id}/file.epub`} // TODO: get rid of this hacky bullshit, why are we just appending file.epub and not using secondary arguments
                        location={location}
                        locationChanged={(epubcfi) => setLocation(epubcfi)}
                        readerStyles={theme === 'dark' ? darkReaderTheme : lightReaderTheme}
                        getRendition={(_rendition) => { 
                            _rendition.on("locationChanged", (loc) => {
                            setLocation(loc.start);
                            });
                            rendition.current = _rendition;
                            updateTheme(_rendition, theme);
                        }}
                    />
                </div>
            </div>
        </>
    )
}

function updateTheme(rendition, theme) {
    const themes = rendition.themes
    switch (theme) {
      case 'dark': {
        themes.override('color', '#fff')
        themes.override('background', '#000')
        break
      }
      case 'light': {
        themes.override('color', '#000')
        themes.override('background', '#fff')
        break
      }
    }
  }

const lightReaderTheme = {
    ...ReactReaderStyle,
    readerArea: {
      ...ReactReaderStyle.readerArea,
      transition: undefined,
    },
  }

const darkReaderTheme = {
    ...ReactReaderStyle,
    arrow: {
      ...ReactReaderStyle.arrow,
      color: 'white',
    },
    arrowHover: {
      ...ReactReaderStyle.arrowHover,
      color: '#ccc',
    },
    readerArea: {
      ...ReactReaderStyle.readerArea,
      backgroundColor: '#000',
      transition: undefined,
    },
    titleArea: {
      ...ReactReaderStyle.titleArea,
      color: '#ccc',
    },
    tocArea: {
      ...ReactReaderStyle.tocArea,
      background: '#111',
    },
    tocButtonExpanded: {
      ...ReactReaderStyle.tocButtonExpanded,
      background: '#222',
    },
    tocButtonBar: {
      ...ReactReaderStyle.tocButtonBar,
      background: '#fff',
    },
    tocButton: {
      ...ReactReaderStyle.tocButton,
      color: 'white',
    },
  }

export default Reader;