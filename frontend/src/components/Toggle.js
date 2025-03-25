import React, { useState, useEffect } from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton'

const Toggle = ( { initialState, onToggle, labelOn, labelOff }) => {
    const [toggled, setToggled] = useState(initialState);

    useEffect(() => {
        setToggled(initialState);
    }, [initialState]);

    const handleToggle = () => {
        const newState = !toggled
        setToggled(newState);
        onToggle();
    };

    return (
        <ToggleButton 
            onClick={(e) => handleToggle()}
            variant={toggled ? 'dark' : 'light'}
        >
            {toggled ? labelOn: labelOff}
        </ToggleButton>    
    );
};

export default Toggle;  