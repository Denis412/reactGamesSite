import React from 'react';
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <header className="navbar">
            <section className="navbar__links">
                <div className="left__links">
                    <Link className="navbar__link" to="/">Главная</Link>
                    <Link className="navbar__link" to="/tic-tac-toe">Крестики-Нолики</Link>
                    <Link className="navbar__link" to="/sapper">Сапер</Link>
                </div>
                <div className="right__links">
                    <Link className="navbar__link" to="/about">О сайте</Link>
                </div>
            </section>
        </header>
    );
};

export default Navbar;