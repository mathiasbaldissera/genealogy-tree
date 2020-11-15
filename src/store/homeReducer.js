import { createReducer, createActions } from 'reduxsauce';

export const { Types, Creators } = createActions({
  addImage: ['image'],
  removeImage: ['image'],
});

export const INITIAL_STATE = {
  images: [
    'data:image/jpeg;base64,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',
    'data:image/jpeg;base64,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',
    'data:image/jpeg;base64,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',
  ],
};
const addImage = (state = INITIAL_STATE, { image }) => {
  return { ...state, images: [...state.images, image] };
};

const removeImage = (state = INITIAL_STATE, { image }) => {
  return { ...state, images: state.images.filter((img) => img !== image) };
};

export const HANDLERS = {
  [Types.ADD_IMAGE]: addImage,
  [Types.REMOVE_IMAGE]: removeImage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
