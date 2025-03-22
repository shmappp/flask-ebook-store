import React, { useState, useEffect } from 'react';
import Toggle from './Toggle';

export const DarkModeToggle = () => {
    const [darkToggle, setDarkToggle] = useState(
        document.documentElement.getAttribute('data-theme') === 'dark'
    );

    const setBackground = () => {
        document.body.style.backgroundColor = darkToggle ? '#121212' : '#f4f4f4';
        document.body.style.color = darkToggle ? '#ffffff' : '#000000';
        
    }
    
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme == 'dark') {
            setDarkToggle(true);
            }
        else if (savedTheme == 'light') {
            setDarkToggle(false);
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