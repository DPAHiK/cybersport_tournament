const authService = require("../../services/auth");
const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const authController = require('../../controllers/auth')
const bcrypt = require('bcrypt')

jest.mock('../../services/auth'); 
jest.mock('../../models/user'); 
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

        User.findOne.mockResolvedValue(user);

        await authController.login(req, res, next);

        //console.log(res)

        expect(User.findOne).toHaveBeenCalledWith({where: {name: user.name}}); 
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "incorrect login or password" });
    });

    test('login with valid data should return 200 and token', async() => {
        const id = 1;
        const user = { id: id, name: "BobrKurwa", password: "polska_strong", role: "ROLE_PLAYER" , validatePassword: jest.fn().mockReturnValue(true)};
        req.body = {name: "BobrKurwa", password: "polska_strong"}
        User.findOne.mockResolvedValue(user);

        jwt.sign.mockReturnValue('mockAccessToken'); 

        await authController.login(req, res, next);

        expect(User.findOne).toHaveBeenCalledWith({where: {name: user.name}}); 
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: "User logged in", accessToken: 'mockAccessToken' });
    })

    test('signup with user, should return 200 and msg', async () => {
        const id = 1;
        const user = { id: id, name: "BobrKurwa", password: "polska_strong", role: "ROLE_PLAYER" , validatePassword: jest.fn().mockReturnValue(true)};
        req.body = {name: "BobrKurwa", password: "polska_strong"}
        authService.signUp.mockResolvedValue(user);

        await authController.signup(req, res, next);

        expect(authService.signUp).toHaveBeenCalledWith({name: "BobrKurwa", password: "polska_strong"}); 
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: "Registration successful"});
    })


});
