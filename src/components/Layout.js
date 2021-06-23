import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import Header from './Header';
import Footer from './Footer';
import '../styles/layout.css';

export default function Layout({children}) {

    const [dropdownClass, setDropdownClass] = useState("dropdown")

    function handleHamburgerClick() {
        setDropdownClass(dropdownClass === "dropdown_open" ? "dropdown_close" : "dropdown_open")
        console.log('clicked')
    }

    console.log(dropdownClass)

    const data = useStaticQuery(graphql`
        query layoutQuery {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `)
    const title = data.site.siteMetadata.title;

    return (
        <div className="layout">
            <Header title={title} click={handleHamburgerClick} />
            <div className={dropdownClass}>
                <ul className="dropdown_links">
                    {/* <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li>
                        <Link to="/subscribe"><button className="sidebar-btn">Subscribe to Newsletter</button></Link>
                    </li> */}
                    <li>
                        <AniLink swipe top="exit" to="/">Home</AniLink>
                    </li>
                    <li>
                        <AniLink swipe top="exit" to="/about">About</AniLink>
                    </li>
                    <li>
                        <AniLink swipe top="exit" to="/contact">Contact</AniLink>
                    </li>
                    <li>
                        <AniLink swipt top="exit" to="/subscribe"><button className="sidebar-btn">Subscribe to Newsletter</button></AniLink>
                    </li>
                </ul>
            </div>
            <main className="main">{children}</main>
            <Footer title={title} />
        </div>
    )
}

 
