import { Container } from "inversify";
import { TYPES } from "./types";
import { Users } from "./interfaces";
import { Posts } from './interfaces'
import UserService from "./Service/Users/users.servece.data";
import PostService from "./Service/Posts/posts.servece.data";

const myContainer = new Container();
myContainer.bind<Users>(TYPES.Users).to(UserService);
myContainer.bind<Posts>(TYPES.Posts).to(PostService);

export { myContainer };