import { DireecMessageBar, WorkDescriptionBar, WorkspaceZone } from '@layouts/MemoWorkspace/styles';
import React, { useCallback, useState } from 'react';
import { EditColumnDiv, EditColumnDiv2, EditPost, MainDiv, ShowPostZone } from './styles';
import memo from '../../img/memo.png';
import ChatBox from '@components/ChatBox';
import useInput from '@hooks/useInput';
import ChannelListMeMo from '@components/ChannelListMemo';
import ChannelListMeMoInner from '@components/ChannelListMemoInner';
import { Route, useParams } from 'react-router';
import ChatList from '@components/ChatList';

const MemoContent = () => {
  const [onText, changeOnText] = useInput('');
  const [onFile, setOnFile] = useState();
  const onSubmmit = useCallback(() => {
    console.log('submmit');
  }, []);
  const { groupname, groupinnerdata } = useParams<{ groupname?: string; groupinnerdata?: string }>();
  console.log('memoparam :::', groupinnerdata);
  return (
    <MainDiv>
      <WorkDescriptionBar>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: 5,
            paddingLeft: 27,
            width: '100%',
            height: '10%',
          }}
        >
          <img width={38} height={37} src={memo} alt="file-color-reverse" />
          <span
            style={{
              marginLeft: '10',
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: '400px',
              fontSize: '24px',
              color: 'white',
            }}
          >
            작업명
          </span>
        </div>
        <div style={{ width: '100%', height: '60%', display: 'flex' }}>
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <span
              style={{
                marginLeft: '29px',

                fontFamily: 'Inter',
                fontStyle: 'normal',

                fontSize: 12,

                color: ' #ffffff',
              }}
            >
              참여자 : {`유저수`}
            </span>
            <span
              style={{
                marginLeft: '29px',

                fontFamily: 'Inter',
                fontStyle: 'normal',

                fontSize: 12,
                color: ' #ffffff',
              }}
            >
              파일 수 : {`파일 수`}
            </span>
            <span
              style={{
                marginLeft: '29px',

                fontFamily: 'Inter',
                fontStyle: 'normal',

                fontSize: 12,
                color: ' #ffffff',
              }}
            >
              작업 수 : {`작업 수`}
            </span>
            <span
              style={{
                marginLeft: '29px',

                fontFamily: 'Inter',
                fontStyle: 'normal',

                fontSize: 12,
                color: ' #ffffff',
              }}
            >
              파일 설명 : {`설명`}
            </span>

            <ChannelListMeMoInner />
          </div>
        </div>
      </WorkDescriptionBar>
      <WorkspaceZone>
        <EditPost style={{ display: 'flex', width: '100%', height: '22%' }}>
          <EditColumnDiv>
            <ChatBox chat={onText} onChangeChat={changeOnText} onSubmitForm={onSubmmit} />
          </EditColumnDiv>
          <EditColumnDiv2></EditColumnDiv2>
        </EditPost>
        <ShowPostZone>
          <Route path={`/MemoWorkspace/:groupname/:groupinnerdata/:groupmemo`} component={ChatList} />
        </ShowPostZone>
      </WorkspaceZone>
      <DireecMessageBar />
    </MainDiv>
  );
};

export default MemoContent;
