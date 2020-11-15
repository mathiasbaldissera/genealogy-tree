import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CustomDropzone } from '../../components/CustomDropzone';
import { StyledInputName } from '../../components/StyledInputName';
import { Controller, useForm, useWatch } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as actions } from '../../store/appReducer';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { StyledErrorText } from '../../components/StyledErrorText';
import { useHistory } from 'react-router-dom';
import { Creators as loginActions } from '../../store/loginReducer';

const StyledContainer = styled.form`
  overflow-y: auto;
  position: relative;
  display: flex;
  margin: auto;
  justify-content: center;
  background-color: white;
  width: 100%;
  outline: transparent;
  border-radius: 5px;
  flex-direction: column;
  padding: 30px;
  max-height: 95%;
  @media (min-width: 600px) {
    width: 600px;
  }
`;

export const AdminForm = () => {
  const [keyState, setKeyState] = useState(Math.random());
  const [newPhoto, setNewPhoto] = useState();
  const data = useSelector((state) => state.general.firstPersonOnTree);
  const formMethods = useForm();
  const { handleSubmit, register, control, errors, setValue } = formMethods;
  const history = useHistory();

  const dispatch = useDispatch();
  const logged = useSelector((state) => state.login.logged);

  useEffect(() => {
    !logged && dispatch(loginActions.openLoginModal());
  }, [logged]);

  const save = (values) => {
    if (newPhoto) {
      values.photo = newPhoto;
    }
    dispatch(
      actions.addPersonAsParent(values, values.son, values.relationship)
    );
    history.push('/tree');
  };
  const findEmptySpace = (field) => {
    if (!field) return [];
    const result = [];
    const recursiveFetch = (person, list) => {
      if (!person) return;
      if (!person?.[field]) list.push({ id: person.id, name: person.name });
      recursiveFetch(person.father, list);
      recursiveFetch(person.mother, list);
    };
    recursiveFetch(data, result);
    return result;
  };
  const relationship = useWatch({ name: 'relationship', control });
  useEffect(() => {
    if (!relationship) return;
    setValue('son', undefined, { shouldValidate: true });
    setKeyState(Math.random());
  }, [relationship]);
  return (
    <StyledContainer onSubmit={handleSubmit(save)}>
      <h2>Inserir nova pessoa na família</h2>
      <CustomDropzone state={newPhoto} setState={setNewPhoto} />
      <StyledInputName>Nome*</StyledInputName>
      <Controller
        control={control}
        as={TextField}
        name={'name'}
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
      <StyledInputName>É pai ou mãe de*</StyledInputName>

      <Controller
        as={
          <RadioGroup
            row
            aria-label="position"
            name="position"
            defaultValue="top"
          >
            <FormControlLabel
              value="mother"
              control={<Radio color="primary" />}
              label="Mãe"
              labelPlacement="left"
            />
            <FormControlLabel
              value="father"
              control={<Radio color="primary" />}
              label="Pai"
              labelPlacement="left"
            />
          </RadioGroup>
        }
        name={'relationship'}
        control={control}
      />

      <Controller
        key={`asd-${keyState}`}
        name={'son'}
        as={
          <Select>
            {findEmptySpace(relationship).map((item) => (
              <MenuItem value={item.id} key={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        }
        rules={{ required: 'Campo Obrigatório' }}
        control={control}
      />
      {errors?.son && <StyledErrorText>{errors?.son?.message}</StyledErrorText>}

      <Box m={1}>
        <Button type="submit" variant="contained" color={'primary'}>
          Salvar
        </Button>
      </Box>
    </StyledContainer>
  );
};
