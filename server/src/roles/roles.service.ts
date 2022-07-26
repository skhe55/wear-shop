import { HttpException, HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { RoleEntity } from "../database/entities/roles.entity";
import { ROLES_REPOSITORY } from "../database/providers/constants";
import { CreateRoleDto } from "./dto/create-role.dto";

@Injectable()
export class RolesService {
    private logger: Logger;

    constructor(
        @Inject(ROLES_REPOSITORY)
        private roleEntity: typeof RoleEntity
    ) {
        this.logger = new Logger('Roles Service');
    }
    /**
     * create role
     * @param dto 
     * @returns {Promise<RoleEntity | HttpException>}
     */
    async createRole(dto: CreateRoleDto): Promise<RoleEntity | HttpException> {
        try {
            const role = await this.roleEntity.create({...dto});
            return role;
        } catch(error) {
            this.logger.log(`Roles Service | createRole: ${error}`);
            return new HttpException('Internal error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    /**
     * get role by name
     * @param name 
     * @returns {Promise<RoleEntity | HttpException>}
     */
    async getRoleByName(name: string): Promise<RoleEntity> {
        try {
            const role = await this.roleEntity.findOne({
                where: {role_name: name}
            });
            return role;
        } catch(error) {
            this.logger.log(`Roles Service | getRoleByName: ${error}`);
            return null;
        }
    }
}