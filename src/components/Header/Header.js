import React from 'react';
import './Header.css';
import {useHistory} from "react-router-dom";

function Header(props) {
  const history = useHistory();
  return (
    <header class="header">
      <button type="button" className="header__link" onClick={() => {history.goBack()}}></button>
      <h1 className="header__title">{props.title}</h1> 
    </header>    
  );
}

export default Header;
