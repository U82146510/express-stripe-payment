import { type Request,type Response,type NextFunction } from "express";

export const error_handler = (err:Error,req:Request,res:Response,next:NextFunction)=>{
    if(res.headersSent){
        return next();
    }

    res.status(500).json({message:'Invernal server error'});
}