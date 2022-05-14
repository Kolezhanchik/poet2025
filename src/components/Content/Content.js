import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from '../Main/Main';
import Search from '../Search/Search';
import Catalog from '../Catalog/Catalog';
import Complain from '../Complain/Complain';
import Subcategory from "../Subcategory/Subcategory";

function Content() {
  return (
    <Switch>
    <Route exact path="/" component={Main}/>
    <Route path="/catalog" component={Catalog}/>
    <Route path="/search" component={Search}/>
    <Route path="/complain" component={Complain}/>
    <Route path="/subcategory" component={Subcategory}/>
  </Switch>
  );
}
export default Content;
