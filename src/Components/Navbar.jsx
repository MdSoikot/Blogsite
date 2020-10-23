import React from 'react';
import { Link } from 'react-router-dom';


export default function Navbar(props) {
    // console.log(props.isAuthenticated);
    return (
        <nav className="navbar">
            <div className="brand grid-item1">
                <Link exact="true" to="/homepage">Blogsite</Link>
            </div>
            <div className="menu grid-item2">
                {props.isAuthenticated ?
                    <Link exact="true" to="/signout" onClick={props.logOut}>Sign Out</Link>
                    : ""}
                {props.isAuthenticated ? "" :
                    <Link exact="true" to="/">Sign In</Link>
                }
                {props.isAuthenticated ?

                    <Link exact="true" to="/createpost">My Profile</Link>
                    : ""}

                <Link exact="true" to="/homepage">All Post</Link>


            </div>
        </nav>
    )
}
