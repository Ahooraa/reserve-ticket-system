 import {User} from '../db'
 interface IUser extends User {
  fname: string;
  lname: string;
  phone: string;
  birthday: Date;
  password: string;
  avatar_url: string;
  registration_date: Date;
  // orders: Order[]
}

export default IUser
