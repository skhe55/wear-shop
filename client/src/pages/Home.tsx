import * as React from 'react';
import { Categories }  from '../components/Categories';
import { useAppDispatch, useAppSelector } from '../hooks/typed-hooks';
import { fetchClotches } from '../redux/clothes/asyncActions';
import { setCategoryName, setCurrentPage, setFetching } from '../redux/filters/slice';
import { WearBlockProps } from '../components/WearBlock/index';
import WearBlock from '../components/WearBlock';
import { RequestClothesBody } from '../redux/clothes/types';
import { deleteItemsFromObj } from '../utils/deleteUndefinedItemsFromObject';
import { clearItems } from '../redux/clothes/slice';
import { Sort } from '../components/Sort';

const Home:React.FC = () => {
    const [fetchingPage, setFetchingPage] = React.useState<boolean>(false);
    const isMounted = React.useRef(false);

    const dispatch = useAppDispatch();
    const { items, status } = useAppSelector(state => state.clothes);
    const { searchValue, categoryName, currentPage, sort, fetching } = useAppSelector(state => state.filters);

    const onChangeCategory = React.useCallback((name: string) => {
        dispatch(setCategoryName(name));
        dispatch(setCurrentPage(0));
        dispatch(clearItems());
        dispatch(setFetching(true));
    }, [])

    const scrollHandler = () => {
        if(document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) < 100) {
            setFetchingPage(true);
        }
    }   

    const getClothes = async () => {
        const body: RequestClothesBody = {
            wear_type: categoryName === '' ? undefined : categoryName,
            product_name: searchValue === '' ? undefined : searchValue,
            sortType: sort.sortProperty.split('-')[1],
            sortByField: sort.sortProperty.split('-')[0],
            quantityOfElementsInGroup: 4,
            offsetValue: currentPage,
        };
        deleteItemsFromObj(body);
        dispatch(setCurrentPage(currentPage + 4));
        dispatch(fetchClotches(body));
        setFetchingPage(false);
        setFetching(false);
    }
    
    React.useEffect(() => {
        if(!isMounted.current && items.length === 0) {
            getClothes();
        }
        isMounted.current = true;
    }, [])

    React.useEffect(() => {
        if(fetchingPage && status !== 'not found') {
            getClothes();
        } 
    }, [fetchingPage])

    React.useEffect(() => {
        if(fetching) {
            getClothes(); 
        }  
    }, [categoryName, searchValue, sort])

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
                <Categories value={categoryName} onChangeCategory={onChangeCategory}/>
                <Sort value={sort} />
            </div>
            <div className='content__items'>{wear}</div>
        </div>
    );
}

export default Home;