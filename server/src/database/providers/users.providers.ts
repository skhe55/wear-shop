import { UserEntity } from "../entities/users.entity";
import { USERS_REPOSITORY } from "./constants";

export const usersProvider = [
    {
        provide: USERS_REPOSITORY,
        useValue: UserEntity
    }
]