import React from 'react';
import {Link } from 'react-router-dom';

const Header = () => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
            <Link to="/productos" className="navbar-brand">
                React CRUD & Routing
            </Link>

            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link 
                        to='/productos'
                        className="nav-link"
                        >Productos</Link>
                </li>
                <li className="nav-item">
                    <Link 
                        to='/nuevo-producto'
                        className="nav-link"
                        >Nuevo Producto</Link>
                </li>
            </ul>

        </div>
    </nav>
)

export default Header;