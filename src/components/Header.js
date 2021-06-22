import React from 'react';
import { Link } from 'gatsby';
import TransitionLink from 'gatsby-plugin-transition-link';
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import '../styles/header.css';

export default function Header({title, click}) {
    return (
        <div className="header">
            <nav className="nav">
                <ul className="nav-links">
                    <li className="nav-link">
                        <Link to="/subscribe">
                            <button className="btn">Subscribe</button>
                        </Link>  
                    </li>
                    <li id="about-link" className="nav-link">
                        <Link to="/">Home</Link>
                    </li>
                    <li id="about-link" className="nav-link">
                        <AniLink paintDrip to="/about">About</AniLink>
                    </li>
                    <li id="about-link" className="nav-link">
                        <Link to="/contact">Contact</Link>
                    </li>
                </ul>
            </nav>
            <h2 className="title"><Link to="/">{title}</Link></h2>
            <button className="hamburger" onClick={click} onKeyDown={click}>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </button>   
        </div>
    )
}
