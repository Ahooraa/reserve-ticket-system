import userRouter from "./user.route";
import {Router} from 'express'


function router(app){
    app.use("/user", userRouter)
}

export default router;