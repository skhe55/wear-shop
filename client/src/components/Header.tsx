import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';


import logoSvg from '../assets/img/logo.svg';
import CartIcon from '../icons/CartIcon';
import { Search } from './Search';


const Header: React.FC = () => {

    const location = useLocation();
    
    return(
        <div className='header'>
            <div className='container'>
                <Link to="/">
                    <div className='header__logo'>
                        <img width={38} src={logoSvg} alt='Wear logo' />
                        <div>
                            <h1>Wear Shop</h1>
                        </div>
                    </div>
                </Link>
                {location.pathname !== '/cart' && <Search />}
                <div className='header__cart'>
                    {location.pathname !== '/cart' && (
                        <Link to='/cart' className='button button--cart'>
                            <span>{0} ₽</span>
                            <div className='button__delimiter'></div>
                            <CartIcon />
                            <span>{0}</span>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;