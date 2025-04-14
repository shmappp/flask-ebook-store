import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import '../css/Sidebar.css'

export const Sidebar = () => {
    const [expanded, setExpanded] = useState(false);

    const toggleSidebar = () => {setExpanded(!expanded); console.log(expanded)};

    return (
    <>
        <div>
            <Button onClick={toggleSidebar}></Button>
        </div>
        <aside className='h-screen'>
            <nav className={expanded ? 'nav-menu active' : 'nav-menu'}>
                <ul>
                    <li>
                        <Button onClick={toggleSidebar}></Button>
                    </li>
                </ul>
            </nav>
        </aside>
    </>
    )
}