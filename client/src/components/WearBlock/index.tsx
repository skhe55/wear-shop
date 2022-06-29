import React from 'react';

type WearBlockProps = {
    id: string;
    product_name: string;
    price: number;
    imageUrl: string;
    sizes: string[];
    rating: number;
};

const WearBlock: React.FC<WearBlockProps> = ({
    id,
    product_name,
    price,
    imageUrl,
    sizes,
    rating
}) => {
    return (
        <div className='wear-block-wrapper'>
            <div className='wear-block'>
                
            </div>
        </div>
    );
}

export default WearBlock;