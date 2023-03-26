import { Request } from "express";
import {User} from '../db'

interface IAuthRequest extends Request {
    user?:User
}
export {IAuthRequest}