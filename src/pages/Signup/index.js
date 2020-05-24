import React from 'react';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';


import api from '../../services/api';
import { toast } from 'react-toastify';
import { Wrapper, Content } from './styles';
import history from '../../services/history';
import logo from '../../assets/logo.svg';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignUp() {


  async function handleSubmit({name, email, password }) {
    await api.post('/users',{
      name,
      email,
      password
    });
    toast.success("Usuário criado com sucesso");
    history.push('/');
  }

  return (
    <Wrapper>
      <Content>
        <img src={logo} alt="Itapet" />

        <Form schema={schema} onSubmit={handleSubmit}>
          <strong>SEU NOME</strong>
          <Input name="name" type="text" placeholder="Seu Nome" />
          <strong>SEU E-MAIL</strong>
          <Input name="email" type="email" placeholder="Seu e-mail" />

          <strong>SUA SENHA</strong>
          <Input
            name="password"
            type="password"
            placeholder="Sua senha secreta"
          />

          <button type="submit">Criar Conta</button>
          <button type="button" onClick={() => history.push('/')}>
          Fazer Login
        </button>
        </Form>
      </Content>
    </Wrapper>
  );
}
