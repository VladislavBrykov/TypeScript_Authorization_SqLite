import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../types';
import PostService from '../../Service/Posts/posts.servece.data';
import 'reflect-metadata';

@injectable()
class PostController {
    private _postService: PostService;

    constructor(@inject(TYPES.Posts) postService: PostService) {
      this._postService = postService;
    }

    newPost = async (req: Request, res: Response) => {
      const data = req.body;
      console.log(data);
      const token = req.headers.authorization;
      console.log(req.body);

      //     const { title, body, file } = req.body;
      //     const token: string = req.headers.authorization;
      //   const resresAddNewPost: any = await this._postService.serviceNewPost(title, body, token);
      //    return res.status(200).json({ resresAddNewPost, status: 'new post is create' })
      return res.end();
    }
}

export default PostController;
