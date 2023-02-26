import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from "../errors/index.js";
import attachCookies from "../utils/attachCookies.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError("Please enter all fields");
  }
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("User already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  const token = user.createJWT();
  attachCookies({ res, token });
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      name: user.name,
      location: user.location,
    },
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please enter all fields");
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new BadRequestError("Invalid credentials");
  }
  const token = user.createJWT();
  user.password = undefined;
  // cookies
  attachCookies({ res, token });

  res.status(StatusCodes.OK).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      name: user.name,
      token,
      location: user.location,
    },
    token,
  });
};

const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body;
  if (!email || !name || !lastName || !location) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await User.findOne({ _id: req.user.id });

  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;

  await user.save();

  const token = user.createJWT();
  attachCookies({ res, token });

  res.status(StatusCodes.OK).json({
    user,
    token,
    location: user.location,
  });
};

export { register, login, updateUser };
