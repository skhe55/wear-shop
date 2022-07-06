import * as React from 'react';
import CartIcon from '../icons/CartIcon';
import TrashIcon from '../icons/TrashIcon';

const Cart: React.FC = () => {

    const onClickClear = () => {
        // logic
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
            </div>
        </div>
    );
}

export default Cart;