import React from 'react';

type CategoriesProps = {
    value: string;
    onChangeCategory: (name: string) => void;
}

export const Categories: React.FC<CategoriesProps> = React.memo(({ value, onChangeCategory }) => {
    const categories = React.useMemo(() => [
        {
            name: 'Все',
            translitName: ''
        }, 
        {
            name: 'Штаны',
            translitName: 'Pants'
        },
        {
            name: 'Худи',
            translitName: 'Hoodie'
        },
        {
            name: 'Футболки',
            translitName: 'T-shirt'
        }
    ], []);

    return (
        <div className='categories'>
            <ul>
                {categories.map((category, i) => (
                    <li key={i} onClick={() => onChangeCategory(category.translitName)} className={value === category.translitName ? 'active' : ''}>
                        {category.name}
                    </li>
                ))}
            </ul>
        </div>
    )
});

