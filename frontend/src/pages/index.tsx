import Head from "next/head"
import Image from "next/image"
import styles from "../../styles/home.module.scss"

import logoImg from '../../public/logo.svg'

import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"

export default function Home() {
  return (
    <>
    <Head>
      <title>Play Pizzas - Faça seu login</title>
    </Head>
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="Logo Play Pizzas"/>

      <div className={styles.login}>
        <form>
          <Input placeholder="Digite seu Email" type="text"/>
          
          <Input placeholder="Digite sua Senha"  type="password"/>
          
          <Button type="submit" loading={false}>Cadastrar</Button>
        </form>
      </div>

    </div>
    </>
  )
}
