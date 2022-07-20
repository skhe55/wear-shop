import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoSvg from '../assets/img/logo.svg';
import authSvg from '../assets/img/auth.svg';
import { useAppSelector } from '../hooks/typed-hooks';
import CartIcon from '../icons/CartIcon';
import { Search } from './Search';
import { CartItem as CartItemType } from '../redux/cart/types';

const Header: React.FC = () => {
    const { items, total_price } = useAppSelector(state => state.cart);
    const location = useLocation();
    const isMounted = React.useRef(false);

    const total_count = items.reduce((sum: number, item: CartItemType) => sum + item.count, 0);
    
    React.useEffect(() => {
        if(isMounted.current) {
            const json = JSON.stringify(items);
            localStorage.setItem('cart', json);
        }
        isMounted.current = true;
    }, [items])

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
                <div className='another-page-wrapper'>
                    <div className='header__cart'>
                        {location.pathname !== '/cart' && (
                            <Link to='/cart' className='button button--cart'>
                                <span>{total_price} ₽</span>
                                <div className='button__delimiter'></div>
                                <CartIcon />
                                <span>{total_count}</span>
                            </Link>
                        )}
                    </div>
                    <Link to="auth">
                        <div className='header__auth'>
                            <img width={30} src={authSvg} alt='Auth logo' />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default React.memo(Header);