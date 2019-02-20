
import React, { Component } from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"


class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-light light-blue flex-md-nowrap p-0 shadow">
                <ul className="nav nav-pills nav-fill">
                    <li className="nav-item">
                        <Link className="nav-link" to="/list">Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/games/new">Add A Game!</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    {/* <li className="nav-item">
                        <Link className="nav-link" to="/login" onClick={sessionStorage.clear()}>
                        Logout
                        </Link>
                    </li> */}
                    {/* <li className="nav-item">
                        <Link className="nav-link" to="/filter">Filter Games</Link>
                    </li> */}
                </ul>
            </nav>
        )
    }
}

export default NavBar