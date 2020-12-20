import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className="footer">      
      <Link to="/"className="footer__btn"><span className="footer__icon">&#128737;</span>Главная</Link>
     <Link to="/catalog"className="footer__btn"><span className="footer__icon">&#9776;</span>КАТАЛОГ</Link>
     <Link to="/user"className="footer__btn"><span className="footer__icon">&#9906;</span>Поиск</Link>
      {/* <Link to="/user"className="footer__btn"><span className="footer__icon">&#4912;</span>кабинет</Link>       */}
    </div>
  );
}

export default Footer;
