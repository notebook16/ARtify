
import { Router } from "express";
import { signup, login } from  "../controllers/user.js" // Path to your auth controller

const router = Router();

// User signup route
router.route("/signup").post(signup);

// User login route
router.route("/login").post(login); 




export default router;


