import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { Delete } from '@material-ui/icons';
const StyleDropzone = styled.div`
  padding: 20px;
  border: 1px dashed #0005;
`;
const StyledPreview = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  & img {
    width: 50px;
    border-radius: 25px;
    height: 50px;
  }
  & span {
    cursor: pointer;
  }
`;
export const CustomDropzone = ({ state, setState }) => {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        setState(URL.createObjectURL(file));
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false,
  });

  return !state ? (
    <StyleDropzone {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? <p>Solte a foto aqui</p> : <p>Arrase uma foto aqui</p>}
    </StyleDropzone>
  ) : (
    <StyledPreview>
      <img src={state} />
      <span onClick={() => setState(undefined)}>
        <Delete />
      </span>
    </StyledPreview>
  );
};
