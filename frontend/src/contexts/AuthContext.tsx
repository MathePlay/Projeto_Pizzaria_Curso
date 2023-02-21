import { createContext, ReactNode, useState } from 'react';
import { destroyCookie, setCookie, parseCookies } from 'nookies';
import Router from 'next/router';

import { api } from '../services/apiClient';

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  singOut: () => void;
}

type UserProps = {
  id: string;
  name: string;
  email: string;
}

type SignInProps = {
  email: string;
  password: string;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function singOut() {
  try {
    destroyCookie(undefined, '@playpizzas.token')
    Router.push('/')
  } catch {
    console.log('Erro ao deslogar')
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>()
  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post('/session', {
        email,
        password
      })
      // console.log(response.data)

      const { id, name, token } = response.data;
      setCookie(undefined, '@playpizzas.token', token, {
        maxAge: 60*60*24*30, // Expirar em 1 mes
        path: "/", // Quais caminhos terrão acceso ao cookie
      })

      setUser({
        id,
        name,
        email,
      })

      //Passar para proximas requisiçoes o nosso token
      api.defaults.headers['Authorization'] = `Bearer ${token}`

      // Redirecionar o user para /dashboard
      Router.push('/dashboard')


    } catch (err) {
      console.log("Erro ao Acessar ", err)
    }
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, singOut }}>
      {children}
    </AuthContext.Provider>
  )
}