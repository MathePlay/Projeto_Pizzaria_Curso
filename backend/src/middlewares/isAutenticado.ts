import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface PayLoad {
  sub: string;

}

export function isAutenticado(req: Request, res: Response, next: NextFunction) {

  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).end();
  }

  const [, token] = authToken.split(" ")

  try {

    const { sub } = verify(
      token,
      process.env.JWT_SECRET
    ) as PayLoad;
    
    //recuperar o id do Token e colocar dentro de uma variavel user_id dentro do req (Request)
    req.user_id = sub;

    return next();

  } catch {
    return res.status(401).end()
  }



}