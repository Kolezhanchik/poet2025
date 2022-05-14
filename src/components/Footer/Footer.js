import React from 'react';
import './Footer.css';
import { NavLink } from 'react-router-dom'

function Footer() {
const scrollUp = () => {window.scrollTo(0, 0)};
  return (
    <nav className="footer">
      <NavLink exact to="/" activeClassName="footer__btn_active" className="footer__btn">Главная</NavLink>
      <NavLink to="/catalog" onClick = {scrollUp}  activeClassName="footer__btn_active" className="footer__btn footer__btn-catalog">КАТАЛОГ</NavLink>
      <NavLink to="/search" onClick = {scrollUp} activeClassName="footer__btn_active" className="footer__btn footer__btn-search">Поиск</NavLink>
    </nav>
  );
}

export default Footer;

