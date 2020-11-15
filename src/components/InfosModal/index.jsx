import Modal from '@material-ui/core/Modal';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as actions } from '../../store/appReducer';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { Close } from '@material-ui/icons';

const StyledContainer = styled.div`
  position: relative;
  display: flex;
  background-color: white;
  width: 100%;
  outline: transparent;
  border-radius: 5px;
  flex-direction: column;
  padding: 30px;
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
  ${({ show }) => !show && 'pointer-events: none'};
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity ease-in-out 0.4s;
`;
const StyledPhotoContainer = styled.div`
  img {
    border-radius: 25px;
    height: 50px;
    width: 50px;
  }
  margin-right: 10px;
`;
const StyledUl = styled.ul`
  padding-inline-start: 10px;
  & > li {
    margin: 5px 0;
  }
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
export const InfosModal = () => {
  const modalOpen = useSelector((state) => state.general.personInfoModalOpen);
  const data = useSelector((state) => state.general.personInfoModalData);
  const dispatch = useDispatch();
  const handleCloseModal = () => dispatch(actions.closeInfoModal());
  return modalOpen ? (
    <StyledModal
      open={true}
      show={modalOpen}
      onClose={handleCloseModal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      color="#0f0"
    >
      <StyledContainer>
        <CloseContainer>
          <span onClick={handleCloseModal}>
            <Close />
          </span>
        </CloseContainer>
        <Grid container direction="row" alignItems={'center'}>
          <StyledPhotoContainer>
            <img src={data?.photo} />
          </StyledPhotoContainer>
          <h2>Informações de {data?.name?.split(' ')[0]}</h2>{' '}
        </Grid>
        <StyledUl>
          <li>Nome: {data?.name ?? '-'}</li>
          <li>Nascimento:{data?.birthDate ?? '-'} </li>
          <li>Óbito: {data?.deathDate ?? '-'}</li>
          <li>Profissão: {data?.job ?? '-'} </li>
          <li>Local de nascimento: {data?.birthPlace ?? '-'}</li>
          <li>Local de óbito: {data?.deathPlace ?? '-'}</li>
          <li>Extras: {data?.extras ?? '-'}</li>
        </StyledUl>
      </StyledContainer>
    </StyledModal>
  ) : null;
};
