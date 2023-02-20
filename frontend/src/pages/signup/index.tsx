import Head from "next/head"
import Image from "next/image"
import styles from "../../../styles/home.module.scss"

import logoImg from '../../../public/logo.svg'

import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"

import Link from "next/link"

export default function SignUp() {
  return (
    <>
      <Head>
        <title>Faça seu cadastro agora</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Play Pizzas" />

        <div className={styles.login}>

          <h1>Craindo sua conta</h1>

          <form>
            <Input placeholder="Digite seu Nome" type="text" />

            <Input placeholder="Digite seu Email" type="text" />

            <Input placeholder="Digite sua Senha" type="password" />

            <Button type="submit" loading={false}>Cadastrar</Button>
          </form>

          <Link href="/" className={styles.text}>
            Já possui uma conta? Faça seu login
          </Link>

        </div>

      </div>
    </>
  )
}
