import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/typed-hooks';
import PlusIcon from '../../icons/PlusIcon';
import { plusItem } from '../../redux/cart/slice';
import { CartItem } from '../../redux/cart/types';
import { WearBlockProps } from './types';

const WearBlock: React.FC<WearBlockProps> = ({
    id,
    product_name,
    price,
    image_url,
    sizes,
    rating,
    wear_type
}) => {
    const [activeSize, setActiveSize] = React.useState<number>(0);

    const dispatch = useAppDispatch();
    const cartItem = useAppSelector(state => state.cart.items.find((obj) => obj.id === id));

    const addedCount = cartItem ? cartItem.count : 0;

    const onClickAddToCart = () => {
      const item: CartItem = {
        id,
        product_name,
        price,
        rating,
        wear_type,
        sizes: [sizes[activeSize]],
        image_url,
        count: 0,
      }
      dispatch(plusItem(item));
    }

    return (
    <div className="wear-block-wrapper">
      <div className="wear-block">
        <Link key={id} to={`/wear/${id}`}>
          <img className="wear-block__image" src={`${process.env.REACT_APP_SERVER_STATIC_DIST}/${image_url}`} alt="wear" />
          <h4 className="wear-block__title">{product_name}</h4>
        </Link>
        <div className="wear-block__selector">
          <ul>
            {sizes.map((size, i) => (
              <li
                key={size}
                onClick={() => setActiveSize(i)}
                className={activeSize === i ? 'active' : ''}>
                {size}
              </li>
            ))}
          </ul>
        </div>
        <div className="wear-block__bottom">
          <div className="wear-block__price">от {price} ₽</div>
          <button onClick={onClickAddToCart} className="button button--outline button--add">
            <PlusIcon />
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
    );
}

export default WearBlock;