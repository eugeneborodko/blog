import { AxiosResponse } from 'axios'
import { AuthResponse } from '../models/response/AuthResponse'
import { host } from '../http/index'

class AuthService {
  static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    try {
      return host.post('/registration', {email, password})
    } catch (err) {
      throw(err)
    }
  }

  static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    try {
      return host.post('/login', {email, password})
    } catch (err) {
      throw(err)
    }
  }

  static async logout(): Promise<void> {
    try {
      return host.post('/logout')
    } catch (err) {
      throw(err)
    }
  }
}

export default AuthService
