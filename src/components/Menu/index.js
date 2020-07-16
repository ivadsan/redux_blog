import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';

const Menu = (props) => (
  <nav id='menu'>
    <Link to='/'>
      <img src={Logo} alt='Logo' className='logo' />
    </Link>
    <div>
      <Link to='/'>Users</Link>
      <Link to='/tareas'>Tasks</Link>
    </div>
  </nav>
);

export default Menu;
