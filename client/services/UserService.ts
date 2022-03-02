import { AxiosResponse } from 'axios'
import { authHost } from '../http/index'
import { IUser } from '../models/IUser'

class UserService {
  static async getAll(): Promise<AxiosResponse<IUser[]>> {
    return  authHost.get<IUser[]>('/users')
  }
}

export default UserService
