const UserService = require('../../services/user');
const UserRepository = require('../../repository/user'); 

jest.mock('../../repository/user'); 

describe('User Service', () => {
    afterEach(() => {
        jest.clearAllMocks(); 
    });

    test('findById should call UserRepository.findById with the correct id', async () => {
        const id = 1;
        const user = { id: 1, name: 'John Doe' };
        UserRepository.findById.mockResolvedValue(user); 

        const result = await UserService.findById(id);

        expect(UserRepository.findById).toHaveBeenCalledWith(id); 
        expect(result).toEqual(user);
    });


    test('list should call UserRepository.list', async () => {
        const users = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }];
        UserRepository.list.mockResolvedValue(users);

        const result = await UserService.list();

        expect(UserRepository.list).toHaveBeenCalled(); 
        expect(result).toEqual(users); 
    });

    test('update should call UserRepository.update with the correct id and userData', async () => {
        const id = 1;
        const userData = { name: 'John Smith' };
        UserRepository.update.mockResolvedValue({ id, ...userData });

        const result = await UserService.update(id, userData);

        expect(UserRepository.update).toHaveBeenCalledWith(id, userData); 
        expect(result).toEqual({ id, ...userData }); 
    });

    test('create should call UserRepository.create with the correct userData', async () => {
        const userData = { name: 'John Doe' };
        const newUser  = { id: 1, ...userData };
        UserRepository.create.mockResolvedValue(newUser );

        const result = await UserService.create(userData);

        expect(UserRepository.create).toHaveBeenCalledWith(userData); 
        expect(result).toEqual(newUser ); 
    });

    test('delete should call UserRepository.delete with the correct id', async () => {
        const id = 1;
        UserRepository.delete.mockResolvedValue(true); 

        const result = await UserService.delete(id);

        expect(UserRepository.delete).toHaveBeenCalledWith(id); 
        expect(result).toBe(true);
    });
});
