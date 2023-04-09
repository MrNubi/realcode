import styled from '@emotion/styled';
import autosize from 'autosize';
import React, { useCallback, useState, useEffect, useRef, VFC } from 'react';
import { ChatArea, FileButton, Form, MentionsTextarea, SendButton, Toolbox } from './styles';
import { MGroupDataMemo, MLogin } from '@typings/memot';
import useSWR from 'swr';
import fetcherMemoLocal from '../../utills/fetcherMemoLocal';
import useInput from '@hooks/useInput';
import axios from 'axios';

interface Props {
  placeholder?: string;
  groupinnerdata: string;
}

const ChatBox2: VFC<Props> = ({ placeholder, groupinnerdata }) => {
  const memoUrl = 'https://memolucky.run.goorm.io';

  const { data: LoginData, mutate } = useSWR<MLogin>('tocken', fetcherMemoLocal);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [replyData, onChangeReplyData, setReplyData] = useInput('');
  const [file1, setFile] = useState<File>();

  const onClickFiles = (e: any) => {
    e.preventDefault();
    if (e.target.files) {
      const uploadFile = e.target.files[0];
      const formData = new FormData();
      formData.append('files', uploadFile);
      setFile(uploadFile);
      console.log(uploadFile, 'state :', file1);
      console.log(formData.get('files'));
    } else {
      console.log('Err : 파일선택오류');
    }
  };
  const onSubmitReply = useCallback(
    (e) => {
      e.preventDefault();
      console.log('리플 :', replyData, file1);

      if (replyData.trim()) {
        const formData = new FormData();
        // formData.append('text', replyData);
        if (file1) {
          formData.append('files', file1);
        }

        // formData.append('is_show', '1');
        console.log(formData.get('files'), formData.get('text'), formData.get('is_show'));
        axios
          .post(
            memoUrl + `/group/group-memo/${groupinnerdata}/`,
            {
              text: replyData,
              // files: formData,
              is_show: 1,
            },
            {
              headers: {
                // 'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${LoginData}`,
              },
              withCredentials: true,
            },
          )
          .then((r) => {
            console.log('post전송성공', r);

            setReplyData('');
            location.reload();
          })
          .catch((e) => console.log('err : ', `${replyData.trim()}`, LoginData));
      } else {
        console.log('textless');
      }
    },
    [LoginData, file1, groupinnerdata, replyData],
  );

  const onKeydownChat = useCallback(
    (e) => {
      console.log('onKeydownChat', '1차통과');
      if (e.key === 'Enter') {
        console.log('onKeydownChat', '2차 통과');
        if (!e.shiftKey) {
          console.log('onKeydownChat', '3차 통과');
          e.preventDefault();
          onSubmitReply(e);
        }
      }
    },
    [onSubmitReply],
  );

  return (
    <ChatArea>
      <Form onSubmit={onSubmitReply}>
        <MentionsTextarea
          placeholder={placeholder ? placeholder : 'Input Your Message!'}
          value={replyData}
          onChange={(e) => {
            e.preventDefault;
            setReplyData((prev) => e.target.value);
          }}
          onKeyDown={onKeydownChat}
          ref={textareaRef}
        />

        <Toolbox>
          <FileButton
            type="file"
            onChange={(e) => {
              onClickFiles(e);
              console.log('onChangFiles', File);
            }}
          ></FileButton>
          <SendButton
            className={
              'c-button-unstyled c-icon_button c-icon_button--light c-icon_button--size_medium c-texty_input__button c-texty_input__button--send' +
              (replyData?.trim() ? '' : ' c-texty_input__button--disabled')
            }
            data-qa="texty_send_button"
            aria-label="Send message"
            data-sk="tooltip_parent"
            type="submit"
            disabled={!replyData?.trim()}
          >
            <i className="c-icon c-icon--paperplane-filled" aria-hidden="true" />
          </SendButton>
        </Toolbox>
      </Form>
    </ChatArea>
  );
};

export default ChatBox2;
