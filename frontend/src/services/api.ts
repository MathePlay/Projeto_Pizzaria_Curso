import axios, {AxiosError} from "axios";
import { parseCookies } from "nookies";
import { AuthTokenError } from "./errors/AuthTokenError";

export function setupAPIClient(ctx = undefined){
  let cookie = parseCookies(ctx);

  const api = axios.create({
    baseURL: 'http://localHost:3333',
    headers:{
      Authorization: `Bearer ${cookie['@playpizzas.token']}`
    }
  })

  api.interceptors.response.use(response =>{
    return response; 
  }, (error: AxiosError) => {
    if(error.response.status === 401){
      // qualquer erro 4e1 (nao autorizado) devemos deslogar o usuario
      if(typeof window !== undefined){
        // Chamar a funçao para deslogar o usuario
      }else{
        return Promise.reject(new AuthTokenError())
      }
    }

    return Promise.reject(error);
  })

  return api;
}