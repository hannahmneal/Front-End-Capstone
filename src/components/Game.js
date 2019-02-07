import React, { Component } from "react"
import NavBar from "../nav/NavBar"
import AppControl from "../AppControl"
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css"


class Game extends Component {
    render() {
        return (
            <React.Fragment>
                <NavBar />
                <AppControl />
            </React.Fragment>
        )
    }
}

export default Game