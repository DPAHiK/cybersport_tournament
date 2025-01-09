const authService = require("../../services/auth");
const userService = require('../../services/user')
const jwt = require('jsonwebtoken')
const authController = require('../../controllers/auth')

jest.mock('../../services/auth'); 
jest.mock('../../services/user'); 
jest.mock('jsonwebtoken'); 

describe('Auth Controller', () => {

    beforeEach(() => {
        req = {
            body: {},
            session: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks(); 
    });

    test('login with invalid data should return status 400', async () => {
        const id = 1;
        const user = { id: id, name: "BobrKurwa", password: "polska_strong", role: "ROLE_PLAYER" , validatePassword: jest.fn().mockReturnValue(false)};
        req.body = {name: "BobrKurwa", password: "ya_perdole"}

        userService.findByName.mockResolvedValue(user);

        await authController.login(req, res, next);

        //console.log(res)

        expect(userService.findByName).toHaveBeenCalledWith(user.name);
        expect(res.json).toHaveBeenCalledTimes(0)
    });

    test('login with valid data should return 200 and token', async() => {
        const id = 1;
        const user = { id: id, name: "BobrKurwa", password: "polska_strong", role: "ROLE_PLAYER" , validatePassword: jest.fn().mockReturnValue(true)};
        req.body = {name: "BobrKurwa", password: "polska_strong"}
        userService.findByName.mockResolvedValue(user);

        jwt.sign.mockReturnValue('mockAccessToken'); 

        await authController.login(req, res, next);

        expect(userService.findByName).toHaveBeenCalledWith(user.name); 
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: "User logged in", accessToken: 'mockAccessToken' });
    })

     test('signup with user, should return 200 and msg', async () => {
        const id = 1;
        const user = { id: id, name: "BobrKurwa", password: "polska_strong", role: "ROLE_PLAYER" , validatePassword: jest.fn().mockReturnValue(true)};
        req.body = {name: "BobrKurwa", password: "polska_strong"}
        userService.findByName.mockResolvedValue(null);
        authService.signUp.mockResolvedValue(user);

        await authController.signup(req, res, next);

        expect(userService.findByName).toHaveBeenCalledWith(user.name); 
        expect(authService.signUp).toHaveBeenCalledWith({name: "BobrKurwa", password: "polska_strong"}); 
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: "Registration successful"});
    })


});
