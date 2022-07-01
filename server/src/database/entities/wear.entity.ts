import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Table, Model } from 'sequelize-typescript';

@Table({tableName: 'Wear'})
export class WearEntity extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    })
    @ApiProperty({type: "number"})
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: ''
    })
    @ApiProperty({type: 'string'})
    product_name: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0
    })
    @ApiProperty({type: 'number'})
    price: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: ''
    })
    @ApiProperty({type: 'string'})
    image_url: string;

    @Column({
        type: DataType.ARRAY(DataType.INTEGER),
        allowNull: false,
        defaultValue: []
    })
    @ApiProperty({type: 'number[]'})
    sizes: number[];

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0
    })
    @ApiProperty({type: 'number'})
    rating: number;
}