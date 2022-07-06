import * as React from 'react';
import { Categories }  from '../components/Categories';
import { useAppDispatch, useAppSelector } from '../hooks/typed-hooks';
import { fetchClotches } from '../redux/clothes/asyncActions';
import { setCategoryId } from '../redux/filters/slice';
import { WearBlockProps } from '../components/WearBlock/types';
import WearBlock from '../components/WearBlock';

const Home:React.FC = () => {
    const [fetching, setFetching] = React.useState<boolean>(false);
    const [currentPage, setCurrentPage] = React.useState<number>(0);
    const isMounted = React.useRef(false);

    const dispatch = useAppDispatch();
    const { items, status } = useAppSelector(state => state.clothes);

    const onChangeCategory = React.useCallback((id: number) => {
        dispatch(setCategoryId(id));
    }, [])

    const scrollHandler = () => {
        if(document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) < 100) {
            setFetching(true);
        }
    }   

    const getClothes = async () => {
        const body = {
            sortByField: 'id',
            sortType: 'ASC',
            quantityOfElementsInGroup: 4,
            offsetValue: currentPage,
        };
        setCurrentPage(prevElement => prevElement + 4);
        dispatch(fetchClotches(body));
        setFetching(false);
    }
    
    React.useEffect(() => {
        if(!isMounted.current) {
            getClothes();
        }
        isMounted.current = true;
    }, [])

    React.useEffect(() => {
        if(fetching && status !== 'not found') {
            getClothes();
        } 
    }, [fetching])

    React.useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return function () {
            document.removeEventListener('scroll', scrollHandler);
        };
    }, [])

    const wear = items.map((obj: WearBlockProps) => <WearBlock key={obj.id} {...obj} />);

    return (
        <div className='container'>
            <div className='content__top'>
                <Categories value={0} onChangeCategory={onChangeCategory}/>
            </div>
            {/* {
                clothes.map(wear => 
                    // <img width={350} height={350} src={`http://localhost:3001/static/${wear.image_url}`} key={wear.id}></img>
                    <WearBlock 
                        id={wear.id}
                        product_name={wear.product_name}
                        price={wear.price}
                        sizes={wear.sizes}
                        image_url={wear.image_url}
                        wear_type={wear.wear_type}
                        rating={wear.rating}
                    />
                )
            } */}
            <div className='content__items'>{wear}</div>
        </div>
    );
}

export default Home;