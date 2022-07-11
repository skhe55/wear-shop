import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { RolesService } from "./roles.service";

@Controller("/role")
export class RolesController {
    constructor(
        private roleService: RolesService
    ) {}

    @Post("/create-role")
    async createRole(@Body() dto: CreateRoleDto) {
        return this.roleService.createRole(dto);
    }

    @Get("/:name")
    async getRoleByName(@Param('name') name: string) {
        return this.roleService.getRoleByName(name);
    }
}