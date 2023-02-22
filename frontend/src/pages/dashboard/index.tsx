import { useState } from "react";
import { canSSRAuth } from "../../utils/canSSRAuth";
import Head from "next/head";

import style from './styles.module.scss';

import { Header } from "../../components/Header"

import {FiRefreshCcw} from 'react-icons/fi'

import { setupAPIClient } from "@/src/services/api";

type OrderProps = {
    id: string;
    table: string | number;
    status: boolean;
    draft: boolean;
    name: string | null;
}

interface HomeProps{
    orders: OrderProps[];
}

export default function Dashboard({orders}: HomeProps){
const [orderList, setOrderList] = useState(orders || [])

function handleOpenModalView(id: string){
    alert("ID CLICADO " + id)
}

    return(
        <>
        <Head>
            <title>Painel - Play Pizzas</title>
        </Head>
        <div>
            <Header/>

            <main className={style.container}>
                <div className={style.containerHeader}>
                    <h1>Ultimos Pedidos</h1>
                    <button>
                        <FiRefreshCcw size={25} color="#efffa3"/>
                    </button>
                </div>

                <article className={style.listOrder}>
                    {orderList.map(item => (
                        <section key={item.id} className={style.orderItem}>
                            <button onClick={() => handleOpenModalView(item.id) }>
                                <div className={style.tag}></div>
                                <span>Mesa {item.table}</span>
                            </button>
                        </section>
                    ))}
                    

                </article>
            </main>
        </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);

    const responde = await apiClient.get('/orders');



    return{
        props: {
            orders: responde.data
        }
    }
})