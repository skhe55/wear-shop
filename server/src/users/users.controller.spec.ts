import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from '../auth/auth.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
    let controller: UsersController;

    const mockUserService = {
        create: jest.fn(dto => {
            return {
                id: Date.now(),
                ...dto
            }
        })
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                UsersService, 
                {
                    provide: UsersService,
                    useValue: mockUserService
                },
            ],
            imports: [AuthModule]
        })
        .compile();

        controller = module.get<UsersController>(UsersController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should create a user', async () => {
        const dto = {login: 'some_uniq_login23', password: 'testpassword'};

        expect(await controller.createUser(dto)).toMatchObject({
            id: expect.any(Number),
            login: dto.login,
            password: dto.password,
            "updatedAt": expect.any(Date),
            "createdAt": expect.any(Date)
        });
    });

    it('should get all users', async () => {
        expect(await controller.getAllUsers()).toBeDefined();
    })
})