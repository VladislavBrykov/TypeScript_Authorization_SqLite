import { Container } from "inversify";
import { TYPES } from "./types";
import Users from "./interfaces";
import UserService from "./Service/Users/users.servece.data";

const myContainer = new Container();
myContainer.bind<Users>(TYPES.Users).to(UserService);

export { myContainer };