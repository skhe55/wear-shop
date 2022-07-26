import { HttpException, HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { UserEntity } from "../database/entities/users.entity";
import { USERS_REPOSITORY } from "../database/providers/constants";
import { RolesService } from "../roles/roles.service";
import { AddRoleDto } from "./dto/add-role.dto";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
    private logger: Logger; 

    constructor(
        @Inject(USERS_REPOSITORY)
        private userEntity: typeof UserEntity,
        private roleService: RolesService
    ) {
        this.logger = new Logger('UsersService');
    }
    /**
     * 
     * @param dto 
     * @returns 
     */
    async createUser(dto: CreateUserDto): Promise<UserEntity> {
        try {
            const user = await this.userEntity.create({
                login: dto.login,
                password: dto.password
            });
            const role = await this.roleService.getRoleByName("user");
            await user.$set('roles', [role?.id])
            user.roles = [role];
            return user;
        } catch(error) {
            this.logger.log(`createUser: ${error}`);
            return null;
        }
    }
    /**
     * Get all users with all fields
     * @returns 
     */
    async getAllUsers(): Promise<UserEntity[] | HttpException> {
        try {
            const users = await this.userEntity.findAll({
                include: {all: true}
            })
            return users;
        } catch(error) {
            this.logger.log(`getAllUsers: ${error}`);
            return new HttpException('error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Add role by user id
     * @param dto 
     * @returns {Promise<AddRoleDto | HttpException>}
     */
    async addRole(dto: AddRoleDto): Promise<AddRoleDto | HttpException> {
        try {
            const user = await this.userEntity.findByPk(dto.user_id);
            const role = await this.roleService.getRoleByName(dto.role_name);
            if(role && user) {
                await user.$add('role', role.id);
                return dto;
            }
            throw new HttpException('User or Role not find', HttpStatus.NOT_FOUND);
        } catch(error) {
            this.logger.log(`addRole: ${error}`);
            return new HttpException('error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    /**
     * Get user by login for validate user
     * @param login 
     * @returns {Promise<UserEntity | HttpException>}
     */
    async getUserByLogin(login: string): Promise<UserEntity> {
        try {
            const user = await this.userEntity.findOne({
                where: {login},
                include: {all:true}
            });
            return user;
        } catch(error) {
            this.logger.log(`getUserByLogin: ${error}`); 
            return null;
        }
    }
}