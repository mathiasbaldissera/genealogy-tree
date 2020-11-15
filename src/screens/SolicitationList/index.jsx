import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Check, Clear } from '@material-ui/icons';
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
export const SolicitationList = () => {
  const dispatch = useDispatch();
  const logged = useSelector((state) => state.login.logged);

  useEffect(() => {
    !logged && dispatch(loginActions.openLoginModal());
  }, [logged]);

  const firstPersonOnTreeData = useSelector(
    (state) => state.general.firstPersonOnTree
  );
  const requestList = useSelector((state) => state.general.requestList);

  const deepSearch = (person, list, deepness = 1) => {
    if (!person) return;
    list.push({ ...person, father: undefined, mother: undefined, deepness });
    deepSearch(person.father, list, deepness + 1);
    deepSearch(person.mother, list, deepness + 1);
  };

  const personMapById = useMemo(() => {
    const personList = [];
    deepSearch(firstPersonOnTreeData, personList);
    return personList?.reduce((acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {});
  }, []);

  return (
    <StyledContainer>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Relação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {requestList?.map((solicitation) => {
            const handleDelete = () => {
              dispatch(actions.deleteSolicitation(solicitation));
            };
            const handleAccept = () => {
              dispatch(actions.acceptSolicitation(solicitation));
            };
            const { newParent: item, sonId, relationship } = solicitation;
            return (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>
                  {relationship === 'mother' ? 'Mãe' : 'Pai'} de{' '}
                  {personMapById[sonId].name}
                </td>
                <td>
                  <StyledIcon onClick={handleAccept}>
                    <Check />
                  </StyledIcon>
                  <StyledIcon onClick={handleDelete}>
                    <Clear />
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
