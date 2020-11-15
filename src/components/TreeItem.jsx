import React from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import { Info } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { Creators as actions } from '../store/appReducer';
const StyledPhotoContainer = styled.div`
  img {
    border-radius: 25px;
    height: 50px;
    width: 50px;
  }
`;
const StyledInfoIconContainer = styled.span`
  position: absolute;
  margin-left: 50px;
  cursor: pointer;
  & path {
    color: #0cae5b;
  }
`;
const StyledName = styled.div``;
export const TreeItem = ({ person }) => {
  const dispatch = useDispatch();
  const handleInfoClick = () => {
    dispatch(actions.openInfoModal(person));
  };
  return (
    <Grid
      container
      justify={'center'}
      alignItems={'center'}
      direction={'column'}
    >
      <Grid
        container
        justify={'flex-end'}
        alignItems={'center'}
        direction={'column'}
      >
        <StyledPhotoContainer>
          <img src={person.photo} />
        </StyledPhotoContainer>
        <StyledInfoIconContainer onClick={handleInfoClick}>
          <Info />
        </StyledInfoIconContainer>
      </Grid>
      <StyledName>{person.name}</StyledName>
    </Grid>
  );
};
