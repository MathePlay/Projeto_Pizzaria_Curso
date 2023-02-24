import { useState } from "react";
import { canSSRAuth } from "../../utils/canSSRAuth";
import Head from "next/head";

import style from './styles.module.scss';

import { Header } from "../../components/Header"

import { FiRefreshCcw } from 'react-icons/fi'

import { setupAPIClient } from "@/src/services/api";

import Modal from 'react-modal';
import { StringifyOptions } from "querystring";

import { ModalOrder } from '../../components/ModalOrder'

type OrderProps = {
    id: string;
    table: string | number;
    status: boolean;
    draft: boolean;
    name: string | null;
}

interface HomeProps {
    orders: OrderProps[];
}

export type OrderItemProps = {
    id: string;
    amount: number;
    order_id: string;
    product_id: string
    product: {
        id: string;
        name: string;
        description: string;
        price: string;
        banner: string;
    }
    order: {
        id: string;
        table: string | number;
        status: boolean;
        name: string | null;
    }

}

export default function Dashboard({ orders }: HomeProps) {
    const [orderList, setOrderList] = useState(orders || [])

    const [modal, setModalItem] = useState<OrderItemProps[]>()
    const [modalVisible, setModalVisible] = useState(false)

    function handleCloseModal() {
        setModalVisible(false);
    }

    async function handleOpenModalView(id: string) {

        const apiClient = setupAPIClient();

        const response = await apiClient.get('/order/detail', {
            params: {
                order_id: id,
            }
        })

        setModalItem(response.data);
        setModalVisible(true)
    }

    async function handleFinishItem(id: string) {
        const apiClient = setupAPIClient();
        await apiClient.put("/order/finish", { order_id: id });

        const response = await apiClient.get("/orders");

        setOrderList(response.data)

        setModalVisible(false);
    }

    async function refreshOrders() {
        const apiClient = setupAPIClient();

        const response = await apiClient.get("/orders");

        setOrderList(response.data)
    }




    Modal.setAppElement('#__next');
    return (
        <>
            <Head>
                <title>Painel - Play Pizzas</title>
            </Head>
            <div>
                <Header />

                <main className={style.container}>
                    <div className={style.containerHeader}>
                        <h1>Ultimos Pedidos</h1>
                        <button>
                            <FiRefreshCcw size={25} color="#efffa3" onClick={refreshOrders} />
                        </button>
                    </div>

                    <article className={style.listOrder}>

                        {orderList.length === 0 && (
                            <span className={style.emptyList}>
                                Nenhum pedido aberto foi encontrado...
                            </span>
                        )}

                        {orderList.map(item => (
                            <section key={item.id} className={style.orderItem}>
                                <button onClick={() => handleOpenModalView(item.id)}>
                                    <div className={style.tag}></div>
                                    <span>Mesa {item.table}</span>
                                </button>
                            </section>
                        ))}


                    </article>
                </main>

                {modalVisible && (
                    <ModalOrder
                        isOpen={modalVisible}
                        onRequestClose={handleCloseModal}
                        order={modal}
                        handleFinishOrder={handleFinishItem}
                    />
                )}
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);

    const responde = await apiClient.get('/orders');

    console.log(responde)



    return {
        props: {
            orders: responde.data
        }
    }
})