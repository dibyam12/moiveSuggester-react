import React from "react";
import { Switch } from "react-router-dom";
import { BrowserRouter, Route } from "react-router-dom";
import Index from "../pages/Index";
import { ViewMovie } from "../pages/ViewMovie";
import AddMovie from "../pages/AddMovie";
import Login from "../pages/Login";
import Profile from "../pages/Profile";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Index} exact />
        <Route path="/home" component={Index} exact />
        <Route path="/add" component={AddMovie} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/profile" component={Profile} exact />

        <Route path="/view/:id" component={ViewMovie} exact />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
