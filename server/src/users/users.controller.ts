import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { AddRoleDto } from "./dto/add-role.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
    constructor(private usersService: UsersService) {}

    // @Roles("admin")
    // @UseGuards(RolesGuard)
    @Post("/create-user")
    async createUser(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
    }

    // @Roles("admin")
    // @UseGuards(RolesGuard)
    @Get()
    async getAllUsers() {
        return this.usersService.getAllUsers();
    }

    @Post("/add-role")
    async addRole(@Body() dto: AddRoleDto) {
        return this.usersService.addRole(dto);
    }
}