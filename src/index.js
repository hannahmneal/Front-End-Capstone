import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import AppControl from "./AppControl"
import './index.css'

//Reactstrap import:
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <Router>
        <AppControl />
    </Router>
    , document.getElementById('root'))
//
// First steps:
// POST, define state, create a form



//Questions:
//How to create a POST for form values when there are one-to-many relationships?
// Will I need to have more than one state? Is that a thing? i.e., state = users, state = games, etc.?
