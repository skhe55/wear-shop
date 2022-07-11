import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { RoleEntity } from "./roles.entity";
import { UserRoles } from "./user-roles.entity";

@Table({tableName: "users"})
export class UserEntity extends Model {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false
    })
    login: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password: string;

    @BelongsToMany(() => RoleEntity, () => UserRoles)
    roles: RoleEntity[];
}