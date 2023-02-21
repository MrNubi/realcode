import Menu from '@components/Menu';
import React, { useCallback, useState } from 'react';

import leaf from '../../img/leaf.png';
import ChannelList from '@components/ChannalList';
import DMList from '@components/DMList/inex';
import { Route, Switch } from 'react-router';
import {
  SearchTextDiv,
  SearchTextArea,
  ContextLayout,
  DireecMessageBar,
  GroupSidebar,
  GroupTopBar,
  WorkDescriptionBar,
  WorkspaceZone,
  DashedLine,
  GroupSidebarTitle,
} from './styles';
import searchIcon from './SearchIcon.png';
import Workspace from '@layouts/Workspace';
import useInput from '@hooks/useInput';
import Box from '../../img/Box.png';
import FolderOPen from '../../img/folder_open.png';
import FolderClose from '../../img/folder_close.png';
import plus from '../../img/add_group.png';
import Setting from '../../img/Setting.png';
import memo from '../../img/memo.png';
import fetcherLocals from '../../utills/fetcherLocals';
import useSWR from 'swr';
import { MGroup, MLogin, MUSer } from '@typings/memot';
import { Link } from 'react-router-dom';
import MemoContent from '@components/MemoContent';
import fetchMemoGet from '../../utills/fetchMemoGet';
import axios from 'axios';
import GroupSidebarA from '@components/GroupSideBarA';

const MemoWorkspace = () => {
  const [searchText, onChangeSearchText, setSearchText] = useInput('');
  const memoUrl = 'https://memolucky.run.goorm.io';
  const MemoLoginUrl = `/users/dj-rest-auth/login/`;
  const {
    data: LoginData,
    error,
    mutate,
  } = useSWR<MLogin>(memoUrl + '/users/dj-rest-auth/login/', fetcherLocals, {
    dedupingInterval: 1000,
  });

  const {
    data: GroupData,
    error: GroupErr,
    mutate: GroupMutate,
  } = useSWR<MGroup>(memoUrl + '/group', fetchMemoGet(memoUrl + '/group', `${LoginData?.access_token}`), {});

  const [folderOpen, setFolderOpen] = useState(false);
  const [onclick, setOnClick] = useState(false);
  const [clickUserName, setClickUserName] = useState(true);

  const onClickUserName = () => {
    setClickUserName((prev) => !prev);
    console.log(clickUserName);
    console.log(GroupData);
  };
  const onSearch = useCallback(
    (e: any) => {
      e.preventDefault();
      console.log('search clicked :', searchText);
    },
    [searchText],
  );
  const onClickFolder = useCallback(
    (e) => {
      e.preventDefault();
      setFolderOpen((prev) => !prev);
    },
    [setFolderOpen],
  );

  const Groupcall = () => {
    const A = axios
      .get(
        memoUrl + '/group',

        {
          headers: {
            Authorization: `Bearer ${LoginData?.access_token}`,
          },

          withCredentials: true,
        },
      )
      .then((r) => {
        GroupMutate(r.data, false);
        console.log('get: 3차 성공', r.data);
      })
      .catch(() => console.log('get: 3차실패', LoginData?.access_token));
  };

  console.log('mwLogin:  ', LoginData);
  console.log('mwGroup:  ', GroupData);

  if (!GroupData) {
    Groupcall();
  }
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        padding: '3px',
        background: ' #bebebe',
      }}
    >
      <GroupSidebar>
        {/* 서치 바 */}
        <SearchTextDiv onSubmit={onSearch}>
          <SearchTextArea
            type={'text'}
            placeholder={'참여 그룹 명을 입력하세요'}
            value={searchText}
            onChange={onChangeSearchText}
          />

          <input style={{ marginLeft: '5px', padding: '5px' }} type="image" src={searchIcon} />
        </SearchTextDiv>
        <div
          style={{
            backgroundColor: 'gray',
            height: '80%',
            flexDirection: 'column',
            margin: '5px',
            alignContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          {/* group 바 상단 /이미지 이름 선 addIcon */}
          {/* 그룹 데이터 처리 : 이걸 map로 넣을 예정 */}
          <GroupSidebarTitle onClick={onClickUserName}>
            <img src={Box} alt="group_boxImg" />
            <span style={{ color: 'blue' }}>{LoginData ? LoginData.user.nickname : 'Loading...'}</span>
            <DashedLine />

            <img src={plus} alt="create_group_plusImg" />
          </GroupSidebarTitle>
          ;
          {clickUserName &&
            GroupData?.results!!.map((result) => {
              console.log('kiki :', GroupData);
              return (
                <div
                  key={result.id}
                  style={{ display: 'flex', flexDirection: 'column', width: '100%', marginBottom: 10 }}
                >
                  <GroupSidebarA resultName={result.name}></GroupSidebarA>
                </div>
              );
            })}
        </div>

        <DashedLine />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'wheat',
            justifyContent: 'center',
            alignItems: 'center',
            height: '10%',
            margin: 8,
          }}
        >
          <button style={{ width: '100%', margin: 9, height: '45px' }}>그룹가입모달</button>
          <button style={{ width: '100%', margin: 9, height: '45px' }}>그룹가입모달</button>
        </div>
      </GroupSidebar>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '79%',
          height: '100%',
          backgroundColor: 'transparent',
        }}
      >
        <GroupTopBar>
          <div style={{ width: '100%', height: '40%', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '90%', height: '!00%' }}>
              <img
                src={Box}
                style={{ marginLeft: '18px', width: 43, height: 43, backgroundColor: 'gray', marginTop: '3px' }}
                alt="그룹설명"
              />
              <span
                style={{
                  marginLeft: '5.5px',
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  fontSize: 35,
                  lineHeight: 42,
                  color: ' #000000',
                }}
              >
                그룹명 :
              </span>
            </div>
            <div style={{ width: '10%', display: 'flex', justifyContent: 'center' }}>
              <img width={46} height={46} src={Setting} alt="setting icon" />
            </div>
          </div>

          <div style={{ width: '100%', height: '60%', display: 'flex' }}>
            <div
              style={{
                width: '70%',
                display: 'flex',
                paddingTop: 10,
              }}
            >
              <span
                style={{
                  marginLeft: '29px',

                  fontFamily: 'Inter',
                  fontStyle: 'normal',

                  fontSize: 12,
                  color: ' #000000',
                }}
              >
                그룹 설명 : {'설명'}
              </span>
            </div>
            <div
              style={{
                width: '30%',
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

                  color: ' #000000',
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
                  color: ' #000000',
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
                  color: ' #000000',
                }}
              >
                작업 수 : {`작업 수`}
              </span>
            </div>
          </div>
        </GroupTopBar>

        {/*워크스페이스 : 상세 / 내용 / dmbar*/}

        <ContextLayout>
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
              </div>
            </div>
          </WorkDescriptionBar>
          <WorkspaceZone>
            <MemoContent />
          </WorkspaceZone>
          <DireecMessageBar></DireecMessageBar>
        </ContextLayout>
      </div>
    </div>
  );
};

export default MemoWorkspace;

// {/* <Header>
// <span>
//   <ProfileImg src={leaf} alt="fail to load profile" />
// </span>
// </Header>

// <WorkspaceWrapper>
// <Workspaces>
//   <AddButton>+</AddButton>
// </Workspaces>
// <Channels>
//   <WorkspaceName>
//     {/* {UserData?.Workspaces.find((v)=>{})} */}
//     sleact
//   </WorkspaceName>
//   <MenuScroll>
//     <WorkspaceModal>
//       <h2>Sleact</h2>
//       <button>채널 만들기</button>
//       <button>로그아웃</button>
//     </WorkspaceModal>
//     <ChannelList />
//     <DMList />
//   </MenuScroll>
// </Channels>
// <Chats>
//   <h1>라우팅존</h1>
//   {/* <Switch>
//     <Route path="/workspace/:workspace/channel/:channel" component={Channel} />
//     <Route path="/workspace/:workspace/dm/:id" component={DirectMessage} />
//   </Switch> */}
// </Chats>
// </WorkspaceWrapper> */}
