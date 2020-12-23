import React from 'react';
import './Content.css';
import { Switch, Route } from 'react-router-dom';
import Main from '../Main/Main';
import User from '../User/User';
import Catalog from '../Catalog/Catalog';
import Complain from '../Complain/Complain';
import Subcategory from "../Subcategory/Subcategory";

function Content() {
  return (
    <Switch>
    <Route exact path="/" component={Main}/>
    <Route path="/catalog" component={Catalog}/>
    <Route path="/user" component={User}/>
    <Route path="/complain" component={Complain}/>
    <Route path="/subcategory" component={Subcategory}/>
  </Switch>
  );
}
export default Content;
