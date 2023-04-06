import ChatBox from '@components/ChatBox';
import ChatList from '@components/ChatList';
import useInput from '@hooks/useInput';
import React, { useCallback } from 'react';
import { Container, Header } from './styles';
const Channel = () => {
  const onSubmitForm = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <Container>
      <Header>채널!!</Header>
      <ChatList />
    </Container>
  );
};

export default Channel;
