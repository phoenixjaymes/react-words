import React from 'react';
import {
  NavLink,
} from 'react-router-dom';

const Header = () => (
  <header className="main-header">
    <p className="main-header__name">Word Generator</p>
    <nav className="main-nav">
      <ul className="main-menu">
        <li className="main-menu__item"><NavLink exact to="/">Home</NavLink></li>
        <li className="main-menu__item"><NavLink to="/meat">Meat</NavLink></li>
        <li className="main-menu__item"><NavLink to="/doctor">Doctor Who</NavLink></li>
        <li className="main-menu__item"><NavLink to="/german">German</NavLink></li>
      </ul>
    </nav>
  </header>
);

export default Header;
