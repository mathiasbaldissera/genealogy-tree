import React from 'react';
import { Grid } from '@material-ui/core';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import '../../index.css';
import { useSelector } from 'react-redux';
const StyledGrid = styled(Grid)`
  padding-top: 30px;
  p {
    width: 100%;
    text-align: center;
  }
  p:first-child {
    font-size: 1.5rem;
  }
  code {
    color: red;
  }
`;
export const Home = () => {
  const homeImages = useSelector((state) => state.home.images);
  return (
    <StyledGrid container justify="center" alignItems="center">
      <p>Bem Vindo ao GenealogyTree </p>
      <p>
        Aqui você pode montar sua arvore genealógica, da maneira mais simples
        possível.
      </p>
      <p>
        Esse site ainda está em <code>desenvolvimento</code>, então só é
        possível editar uma arvore de testes
      </p>
      <p>
        A arvore de testes aprensentada é da família Josten, começando pelo seu
        primogenito, João
      </p>
      <Link to={'/tree'}>
        <Button color="primary" variant="contained">
          Clique aqui para testar
        </Button>
      </Link>
      <p>
        <h3> Algumas imagens da família</h3>
      </p>
      <Carousel autoPlay thumbWidth={'0'} infiniteLoop>
        {homeImages?.map((image) => (
          <div key={image}>
            <img src={image} />
          </div>
        ))}
      </Carousel>
    </StyledGrid>
  );
};
