// vanilla
import React, {Component} from 'react';
// router
import {Route, Router} from "react-router-dom";
import { createBrowserHistory } from "history";
// component
import Author from "./Author";
import Content from "./Content";
import Cat from "./Categories";
import NavbarView from "../view/Navbar.view";

// history
const history = createBrowserHistory();

class App extends Component {
    constructor(props: any) {
      super(props);
      this.state = {}
    }

    render() {
        return (
            <Router history={history}>
                <NavbarView/>
                <Route exact path='/' component={Content} />
                <Route exact path='/categories' component={Cat} />
                <Route exact path='/authors' component={Author} />
            </Router>
        )
    }

}

export default App;
