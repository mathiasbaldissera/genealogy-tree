import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {
  AccountTree,
  Add,
  FormatListBulleted,
  Home,
  Image,
  Menu,
  Queue,
  SpeakerNotes,
} from '@material-ui/icons';
import { Container } from '@material-ui/core';
import styled from 'styled-components';
import { InfosModal } from '../InfosModal';
import { EditModal } from '../EditModal';
import Drawer from '@material-ui/core/Drawer';
import { Link } from 'react-router-dom';
import { LoginModal } from '../LoginModal';
const StyledContainer = styled(Container)`
  padding-top: 20px;
  max-height: calc(100vh - 64px);
  overflow-y: scroll;
`;

const BeautyLink = styled(Link)`
  padding: 15px 10px;
  font-size: 16px;
  color: black;
  transition: background-color ease-in-out 1s;
  position: relative;
  display: flex;
  justify-content: start;
  align-items: center;
  &::after {
    display: block;
    content: ' ';
    height: 100%;
    left: 0;
    top: 0;
    width: 0;
    position: absolute;
    background-color: #0001;
    transition: width ease-in-out 0.2s;
  }
  &:hover {
    &::after {
      width: 100%;
    }
    background-color: #0001;
  }
  & svg {
    margin-right: 10px;
  }
`;
const StyledLink = ({ to, Icon, children, onClick }) => (
  <BeautyLink to={to} onClick={onClick}>
    {Icon && <Icon />}
    {children}
  </BeautyLink>
);
export const BaseLayout = ({ children }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleCloseDrawer = () => setOpenDrawer(false);
  return (
    <>
      <AppBar position="static" color={'primary'}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setOpenDrawer(true)}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6">Genealogy Tree</Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor={'left'} open={openDrawer} onClose={handleCloseDrawer}>
        <StyledLink to={'/'} Icon={Home} onClick={handleCloseDrawer}>
          Home
        </StyledLink>
        <StyledLink to={'/tree'} Icon={AccountTree} onClick={handleCloseDrawer}>
          Arvore
        </StyledLink>
        <StyledLink
          to={'/list'}
          Icon={FormatListBulleted}
          onClick={handleCloseDrawer}
        >
          Lista de pessoas/Editar
        </StyledLink>
        <StyledLink to={'/add'} Icon={Add} onClick={handleCloseDrawer}>
          Adicionar Pessoa
        </StyledLink>
        <StyledLink
          to={'/solicitation-form'}
          Icon={Queue}
          onClick={handleCloseDrawer}
        >
          Requisições de adição
        </StyledLink>
        <StyledLink
          to={'/solicitation-list'}
          Icon={SpeakerNotes}
          onClick={handleCloseDrawer}
        >
          Lista de requisições
        </StyledLink>{' '}
        <StyledLink to={'/image-list'} Icon={Image} onClick={handleCloseDrawer}>
          Lista de imagens
        </StyledLink>
      </Drawer>
      <InfosModal />
      <EditModal />
      <LoginModal />
      <StyledContainer maxWidth={'lg'}>{children}</StyledContainer>
    </>
  );
};
