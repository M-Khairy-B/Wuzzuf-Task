import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    const closeNav = () => {
        setIsNavOpen(false);
    };

    return (
        <>
            <header>
                <nav className="navbar">
                    <div className="container-main">
                        <div className="logo">
                            <Link to="/" className="logo-main" onClick={closeNav}>
                                <h1>JobsNow</h1>
                            </Link>
                        </div>
                        <button className="navbar-toggle" onClick={toggleNav}>
                            ☰
                        </button>
                        <div className={`navbar-collapse-main ${isNavOpen ? 'open' : ''}`}>
                            <ul className="lists-nav">
                                <li>
                                    <NavLink to="/" className="main-list" onClick={closeNav}>
                                        Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/jobs/search" className="main-list" onClick={closeNav}>
                                        Search
                                    </NavLink>
                                </li>
                                <li>
                                    <Link to="#" className="main-list" onClick={closeNav}>
                                        History
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>      
                </nav>
            </header>
        </>
    );
}
