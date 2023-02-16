import { NextFunction, Request, Response } from "express";

export function isAutenticado(req: Request, res: Response, next: NextFunction) {

  console.log("Chamou esse Middleware")

  return next();

}