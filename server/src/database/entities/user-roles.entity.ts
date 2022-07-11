import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { RoleEntity } from "./roles.entity";
import { UserEntity } from "./users.entity";

@Table({tableName: "user_roles"})
export class UserRoles extends Model {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @ForeignKey(() => RoleEntity)
    @Column({
        type: DataType.INTEGER
    })
    role_id: number;

    @ForeignKey(() => UserEntity)
    @Column({
        type: DataType.INTEGER
    })
    user_id: number;
}