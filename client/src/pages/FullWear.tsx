import axios from 'axios';
import * as React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const FullWear: React.FC = () => {
    const [wear, setWear] = React.useState<{
        image_url: string;
        product_name: string;
        sizes: string[];
        price: number;
    }>();

    const { id } = useParams();
    const navigate = useNavigate();

    React.useEffect(() => {
        const fetchWear = async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/wear/${id}`);
                setWear(data);
            } catch(error) {
                alert('Ошибка при получении данных о карточке');
                navigate('/');
            }
        }

        fetchWear();
    }, []);

    if(!wear) {
        return <>Загрузка...</>
    }
    return (
        <div className='container container--wear'>
            <div className='wear'>
                <img src={`${process.env.REACT_APP_SERVER_STATIC_DIST}/${wear.image_url}`} />
                <div className='content__properties'>
                    <div className='wear__top'>
                        <h2>{wear.product_name}</h2>
                        <h3>Цена: {wear.price} ₽</h3>
                        <h3>Размеры: {wear.sizes.join(', ')}</h3>
                    </div>
                    <div className='wear__bottom'>
                        <Link to="/">
                        <button className='button button --outline button--add wear__bottom-button'>
                            <span>Назад</span>
                        </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FullWear;