import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

function checkError(req: Request, res: Response, next: NextFunction){
    const validationEror= validationResult(req)
    if(!validationEror.isEmpty){
        return res.status(400).json({
            error:true,
            message: validationEror
        })
    }
    next()
}
export default checkError