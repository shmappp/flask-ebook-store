import React, { useState, useEffect } from 'react';
import Toggle from './Toggle';

const DarkModeToggle = () => {
    const [darkToggle, setDarkToggle] = useState(
        document.documentElement.getAttribute('data-bs-theme') === 'dark'
    );

    const setBackground = () => {
        document.documentElement.setAttribute('data-bs-theme', darkToggle ? 'dark' : 'light');
        
    }
    
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme === 'dark') {
            setDarkToggle(true);
            }
        else if (savedTheme === 'light') {
            setDarkToggle(false);
        }
        else {
            setDarkToggle(true);
        };
    }, []);

    useEffect(() => {
        setBackground();
    }, [darkToggle]);

    const darkModeToggle = () => {
        const newState = !darkToggle
        setDarkToggle(newState);
        localStorage.setItem('theme', newState ? 'dark' : 'light');
      };
    
    return (
        <Toggle 
            initialState={darkToggle}
            onToggle={darkModeToggle}
            labelOn='🌙'
            labelOff='🔆'
        /> 
    );
} 

export default DarkModeToggle;