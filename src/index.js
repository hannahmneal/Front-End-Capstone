import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import Game from "./components/Game"
import './index.css'
import "./App.css";
//Reactstrap import:
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
    <Router>
        <Game />
    </Router>
    , document.getElementById('root'))