import React from "react"
import { Router, Route, Switch } from "react-router-dom"

import { history } from "./services/history"

import EnquetePage from "./pages/enquete/EnquetePage"
import MostrarTodasEnquetePage from "./pages/enquete/MostrarTodasEnquetePage"

const Routes = () => (
    <Router history={history}>
        <Switch>
            <Route exact path={"/"} component={MostrarTodasEnquetePage}/>
            <Route path="/add" component={EnquetePage} key={1}/>
            <Route path="/edit/:id" component={EnquetePage} key={2}/>
            <Route path="/show/:id" render={(props) => <EnquetePage {...props} readOnly/>} key={3}/>
        </Switch>
    </Router>
)

export default Routes;