import { createReducer, createActions } from 'reduxsauce';
import { mock } from './mock';

export const { Types, Creators } = createActions({
  openInfoModal: ['personInfoModalData'],
  closeInfoModal: [],
  openEditModal: ['personEditModalData'],
  closeEditModal: [],
  replacePerson: ['person', 'id'],
  addPersonAsParent: ['newParent', 'sonId', 'relationship'],
  addRequest: ['newParent', 'sonId', 'relationship'],
  deleteSolicitation: ['solicitation'],
  acceptSolicitation: ['solicitation'],
});

export const INITIAL_STATE = {
  personInfoModalOpen: false,
  nextId: 20,
  personInfoModalData: undefined,
  personEditModalOpen: false,
  personEditModalData: undefined,
  firstPersonOnTree: mock,
  requestList: [],
};

const openInfoModal = (state = INITIAL_STATE, { personInfoModalData }) => ({
  ...state,
  personInfoModalData,
  personInfoModalOpen: true,
});

const closeInfoModal = (state = INITIAL_STATE) => ({
  ...state,
  personInfoModalOpen: false,
});

const openEditModal = (state = INITIAL_STATE, { personEditModalData }) => ({
  ...state,
  personEditModalData,
  personEditModalOpen: true,
});

const closeEditModal = (state = INITIAL_STATE) => ({
  ...state,
  personEditModalOpen: false,
});

const replacePerson = (state = INITIAL_STATE, { person, id }) => {
  const deepReplace = (old) => {
    if (!old) return;
    const newPerson = old.id === id ? { ...old, ...person } : { ...old };
    newPerson.mother = deepReplace(old.mother);
    newPerson.father = deepReplace(old.father);
    return newPerson;
  };
  return {
    ...state,
    firstPersonOnTree: deepReplace(state.firstPersonOnTree),
  };
};
const addPersonAsParent = (
  state = INITIAL_STATE,
  { newParent, sonId, relationship }
) => {
  const deepReplace = (old) => {
    if (!old) return;
    const newPerson = { ...old };
    newPerson.mother = deepReplace(old.mother);
    newPerson.father = deepReplace(old.father);
    if (newPerson.id === sonId) {
      newPerson[relationship] = { ...newParent, id: state.nextId };
    }
    return newPerson;
  };
  return {
    ...state,
    nextId: state.nextId + 1,
    firstPersonOnTree: deepReplace(state.firstPersonOnTree),
  };
};

const addRequest = (state = INITIAL_STATE, payload) => ({
  ...state,
  requestList: [...state.requestList, payload],
});

const deleteSolicitation = (state = INITIAL_STATE, { solicitation }) => ({
  ...state,
  requestList: state.requestList.filter((item) => item !== solicitation),
});

const acceptSolicitation = (state = INITIAL_STATE, { solicitation }) => ({
  ...state,
  ...addPersonAsParent(state, solicitation),
  requestList: state.requestList.filter((item) => item !== solicitation),
});

export const HANDLERS = {
  [Types.OPEN_INFO_MODAL]: openInfoModal,
  [Types.CLOSE_INFO_MODAL]: closeInfoModal,
  [Types.OPEN_EDIT_MODAL]: openEditModal,
  [Types.CLOSE_EDIT_MODAL]: closeEditModal,
  [Types.CLOSE_EDIT_MODAL]: closeEditModal,
  [Types.REPLACE_PERSON]: replacePerson,
  [Types.ADD_PERSON_AS_PARENT]: addPersonAsParent,
  [Types.ADD_REQUEST]: addRequest,
  [Types.DELETE_SOLICITATION]: deleteSolicitation,
  [Types.ACCEPT_SOLICITATION]: acceptSolicitation,
};

export default createReducer(INITIAL_STATE, HANDLERS);
