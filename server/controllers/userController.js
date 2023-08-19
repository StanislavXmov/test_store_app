const uuid = require('uuid');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ApiError = require('../error/apiError');
const { User } = require('../models/user');

const generateJwt = (id, nickname, role, avatar) => {
  return jwt.sign(
    {id, nickname, role, avatar},
    process.env.SECRET_KEY,
    {expiresIn: '24h'}
  );
}

class UserController {
  async registration (req, res, next) {
    const { nickname, password, role } = req.body;
    console.log(nickname, password, role);
    
    if (!nickname || !password) {
      return next(ApiError.badRequest('invalid nickname or password'));
    }
    const candidate = await User.findOne({where: {nickname}});
    if (candidate) {
      return next(ApiError.badRequest('user with this nickname already exists'));
    }
    const {avatar} = req.files;
    let fileName = uuid.v4() + '.jpg';
    avatar.mv(path.resolve(__dirname, '..', 'static', fileName));

    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({nickname, role, password: hashPassword, avatar: fileName,});
    const token = generateJwt(user.id, nickname, user.role, user.avatar);
    return res.json({token});
  }

  async login (req, res, next) {
    const { nickname, password } = req.body;
    const user = await User.findOne({where: {nickname}});
    if (!user) {
      return next(ApiError.internalRequest('user not found'));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internalRequest('user not found'));
    }
    const token = generateJwt(user.id, user.nickname, user.role, user.avatar);
    return res.json({token});
  }

  async check (req, res) {
    const token = generateJwt(req.user.id, req.user.nickname, req.user.role, req.user.avatar);
    return res.json({token});
  }
}

module.exports = new UserController();