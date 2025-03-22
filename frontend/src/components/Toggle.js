import React, { useState, useEffect } from 'react';

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
        <button onClick={handleToggle}>
            {toggled ? labelOn: labelOff}
        </button>    
    );
};

export default Toggle;  