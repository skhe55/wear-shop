import { RoleEntity } from "../entities/roles.entity";
import { ROLES_REPOSITORY } from "./constants";

export const rolesProvider = [
    {
        provide: ROLES_REPOSITORY,
        useValue: RoleEntity
    }
]