import React, { useCallback, useEffect, useState, VFC } from 'react';

import { Redirect, Route, Switch, useParams } from 'react-router';
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
  GroupTopBarHidden,
  LeftSideBar,
} from './styles';
import searchIcon from './SearchIcon.png';
import useInput from '@hooks/useInput';
import Box from '../../img/Box.png';

import plus from '../../img/add_group.png';

import useSWR from 'swr';
import { MGroup, MInnerGroup, MLogin, MUSer } from '@typings/memot';
import { Link, NavLink } from 'react-router-dom';
import MemoContent from '@components/MemoContent';
import fetchMemoGet from '../../utills/fetchMemoGet';
import axios from 'axios';
import GroupSidebarA from '@components/GroupSideBarA';
import ChannelListMeMo from '@components/ChannelListMemo';
import userProfile from '../../img/user.png';

import InviteChannelModal from '@components/InviteChannelModal';
import fetcherMemoLocal from '../../utills/fetcherMemoLocal';
import InviteGroupModal from '@components/inviteGroupModal';
import GroupTitleBar from '@components/GroupTitleBar';
import MemoInvestigtionZone from '@components/MemoInvestigationZone';
import FetchGroupModal from '@components/FetchGroupModal';
import ChannelList from '@components/ChannalList';

const MemoWorkspace: VFC = () => {
  const [searchText, onChangeSearchText, setSearchText] = useInput('');
  const memoUrl = 'https://memolucky.run.goorm.io';

  const { data: tockenData, mutate: tockenMutate } = useSWR<MLogin>('tocken', fetcherMemoLocal);

  const { groupname, groupinnerdata } = useParams<{ groupname?: string; groupinnerdata?: string }>();
  const paramsChange = () => {
    console.log('paramChange: ', groupname);
    if (!groupname) {
      return 'DEFAULTT';
    }
    return groupname!!;
  };

  const [folderOpen, setFolderOpen] = useState(-1);
  const [innerFolderOpen, setInnerFolderOpen] = useState(-1);
  const [clickUserName, setClickUserName] = useState(true);
  const [showCreateInviteChannel, onChangeShowInviteChannel, setShowInviteChannel] = useInput(false);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showUpdateGroupModal, setShowUpdateGroupModal] = useState(false);

  const onCloseModal = useCallback(() => {
    setShowInviteChannel(false);
    setShowCreateGroup(false);
    setShowUpdateGroupModal(false);
  }, [setShowInviteChannel]);
  const {
    data: GroupData,
    error: GroupErr,
    mutate: GroupMutate,
  } = useSWR<MGroup>(memoUrl + '/group', fetchMemoGet(memoUrl + '/group', `${tockenData}`), {});

  // const openFetchModal = () => {
  //   setShowUpdateGroupModal((prev) => !prev);
  //   console.log('setShowUpdateGroupModal', showUpdateGroupModal);
  // };
  const openCreateNewGroup = useCallback(
    (e: any) => {
      e.preventDefault();
      setShowCreateGroup((prev) => !prev);
      console.log('showCreateGroup :', showCreateGroup);
    },
    [setShowCreateGroup],
  );

  const onClickUserName = useCallback(() => {
    setClickUserName((prev) => !prev);
    console.log(clickUserName);
  }, []);
  const onSearch = useCallback(
    (e: any) => {
      e.preventDefault();
      console.log('search clicked :', searchText);
    },
    [searchText],
  );

  console.log('mwLogin:  ', tockenData);

  return (
    <LeftSideBar>
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
            height: '81%',
            flexDirection: 'column',
            margin: '1px',
            alignContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          {/* group 바 상단 /이미지 이름 선 addIcon */}
          {/* 그룹 데이터 처리 : 이걸 map로 넣을 예정 */}
          <GroupSidebarTitle
            onClick={onClickUserName}
            onContextMenu={(e) => {
              e.preventDefault();

              console.log('sdsdsdS');
            }}
          >
            <img src={userProfile} width={20} height={20} alt="group_boxImg" />
            <span style={{ color: 'blue', marginLeft: 5 }}>
              {tockenData ? sessionStorage.getItem('nickname') : 'Loading...'}
            </span>
          </GroupSidebarTitle>
          <div style={{ display: 'flex', width: '100%', height: '94%' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '50%',
                height: '100%',
                border: 2,
                borderStyle: 'dashed',
                borderColor: 'transparent',
                borderRightColor: 'black',
                overflowY: 'auto',
              }}
            >
              <div style={{ display: 'flex', height: 40 }}>
                <GroupSidebarTitle
                  style={{
                    marginRight: 5,
                    borderStyle: 'dashed',
                    borderColor: 'gray',
                    borderRightColor: 'transparent',
                  }}
                >
                  <img style={{ marginLeft: 0, marginRight: 5 }} src={Box} alt="group_boxImg" />
                  <span style={{ color: 'black' }}>{'Group'}</span>
                  <DashedLine />
                  <img src={plus} alt="" onClick={openCreateNewGroup} />
                </GroupSidebarTitle>
              </div>

              <Route path="/MemoWorkspace" component={ChannelList} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', width: '50%', height: '100%' }}>
              <div style={{ display: 'flex', height: 40 }}>
                <GroupSidebarTitle
                  style={{
                    marginLeft: 5,
                    borderStyle: 'dashed',
                    borderColor: 'gray',
                    borderLeftColor: 'transparent',
                  }}
                >
                  <img style={{ marginLeft: 0, marginRight: 5 }} src={Box} alt="group_boxImg" />
                  <span style={{ color: 'black' }}>{'File'}</span>
                  <DashedLine />
                  <img
                    src={plus}
                    alt=""
                    onClick={(e) => {
                      e.preventDefault();
                      setShowInviteChannel((prev) => !prev);
                    }}
                  />
                </GroupSidebarTitle>
              </div>
              <Switch>
                <Route
                  path="/MemoWorkspace/:groupname/:groupinnerdata"
                  render={() => (
                    <ChannelListMeMo
                      onCreateNewGrop={(e) => {
                        e.preventDefault();
                        setShowInviteChannel((prev) => !prev);
                        return true;
                      }}
                    />
                  )}
                />
                <Route
                  path="/MemoWorkspace/:groupname"
                  render={() => (
                    <ChannelListMeMo
                      onCreateNewGrop={(e) => {
                        e.preventDefault();
                        setShowInviteChannel((prev) => !prev);
                        return true;
                      }}
                    />
                  )}
                />
                <Route path="/MemoWorkspace" render={() => <div></div>} />
              </Switch>
            </div>
          </div>
        </div>

        <DashedLine style={{ marginBottom: 5 }} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '10%',
            margin: 8,
          }}
        >
          <NavLink
            to={'/MemoWorkspaceJoin'}
            style={{
              paddingTop: 2,
              textDecoration: 'none',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              width: '100%',
              margin: 5,
              fontSize: 20,
              height: '45px',
              border: '1px solid white',
              borderRadius: '15px',
              cursor: 'pointer',
              backgroundColor: '#B8B5B5',
              color: 'white',
            }}
          >
            그룹 가입하기
          </NavLink>
          <button
            style={{
              textDecoration: 'none',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              width: '100%',
              fontSize: 20,

              margin: 5,
              height: '40px',
              border: '1px solid white',
              borderRadius: '15px',
              cursor: 'pointer',

              backgroundColor: '#B8B5B5',
              color: 'white',
            }}
            onClick={openCreateNewGroup}
          >
            새 그룹 만들기
          </button>
          <button
            style={{
              textDecoration: 'none',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              width: '100%',
              fontSize: 20,

              margin: 5,
              height: '40px',
              border: '1px solid white',
              borderRadius: '15px',
              cursor: 'pointer',

              backgroundColor: '#B8B5B5',
              color: 'white',
            }}
            onClick={() => {
              if (window.confirm('로그아웃 하시겠습니까?')) {
                console.log('로그아웃');
                sessionStorage.clear();
              } else {
                alert('취소합니다.');
              }

              if (!sessionStorage.getItem('tocken')) {
                console.log('datacheck login in: ', tockenData);
                return <Redirect to="/" />;
              }
            }}
          >
            로그아웃
          </button>
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
        <GroupTopBar style={!groupname ? { display: 'none' } : { visibility: 'visible' }}>
          <Switch>
            <Route path="/MemoWorkspaceJoin" component={GroupTopBarHidden} />
            <Route path="/MemoWorkspace/:groupname" render={() => <GroupTitleBar />} />
            <Route
              path="/Memoworkspace"
              render={() => (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    height: '20%',
                    margin: 5,
                    background: '#ffffff',
                    borderRadius: '15px',
                  }}
                ></div>
              )}
            />
          </Switch>
        </GroupTopBar>

        {/* 

            display: flex;

            flex-direction: column;

            width: 100%;

            height: 20%;
            
            margin: 5px;

            background: #ffffff;

            border-radius: 15px;
            
            */}

        {/*워크스페이스 : 상세 / 내용 / dmbar*/}

        <ContextLayout>
          <Switch>
            <Route path="/MemoWorkspace/:groupname/:groupinnerdata/:groupmemo" component={MemoContent} />
            <Route path="/MemoWorkspace/:groupname/:groupinnerdata" component={MemoContent} />
            <Route path="/MemoWorkspaceJoin" render={() => <MemoInvestigtionZone tocken={`${tockenData}`} />} />
            <Route path="/MemoWorkspace/:groupname" component={MemoContent} />

            <Route path="/MemoWorkspace" component={MemoContent} />
          </Switch>
        </ContextLayout>
        <InviteChannelModal
          show={showCreateInviteChannel}
          onCloseModal={onCloseModal}
          setShowInviteChannelModal={setShowInviteChannel}
        />
        <InviteGroupModal
          show={showCreateGroup}
          onCloseModal={onCloseModal}
          setShowInviteGroupModal={setShowCreateGroup}
        />
        <FetchGroupModal
          show={showUpdateGroupModal}
          onCloseModal={onCloseModal}
          setShowFetchGroupModal={setShowUpdateGroupModal}
        />
      </div>
    </LeftSideBar>
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
