import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import HttpException from '../exceptions/http.exception';

export default async function authMiddleware(
  request: Request,
  _response: Response,
  next: NextFunction
) {
  const cookies = request.cookies;
  if (cookies && cookies.Authorization) {
    const secret = process.env.JWT_SECRET as string;
    try {
      const jwtPayload = jwt.verify(cookies.Authorization, secret);
      console.log(jwtPayload)
      next();
    } catch (error) {
      console.log("Error", error)
      next(new HttpException(400, 'Invalid access token'));
    }
  } else {
    console.log("Cookies", cookies)
    next(new HttpException(400, 'Could not find \'Authorization\' cookie'));
  }
}