import { AxiosResponse } from 'axios'
import { authHost, host } from '../http/index'
import { IUser } from '../models/IUser'

class UserService {
  static async getAll(): Promise<AxiosResponse<IUser[]>> {
      return authHost.get<IUser[]>('/users')
  }

  static async removeById(id: number): Promise<AxiosResponse<IUser>> {
    try {
      return authHost.delete<IUser>(`/delete/${id}`)
    } catch (err) {
      throw(err)
    }
  }
}

export default UserService
