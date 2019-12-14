import React from 'react';
import {Route} from "react-router-dom";
import Content from "../controller/Content";
import Categories from "../controller/Categories";
import Author from "../controller/Author";

const NavbarView: React.FunctionComponent = () => {
  return (
    <>
      <NavbarView/>
      <Route exact path='/contents' component={Content} />
      <Route exact path='/categories' component={Categories} />
      <Route exact path='/authors' component={Author} />
    </>
  );
};

export default NavbarView;
