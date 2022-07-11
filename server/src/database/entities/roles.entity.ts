import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { UserRoles } from "./user-roles.entity";
import { UserEntity } from "./users.entity";

@Table({tableName: "roles"})
export class RoleEntity extends Model {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    })
    id: number;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false
    })
    role_name: string;

    @BelongsToMany(() => UserEntity, () => UserRoles)
    users: UserEntity[]
}