import React from 'react';
import './Footer.css';
import { NavLink } from 'react-router-dom'

function Footer() {

  function handleClick(e) {
    window.scrollTo(0, 0)
  }
  return (
    <nav className="footer">
      <NavLink exact to="/" activeClassName="footer__btn_active" className="footer__btn">Главная</NavLink>
      <NavLink to="/catalog" activeClassName="footer__btn_active" className="footer__btn footer__btn-catalog">КАТАЛОГ</NavLink>
      <NavLink to="/search/#search__anchor" onClick = {handleClick} activeClassName="footer__btn_active" className="footer__btn footer__btn-search">Поиск</NavLink>
    </nav>
  );
}

export default Footer;

