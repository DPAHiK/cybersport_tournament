const userService = require("../../services/user");
const userController = require('../../controllers/user')

jest.mock('../../services/user'); 
jest.mock('../../models/user'); 
jest.mock('jsonwebtoken'); 

describe('User Controller', () => {

    beforeEach(() => {
        req = {
            body: {},
            session: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        error = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks(); 
    });

    test('user list should return status 200 and all users', async () => {
        const user = [{ id: 1, name: "BobrKurwa", password: "polska_strong", role: "ROLE_PLAYER" }, 
                      { id: 2, name: "YaPerdole", password: "polska_mighty", role: "ROLE_ORGINIZER" }
        ];

        userService.list.mockResolvedValue(user);

        await userController.list(req, res, next);
        expect(userService.list).toHaveBeenCalledWith(); 
        expect(res.json).toHaveBeenCalledWith(user);
    });

    test('user by unexisting id should return status 404 and error msg', async () => {
        req.params = {id: 0}

        userService.findById.mockResolvedValue(null);

        await userController.findById(req, res, next);
        expect(userService.findById).toHaveBeenCalledWith(req.params.id); 
        expect(res.json).toHaveBeenCalledTimes(0)
    });

    test('user by  id should return status 200 and one user', async () => {
        req.params = {id: 1}
        const user = { id: 1, name: "BobrKurwa", password: "polska_strong", role: "ROLE_PLAYER" };
        userService.findById.mockResolvedValue(user);

        await userController.findById(req, res, next);
        expect(userService.findById).toHaveBeenCalledWith(req.params.id); 
        expect(res.json).toHaveBeenCalledWith(user);
    });

    test('create a user should return status 200 and created user', async () => {
        const user = { id: 1, name: "BobrKurwa", password: "polska_strong", role: "ROLE_PLAYER" };
        req.body = user;
        userService.create.mockResolvedValue(user);

        await userController.create(req, res, next);
        expect(userService.create).toHaveBeenCalledWith(user); 
        expect(res.json).toHaveBeenCalledWith(user);
    });

    test('update a user should return status 200 and 1 with updated user', async () => {
        req.params = {id: 1}
        const user = {  name: "BobrKurwa", password: "polska_strong", role: "ROLE_PLAYER" };
        req.body = user;
        userService.update.mockResolvedValue([1, [user]]);

        await userController.update(req, res, next);
        expect(userService.update).toHaveBeenCalledWith(req.params.id, user); 
        expect(res.json).toHaveBeenCalledWith([1, [user]]);
    });

    test('update an unexisting user should return status 200 and 0 with empty object', async () => {
        req.params = {id: 0}
        const user = { name: "BobrKurwa", password: "polska_strong", role: "ROLE_PLAYER" };
        req.body = user;
        userService.update.mockResolvedValue([0, [user]]);

        await userController.update(req, res, next);
        expect(userService.update).toHaveBeenCalledWith(req.params.id, user); 
        expect(res.json).toHaveBeenCalledTimes(0)
    });

    test('delete an unexisting user should return status 200 and 0', async () => {
        req.params = {id: 1}
        userService.delete.mockResolvedValue(0);

        await userController.delete(req, res, next);
        expect(userService.delete).toHaveBeenCalledWith(req.params.id); 
        expect(res.json).toHaveBeenCalledTimes(0)
    });

    test('delete a user should return status 200 and 1', async () => {
        req.params = {id: 1}
        userService.delete.mockResolvedValue(1);

        await userController.delete(req, res, next);
        expect(userService.delete).toHaveBeenCalledWith(req.params.id); 
        expect(res.json).toHaveBeenCalledWith(1);
    });
});
