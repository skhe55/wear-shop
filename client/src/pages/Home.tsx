import * as React from 'react';
import { Categories }  from '../components/Categories';
import { useAppDispatch } from '../hooks/typed-hooks';
import { setCategoryId } from '../redux/filters/slice';

const Home:React.FC = () => {
    const dispatch = useAppDispatch();

    const onChangeCategory = React.useCallback((id: number) => {
        dispatch(setCategoryId(id));
    }, [])

    return (
        <div className='container'>
            <div className='content__top'>
                <Categories value={0} onChangeCategory={onChangeCategory}/>
            </div>
        </div>
    );
}

export default Home;