import { injectable } from 'inversify';
import Post from '../../Models/Posts.model';
import tokenCreator from '../Users/utils/new.token';
import { Posts } from '../../interfaces';
import UserDevice from '../../Models/users.device';
import sequelize from '../../Config/database';

sequelize.sync({ force: true }).then(() => console.log('db is ready'));

@injectable()
class PostService implements Posts {
  constructor() { }

  async serviceNewPost(title, body, token) {
    const searchUser = await UserDevice.findOne({ where: { token } });

    if (searchUser) {
      const newToken = await tokenCreator.newTokenCreater(searchUser.phoneEmail);
      await UserDevice.update({ token: newToken }, { where: { token } });

      const timeInMs = Date.now();

      const addPost = {
        title,
        body,
        phoneEmail: searchUser.phoneEmail,
        countLikes: 0,
        countComments: 0,
        creationTime: timeInMs,
        updateTime: timeInMs,
      };
      const resultCreateNewPost = { addPost, newToken };
      await Post.create(addPost);
      return resultCreateNewPost;
    }
    return (false);
  }
}

export default PostService;
