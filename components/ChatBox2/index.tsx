import styled from '@emotion/styled';
import autosize from 'autosize';
import React, { useCallback, useEffect, useRef, VFC } from 'react';
import { ChatArea, FileButton, Form, MentionsTextarea, SendButton, Toolbox } from './styles';
import { MGroupDataMemo, MLogin } from '@typings/memot';
import useSWR from 'swr';
import fetcherMemoLocal from '../../utills/fetcherMemoLocal';

interface Props {
  chat: string;
  onSubmitForm: (e: any) => void;
  onChangeChat: (e: any) => void;
  placeholder?: string;
}

const ChatBox2: VFC<Props> = ({ chat, onSubmitForm, onChangeChat, placeholder }) => {
  const memoUrl = 'https://memolucky.run.goorm.io';

  const { data: LoginData, mutate } = useSWR<MLogin>('tocken', fetcherMemoLocal);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onKeydownChat = useCallback(
    (e) => {
      console.log('onKeydownChat', '1차통과');
      if (e.key === 'Enter') {
        console.log('onKeydownChat', '2차 통과');
        if (!e.shiftKey) {
          console.log('onKeydownChat', '3차 통과');
          e.preventDefault();
          onSubmitForm(e);
        }
      }
    },
    [onSubmitForm],
  );

  return (
    <ChatArea>
      <Form onSubmit={onSubmitForm}>
        <MentionsTextarea
          placeholder={placeholder ? placeholder : 'Input Your Message!'}
          value={chat}
          onChange={onChangeChat}
          onKeyDown={onKeydownChat}
          ref={textareaRef}
        />

        <Toolbox>
          <FileButton type="file"></FileButton>
          <SendButton
            className={
              'c-button-unstyled c-icon_button c-icon_button--light c-icon_button--size_medium c-texty_input__button c-texty_input__button--send' +
              (chat?.trim() ? '' : ' c-texty_input__button--disabled')
            }
            data-qa="texty_send_button"
            aria-label="Send message"
            data-sk="tooltip_parent"
            type="submit"
            disabled={!chat?.trim()}
          >
            <i className="c-icon c-icon--paperplane-filled" aria-hidden="true" />
          </SendButton>
        </Toolbox>
      </Form>
    </ChatArea>
  );
};

export default ChatBox2;
