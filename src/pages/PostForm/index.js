import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
/* import {  Textarea } from '@rocketseat/unform'; */
import * as Yup from 'yup';
import {  useSelector } from 'react-redux';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import RadioInput from '../../components/RadioInput';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';


import history from '../../services/history';
import api from '../../services/api';

import { validation } from '../../util/messages';
import { items } from '../../components/Header/navigation';

import { Container, PageTop, Data } from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required(validation.required),
  mensage: Yup.string()
    .required(validation.required),
  contact: Yup.string()
  .required('O contato e obrigatorio'),
  category: Yup.string()


});

export default function PostForm() {
  const [post, setPost] = useState({});
  const { profile } =  useSelector(state => state.user);
  const { id } = useParams();

  useEffect(() => {
    async function loadPost() {
      try {
        const { data } = await api.get('posts', {
          params: { id },
        });
        console.log(data[0]);

        setPost(data[0]);
      } catch (err) {
        toast.error(err.response.data.error);
      }
    }

    if (!isNewPost()) {
      loadPost();
    }
  }, []); //eslint-disable-line

  function isNewPost() {
    return !id;
  }

  async function insertPost(data) {
    if(data.category.venda === true) {
      data.category_id = "f79c86f4-aca4-4252-aa59-cb676bcf27ef"
    } else if (data.category.adocao === true ) {

      data.category_id = "da5b2a4d-3408-4e00-9e81-bc86203d7494"
    } else {
      data.category_id = null;
    }
    delete data.category;
    data.owner_id = profile.id;
    await api.post('posts', data);
    toast.success('Cadastro realizado');
  }

  async function updatePost(data) {

    if(data.category.venda === true) {
      data.category_id = "f79c86f4-aca4-4252-aa59-cb676bcf27ef"
    } else if (data.category.adocao === true ) {

      data.category_id = "da5b2a4d-3408-4e00-9e81-bc86203d7494"
    } else {
      data.category_id = null;
    }
    data.owner_id = post.owner_id;
    delete data.category;

     await api.put(`posts/${post.id}`, data);

    toast.success('Cadastro alterado');
  }

  async function handleFormSubmit(data) {
    try {
      await schema.validate(data, {
        abortEarly: false,
      });

      if (isNewPost()) {
        await insertPost(data);
      } else {
        await updatePost(data);
      }
      history.push(items.feed.route);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  return (
    <Container>
      <PageTop>
        <strong>
          {isNewPost() ? 'Cadastro de post' : 'Edição de post'}
        </strong>
        <div>
          <button
            type="button"
            onClick={() => history.push(items.feed.route)}
          >
            <MdKeyboardArrowLeft size={20} color="#fff" />
            <span>VOLTAR</span>
          </button>

        </div>
      </PageTop>

      <Data

        initialData={post}
        onSubmit={handleFormSubmit}
      >
        <label>TÍTULO</label>
        <Input name="title" placeholder="Meu Título" />

        <label>TEXTO</label>
        <TextArea name="mensage" placeholder="Meu Texto " />
        <label>CONTATO</label>
        <TextArea name="contact" placeholder="Meu e-mail ou telefone para contato " />
        {!isNewPost() ? <> </> :
        <>
        <label>CATEGORIA</label>
        <div >

        <label for="adocao">ADOÇÃO</label>
        <RadioInput type="radio"  name="category" value="adocao"/>
        <label for="venda">VENDA</label>
        <RadioInput type="radio"  name="category" value="venda"/>


        </div>
        </>
        }
        <button type="submit" >
            <MdCheck size={20} color="#fff" />
            <span>SALVAR</span>
        </button>

      </Data>
    </Container>
  );
}

PostForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
