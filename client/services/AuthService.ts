import { AxiosResponse } from 'axios'
import { AuthResponse } from '../models/response/AuthResponse'
import { host } from '../http/index'

class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return host.post('/login', {email, password})
  }
}

export default AuthService
