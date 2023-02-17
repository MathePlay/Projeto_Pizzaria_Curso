import { Router } from "express";
import multer from 'multer';

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

import { CreateCategoryController } from "./controllers/category/CreateCategoryController";

import { isAutenticado } from "./middlewares/isAutenticado";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";

import uploadConfig from './config/multer'

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

//-- ROTAS USER --
router.post('/users', new CreateUserController().handle)

router.post('/session', new AuthUserController().handle)

router.get('/me', isAutenticado, new DetailUserController().handle)


//-- ROTAS CATEGORY
router.post('/category', isAutenticado, new CreateCategoryController().handle)

router.get('/category', isAutenticado, new ListCategoryController().handle)

//-- ROTAS PRODUCT
router.post('/Product', isAutenticado, upload.single('file'), new CreateProductController().handle)

export { router };