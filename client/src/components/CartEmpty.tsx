import React from "react";
import { Link } from "react-router-dom";

import cartEmptySvg from '../assets/img/empty-cart.svg';

export const CartEmpty: React.FC = () => {
    return (
        <div className="cart cart--empty">
            <h2>
                Корзина пустая <span>😕</span>
            </h2>
            <p>
                Для того, чтобы оформить заказ, перейдите на главную страницу и нажмите кнопку *добавить*. 
            </p>
            <img src={cartEmptySvg} alt="Empty cart" />
            <Link to="/" className="button button--black">
                <span>
                    Вернуться назад
                </span>
            </Link>
        </div>
    );
}