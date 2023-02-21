import { useState, FormEvent, ChangeEvent } from 'react'
import Head from "next/head";
import { Header } from "@/src/components/Header";
import style from "./styles.module.scss"
import { setupAPIClient } from '@/src/services/api';
import { toast } from 'react-toastify';

import { canSSRAuth } from '@/src/utils/canSSRAuth'

import { FiUpload} from 'react-icons/fi'

type ItemProps = {
  id: string;
  name: string;
}

interface CategoryProps{
  categoryList: ItemProps[];
}


export default function Product({categoryList}: CategoryProps) {
  
  const [avatarUrl, setAvatarUrl] = useState('');
  const [imageAvatar, setImageAvatar] = useState(null);
  
  const [categorys, setCategorys] = useState(categoryList || []);
  const [categorySelected, setCategorySelected] = useState(0)

  

  const [name, setName] = useState('')
  
  function handleFile(e:ChangeEvent<HTMLInputElement>) {
    
    if(!e.target.files){
      return;
    }

    const image = e.target.files[0];

    if(!image){
      return;
    }

    if(image.type === 'image/jpeg' || image.type === 'image/png'){

      setImageAvatar(image);
      setAvatarUrl(URL.createObjectURL(e.target.files[0]))
    }


  }

  // Quando voce seleciona uma nova vategoria na lista
  async function handleChangeCategory(event){
    
    setCategorySelected(event.target.value)
  }
  

  async function handleRegistrer(event: FormEvent) {
    event.preventDefault();

    if(name === ''){
      return;
    }

    const apiClient = setupAPIClient();
    await apiClient.post('/category', {
      name: name
    })

    toast.success('Categoría cadastrada com sucesso!')

    setName('');
  }

  return (
    <>
      <Head>
        <title>Novo Produto - Play Pizzas</title>
      </Head>
      <div>
        <Header />

        <main className={style.container}>
          <h1>Novo produto</h1>

          <form className={style.form} onSubmit={handleRegistrer}>

            <label className={style.labelAvatar}>
              <span>
                <FiUpload size={30} color="#FFF" />
              </span>

              <input type="file" accept='image/png, image/jpeg' onChange={handleFile}/>

              {avatarUrl && (
                <img 
                  className={style.preview}
                  src={avatarUrl}
                  alt="Foto do Produto"
                  width={250}
                  height={250}
                />
              )}

            </label>
            
            <select value={categorySelected} onChange={handleChangeCategory}>
              {categorys.map((item, index) => {
                return(
                  <option key={item.id} value={index}>
                    {item.name}
                  </option>
                )
              })}
            </select>
            
            <input
              type="text"
              placeholder="Digite o nome do Produto"
              className={style.input}
              value={name}
              onChange={ (e) => setName(e.target.value) }
            />

            <input
              type="text"
              placeholder="Preço do produto"
              className={style.input}
              value={name}
              onChange={ (e) => setName(e.target.value) }
            />

            <textarea 
              placeholder='Descreva seu produto...'
              className={style.input}
            />

            <button className={style.buttonAdd} type="submit">
              Cadastrar
            </button>
          </form>
        </main>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

  const apiClient = setupAPIClient(ctx)

  const response = await apiClient.get('/category');

  return {
    props: {
      categoryList: response.data
    }
  }
})