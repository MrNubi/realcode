import styled from '@emotion/styled';
import autosize from 'autosize';
import React, { useCallback, useEffect, useRef, useState, VFC } from 'react';
import { ChatArea, FileButton, Form, MentionsTextarea, SendButton, Toolbox } from './styles';
import { MGroupDataMemo, MLogin } from '@typings/memot';
import useSWR from 'swr';
import fetcherMemoLocal from '../../utills/fetcherMemoLocal';
import axios from 'axios';
import useInput from '@hooks/useInput';

interface Props {
  chat: string;
  placeholder?: string;
  tockenData: string;
  groupinnerdata: string;
}

const ChatBox: VFC<Props> = ({ chat, placeholder, tockenData, groupinnerdata }) => {
  const memoUrl = 'https://memolucky.run.goorm.io';

  const { data: LoginData, mutate } = useSWR<MLogin>('tocken', fetcherMemoLocal);
  const [replyData, onChangeReplyData, setReplyData] = useInput('');

  const [file, setFile] = useState<File>();
  const ALLOW_FILE_EXTENSION = 'jpg,jpeg,png';
  const FILE_SIZE_MAX_LIMIT = 5 * 1024 * 1024; // 5MB

  /**
   * 파일 선택 onChangeHandler
   * 해당 method에서는 업로드할 파일에대해서 validaion을 하고
   * file state에 값을 할당한다
   * @param e
   * @returns
   */
  const fileUploadValidHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const files = (target.files as FileList)[0];

    if (files === undefined) {
      return;
    }

    // 파일 확장자 체크
    if (!fileExtensionValid(files)) {
      target.value = '';
      alert(`업로드 가능한 확장자가 아닙니다. [가능한 확장자 : ${ALLOW_FILE_EXTENSION}]`);
      return;
    }

    // 파일 용량 체크
    if (files.size > FILE_SIZE_MAX_LIMIT) {
      target.value = '';
      alert('업로드 가능한 최대 용량은 5MB입니다. ');
      return;
    }

    // validation을 정상적으로 통과한 File
    setFile(files);
    console.log('file clear', files, file);
  };
  const fileExtensionValid = ({ name }: { name: string }): boolean => {
    // 파일 확장자
    const extension = removeFileName(name);

    /**
     * 허용가능한 확장자가 있는지 확인하는 부분은 indexOf를 사용해도 괜찮고,
     * 새롭게 나온 includes를 사용해도 괜찮고, 그밖의 다른 방법을 사용해도 좋다.
     * 성능과 취향의 따라 사용하면 될것같다.
     *
     * indexOf의 경우
     * 허용가능한 확장자가 있을경우
     * ALLOW_FILE_EXTENSION 상수의 해당 확장자 첫 index 위치값을 반환
     */
    if (!(ALLOW_FILE_EXTENSION.indexOf(extension) > -1) || extension === '') {
      // 해당 if문이 수행되는 조건은
      // 1. 허용하지 않은 확장자일경우
      // 2. 확장자가 없는경우이다.
      return false;
    }
    return true;
  };

  /**
   * 해당 함수의 기능은 .을 제거한 순수 파일 확장자를 return해준다.
   * @param originalFileName 업로드할 파일명
   * @returns .을 제거한 순수 파일 확장자(png, jpg 등)
   */
  const removeFileName = (originalFileName: string): string => {
    // 마지막 .의 위치를 구한다
    // 마지막 .의 위치다음이 파일 확장자를 의미한다
    const lastIndex = originalFileName.lastIndexOf('.');

    // 파일 이름에서 .이 존재하지 않는 경우이다.
    // 이경우 파일 확장자가 존재하지 않는경우(?)를 의미한다.
    if (lastIndex < 0) {
      return '';
    }

    // substring을 함수를 이용해 확장자만 잘라준다
    // lastIndex의 값은 마지막 .의 위치이기 때문에 해당 위치 다음부터 끝까지 문자열을 잘라준다.
    // 문자열을 자른 후 소문자로 변경시켜 확장자 값을 반환 해준다.
    return originalFileName.substring(lastIndex + 1).toLowerCase();
  };
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const onSubmitReply = useCallback(
    (e, file?: FormData | null) => {
      e.preventDefault();
      if (!file) {
        console.log('file 없음 :', file);
        if (replyData.trim()) {
          axios
            .post(
              memoUrl + `/group/group-memo/${groupinnerdata}/`,
              {
                text: `${replyData.trim()}`,

                is_show: 1,
              },
              {
                headers: {
                  Authorization: `Bearer ${tockenData}`,
                },
                withCredentials: true,
              },
            )
            .then((r) => {
              console.log('post전송성공', r);

              setReplyData('');
            })
            .catch((e) => console.log('err : ', `${replyData.trim()}`, tockenData));
        } else {
          console.log('textless');
        }
      } else if (file) {
        console.log('file있음 :', file);
        if (replyData.trim()) {
          axios
            .post(
              memoUrl + `/group/group-memo/${groupinnerdata}/`,
              {
                text: `${replyData.trim()}`,
                files: file,
                is_show: 1,
              },
              {
                headers: { 'content-type': 'multipart/form-data', Authorization: `Bearer ${tockenData}` },
                withCredentials: true,
              },
            )
            .then((r) => {
              console.log('post전송성공', r);

              setReplyData('');
            })
            .catch((e) => console.log('err : ', `${replyData.trim()}`, tockenData));
        } else {
          console.log('textless');
        }
      }
    },
    [tockenData, groupinnerdata, replyData],
  );

  const onKeydownChat = useCallback(
    (e) => {
      console.log('onKeydownChat', '1차통과');
      if (e.key === 'Enter') {
        console.log('onKeydownChat', '2차 통과');
        if (!e.shiftKey) {
          console.log('onKeydownChat', '3차 통과');
          e.preventDefault();
          if (file !== undefined) {
            const formData = new FormData();
            formData.append('file', file);
            onSubmitReply(e, formData);
          } else onSubmitReply(e);
        }
      }
    },
    [onSubmitReply, file],
  );
  const fileCheck = () => {
    if (file !== undefined) {
      const formData = new FormData();
      formData.append('file', file);
      return formData;
    }
  };

  return (
    <ChatArea>
      <Form
        onSubmit={(e) => {
          onSubmitReply(e, fileCheck());
        }}
      >
        <MentionsTextarea
          placeholder={placeholder ? placeholder : 'Input Your Message!'}
          value={chat}
          onChange={(e) => onChangeReplyData}
          onKeyDown={onKeydownChat}
          ref={textareaRef}
        />

        <Toolbox>
          <FileButton type="file" onChange={fileUploadValidHandler}></FileButton>
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

export default ChatBox;
