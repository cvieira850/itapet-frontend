import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Input, Textarea } from '@rocketseat/unform';
import * as Yup from 'yup';

import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';


import history from '../../services/history';
import api from '../../services/api';

import { validation } from '../../util/messages';
import { items } from '../../components/Header/navigation';

import { Container, PageTop, Data } from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required(validation.required),
  text: Yup.string()
    .required(validation.required),
});

export default function PostForm() {
  const [post, setPost] = useState({});

  const { id } = useParams();

  useEffect(() => {
    async function loadPost() {
      try {
        const { data } = await api.get('posts', {
          params: { id },
        });

        setPost(data);
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
    await api.post('posts', data);
    toast.success('Cadastro realizado');
  }

  async function updatePost(data) {
    await api.put(`posts/${post.id}`, data);
    toast.success('Cadastro alterado');
  }

  async function handleFormSubmit(data) {
    try {
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
          <button type="submit" form="Form">
            <MdCheck size={20} color="#fff" />
            <span>SALVAR</span>
          </button>
        </div>
      </PageTop>

      <Data
        id="Form"
        schema={schema}
        initialData={post}
        onSubmit={handleFormSubmit}
      >
        <label>TÍTULO</label>
        <Input name="title" placeholder="Meu Título" />

        <label>TEXTO</label>
        <Textarea name="text" placeholder="Meu Texto " />


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
