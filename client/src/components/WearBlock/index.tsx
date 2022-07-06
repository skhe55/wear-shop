import React from 'react';
import { Link } from 'react-router-dom';
import PlusIcon from '../../icons/PlusIcon';
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
    const [activeType, setActiveType] = React.useState<number>(0);
    const [activeSize, setActiveSize] = React.useState<number>(0);

    const onClickAddToCart = () => {
      // logic
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
          </button>
        </div>
      </div>
    </div>
    );
}

export default WearBlock;