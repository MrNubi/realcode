import React from 'react';
import { EditColumnDiv, EditColumnDiv2, EditPost, MainDiv, ShowPostZone } from './styles';

const MemoContent = () => {
  return (
    <MainDiv>
      <EditPost style={{ display: 'flex', width: '100%', height: '22%' }}>
        <EditColumnDiv></EditColumnDiv>
        <EditColumnDiv2></EditColumnDiv2>
      </EditPost>
      <ShowPostZone>
        <div></div>
        <div></div>
        <div></div>
      </ShowPostZone>
    </MainDiv>
  );
};

export default MemoContent;
