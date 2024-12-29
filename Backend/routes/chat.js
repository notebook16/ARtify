import { Router } from "express";
import { chat , userChat} from "../controllers/chat.js";

const chatRouter = Router();

chatRouter.route("/chat").post(chat);

chatRouter.route("/userChat").get(userChat);


export default chatRouter;