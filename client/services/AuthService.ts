import { AxiosResponse } from 'axios'
import { AuthResponse } from '../models/response/AuthResponse'
import { host } from '../http/index'

class AuthService {
  static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return host.post('/registration', {email, password})
  }

  static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return host.post('/login', {email, password})
  }

  static async logout(): Promise<void> {
    return host.post('/logout')
  }
}

export default AuthService
