import React from 'react';

type CategoriesProps = {
    value: number;
    onChangeCategory: (id: number) => void;
}

export const Categories: React.FC<CategoriesProps> = React.memo(({ value, onChangeCategory }) => {
    const categories = ['Все', 'Обувь', 'Худи', 'Штаны'];

    return (
        <div className='categories'>
            <ul>
                {categories.map((categoryName, i) => (
                    <li key={i} onClick={() => onChangeCategory(i)} className={value === i ? 'active' : ''}>
                        {categoryName}
                    </li>
                ))}
            </ul>
        </div>
    )
});

