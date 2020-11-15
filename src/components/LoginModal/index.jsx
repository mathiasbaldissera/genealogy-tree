import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import { StyledInputName } from '../StyledInputName';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import { Creators as loginActions } from '../../store/loginReducer';
import { StyledErrorText } from '../StyledErrorText';

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: white;
  border-radius: 5px;
  padding: 30px;
`;

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

export const LoginModal = () => {
  const open = useSelector((state) => state.login.openLoginModal);
  const tried = useSelector((state) => state.login.tried);
  const formMethods = useForm();
  const { errors, handleSubmit, control } = formMethods;

  const dispatch = useDispatch();

  const login = ({ username, password }) => {
    dispatch(loginActions.login(username, password));
  };

  return open ? (
    <StyledModal open={open}>
      <StyledForm onSubmit={handleSubmit(login)} autocomplete="off">
        <h2>Entrar na area restrita</h2>
        <StyledInputName>Usuário</StyledInputName>
        <Controller
          control={control}
          as={TextField}
          name={'username'}
          required
          rules={{ required: 'Campo Obrigatório' }}
        />
        {errors?.username && (
          <StyledErrorText>{errors?.username?.message}</StyledErrorText>
        )}

        <StyledInputName>Senha</StyledInputName>
        <Controller
          control={control}
          as={TextField}
          name={'password'}
          type={'password'}
          required
          rules={{ required: 'Campo Obrigatório' }}
        />
        {errors?.password && (
          <StyledErrorText>{errors?.password?.message}</StyledErrorText>
        )}
        {tried && (
          <StyledErrorText>{'Usuário ou senha invalidos'}</StyledErrorText>
        )}
        <Box m={2}>
          <Button variant={'contained'} color={'primary'} type={'submit'}>
            Entrar
          </Button>
        </Box>
      </StyledForm>
    </StyledModal>
  ) : null;
};
