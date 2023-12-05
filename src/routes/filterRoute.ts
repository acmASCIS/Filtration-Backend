import { filter } from "../controllers/filterController";

const Router = require('express').Router;

const filterRouter = Router();

filterRouter.post('/', filter);

export default filterRouter;