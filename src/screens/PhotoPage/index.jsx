import { CustomDropzone } from '../../components/CustomDropzone';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as homeActions } from '../../store/homeReducer';
import React, { useEffect } from 'react';
import { Creators as loginActions } from '../../store/loginReducer';
import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';

export const PhotoPage = () => {
  const dispatch = useDispatch();
  const homeImages = useSelector((state) => state.home.images);
  const handleImageAdd = (image) => {
    dispatch(homeActions.addImage(image));
  };
  const handleImageDelete = (image) => () => {
    dispatch(homeActions.removeImage(image));
  };

  const logged = useSelector((state) => state.login.logged);

  useEffect(() => {
    !logged && dispatch(loginActions.openLoginModal());
  }, [logged]);
  return logged ? (
    <>
      <h2>Gerenciamento de imagens da Home</h2>
      <CustomDropzone setState={handleImageAdd} />
      <Box mt={2}>
        <Grid container spacing={1}>
          {homeImages.map((image) => (
            <Grid item xs={6} md={4} lg={2} key={image}>
              <CustomDropzone
                state={image}
                setState={handleImageDelete(image)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  ) : null;
};
