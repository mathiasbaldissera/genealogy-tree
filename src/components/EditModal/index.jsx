import Modal from '@material-ui/core/Modal';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as actions } from '../../store/appReducer';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { Close } from '@material-ui/icons';
import { Controller, useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { StyledInputName } from '../StyledInputName';
import { CustomDropzone } from '../CustomDropzone';
import { StyledErrorText } from '../StyledErrorText';

const StyledContainer = styled.form`
  position: relative;
  display: flex;
  background-color: white;
  width: 100%;
  outline: transparent;
  border-radius: 5px;
  flex-direction: column;
  padding: 30px;
  max-height: 95%;
  overflow-y: auto;
  @media (min-width: 600px) {
    width: 600px;
  }
`;
const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;
const StyledPhotoContainer = styled.div`
  img {
    border-radius: 25px;
    height: 50px;
    width: 50px;
  }
  margin-right: 10px;
`;

const CloseContainer = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  & span {
    cursor: pointer;
    margin-right: 60px;
  }
`;

export const EditModal = () => {
  const [newPhoto, setNewPhoto] = useState();
  const modalOpen = useSelector((state) => state.general.personEditModalOpen);
  const data = useSelector((state) => state.general.personEditModalData);
  const dispatch = useDispatch();
  const formMethods = useForm();
  const { handleSubmit, register, reset, control, errors } = formMethods;
  useEffect(() => reset(data), [data]);
  const save = (values) => {
    if (newPhoto) {
      values.photo = newPhoto;
    }
    dispatch(actions.replacePerson(values, data.id));
    handleCloseModal();
  };
  const handleCloseModal = () => dispatch(actions.closeEditModal());
  return modalOpen ? (
    <StyledModal
      open={modalOpen}
      onClose={handleCloseModal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      color="#0f0"
    >
      <StyledContainer onSubmit={handleSubmit(save)}>
        <CloseContainer>
          <span onClick={handleCloseModal}>
            <Close />
          </span>
        </CloseContainer>
        <Grid container direction="row" alignItems={'center'}>
          <StyledPhotoContainer>
            <img src={data?.photo} />
          </StyledPhotoContainer>
          <h2>Informações de {data?.name?.split(' ')[0]}</h2>
        </Grid>
        <CustomDropzone state={newPhoto} setState={setNewPhoto} />
        <StyledInputName>Nome</StyledInputName>
        <Controller
          control={control}
          as={TextField}
          name={'name'}
          required
          rules={{ required: 'Campo Obrigatório' }}
        />
        {errors?.name && (
          <StyledErrorText>{errors?.name?.message}</StyledErrorText>
        )}
        <StyledInputName>Nascimento</StyledInputName>
        <Controller
          control={control}
          as={TextField}
          name={'birthDate'}
          inputRef={register()}
        />
        <StyledInputName>Óbito</StyledInputName>
        <Controller
          control={control}
          as={TextField}
          name={'deathDate'}
          inputRef={register()}
        />
        <StyledInputName>Profissão</StyledInputName>
        <Controller
          control={control}
          as={TextField}
          name={'job'}
          inputRef={register()}
        />
        <StyledInputName>Local de nascimento</StyledInputName>
        <Controller
          control={control}
          as={TextField}
          name={'birthPlace'}
          inputRef={register()}
        />
        <StyledInputName>Local de óbito</StyledInputName>
        <Controller
          control={control}
          as={TextField}
          name={'deathPlace'}
          inputRef={register()}
        />
        <StyledInputName>Extras</StyledInputName>
        <Controller
          control={control}
          as={TextField}
          name={'extras'}
          inputRef={register()}
        />
        <Box m={1}>
          <Button type="submit" variant="contained" color={'primary'}>
            Salvar
          </Button>
        </Box>
      </StyledContainer>
    </StyledModal>
  ) : null;
};
