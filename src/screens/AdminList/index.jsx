import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Edit, Info } from '@material-ui/icons';
import { Creators as actions } from '../../store/appReducer';
import { Creators as loginActions } from '../../store/loginReducer';

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  & td,
  & th {
    text-align: center;
    min-width: 40px;
  }
  & tr:nth-child(2n) {
    background-color: #0001;
  }
`;
const StyledIcon = styled.span`
  margin: 0 3px;
  cursor: pointer;
  & path {
    color: #0cae5b;
  }
`;
export const AdminList = () => {
  const dispatch = useDispatch();
  const logged = useSelector((state) => state.login.logged);

  useEffect(() => {
    !logged && dispatch(loginActions.openLoginModal());
  }, [logged]);

  const firstPersonOnTreeData = useSelector(
    (state) => state.general.firstPersonOnTree
  );

  const deepSearch = (person, list, deepness = 1) => {
    if (!person) return;
    list.push({ ...person, father: undefined, mother: undefined, deepness });
    deepSearch(person.father, list, deepness + 1);
    deepSearch(person.mother, list, deepness + 1);
  };

  const list = useMemo(() => {
    if (!logged) return [];
    const personList = [];
    deepSearch(firstPersonOnTreeData, personList);
    return personList;
  }, [firstPersonOnTreeData, logged]);

  return (
    <StyledContainer>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Profundidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {list?.map((item) => {
            const handleInfoClick = () => {
              dispatch(actions.openInfoModal(item));
            };
            const handleEditClick = () => {
              dispatch(actions.openEditModal(item));
            };
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.deepness}</td>
                <td>
                  <StyledIcon onClick={handleEditClick}>
                    <Edit />
                  </StyledIcon>
                  <StyledIcon onClick={handleInfoClick}>
                    <Info />
                  </StyledIcon>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </StyledContainer>
  );
};
