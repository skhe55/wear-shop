import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Table, Model } from 'sequelize-typescript';

enum WearTypes {
    TSHIRT = 'T-shirt',
    HOODIE = 'Hoodie',
    PANTS = 'Pants'
}

enum SizeTypes {
    S = 'S',
    M = 'M',
    L = 'L',
    XL = 'XL',
    XLXL = '2XL'
}

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
        type: DataType.ARRAY(DataType.ENUM({
            values: [SizeTypes.S, SizeTypes.M, SizeTypes.L, SizeTypes.XL, SizeTypes.XLXL]
        })),
        // values: [SizeTypes.S, SizeTypes.M, SizeTypes.L, SizeTypes.XL, SizeTypes.XLXL]
    })
    @ApiProperty({type: 'enum[]'})
    sizes: Array<SizeTypes>;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0
    })
    @ApiProperty({type: 'number'})
    rating: number;

    @Column({
        type: DataType.ENUM,
        values: [WearTypes.TSHIRT, WearTypes.HOODIE, WearTypes.PANTS]
    })
    @ApiProperty({type: 'enum'})
    wear_type: WearTypes
}