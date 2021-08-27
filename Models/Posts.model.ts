import { Model, DataTypes } from 'sequelize';
import sequelize from '../Config/database';

class Post extends Model {
    phoneEmail: string;

    title: string;

    image: object;

    body: string;

    countLikes: number;

    countComments: number;

    creationTime: number;

    updateTime: number;
}

Post.init({
  phoneEmail: {
    type: DataTypes.STRING,
  },
  title: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
  },
  body: {
    type: DataTypes.STRING,
  },
  countLikes: {
    type: DataTypes.NUMBER,
  },
  countComments: {
    type: DataTypes.NUMBER,
  },
  creationTime: {
    type: DataTypes.TIME,
  },
  updateTime: {
    type: DataTypes.TIME,
  },
}, {
  sequelize,
  modelName: 'posts',
  timestamps: false,
});

export default Post;
