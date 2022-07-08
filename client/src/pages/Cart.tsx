import * as React from 'react';
import { Link } from 'react-router-dom';
import { CartItem } from '../components/CartBlock/CartItem';
import { CartEmpty } from '../components/CartEmpty';
import { useAppDispatch, useAppSelector } from '../hooks/typed-hooks';
import CartIcon from '../icons/CartIcon';
import TrashIcon from '../icons/TrashIcon';
import { clearItems } from '../redux/cart/slice';
import { CartItem as CartItemType } from '../redux/cart/types';

const Cart: React.FC = () => {
    const dispatch = useAppDispatch();
    const { total_price, items } = useAppSelector(state => state.cart);

    const total_count = items.reduce((sum: number, item: CartItemType) => sum + item.count, 0);

    const onClickClear = () => {
        if(window.confirm('Очистить корзину?')) {
            dispatch(clearItems());
        }
    };

    if(!total_price) {
        return <CartEmpty />;
    }

    return (
        <div className='container container--cart'>
            <div className='cart'>
                <div className="cart__top">
                    <h2 className="content__title">
                        <CartIcon />
                        Корзина
                    </h2>
                    <div onClick={onClickClear} className='cart__clear'>
                        <TrashIcon />
                        <span>Очистить корзину</span>
                    </div>
                </div>
                <div className='content__items'>
                    {items.map((item: CartItemType) => (
                        <CartItem key={item.id} {...item} />
                    ))}
                </div>
                <div className='cart__bottom'>
                    <div className='cart__bottom-details'>
                        <span>
                            {' '}
                            Всего товаров: <b>{total_count} шт.</b>{' '}
                        </span>
                        <span>
                            {' '}
                            Сумма заказов: <b>{total_price} шт.</b>{' '}
                        </span>
                    </div>
                    <div className='cart__bottom-buttons'>
                        <Link to="/" className="button button --outline button--add go-back-btn">
                            <svg
                                width="8"
                                height="14"
                                viewBox="0 0 8 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                d="M7 13L1 6.93015L6.86175 1"
                                stroke="#D3D3D3"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"></path>
                            </svg>

                            <span>Вернуться назад</span>
                        </Link>
                        <div className='button pay-btn'>
                            <span>Оплатить</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;