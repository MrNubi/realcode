import Modal from '@components/Modal';
import useInput from '@hooks/useInput';
import { Button, Input, InputGroupName, Label } from '@pages/Login/styles';
import { IChannel, IUser } from '@typings/db';
import axios from 'axios';
import React, { useCallback, useState, VFC } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import fetcher from '../../utills/fetcher';
import useSWR, { mutate } from 'swr';
import Box from '../../img/Box.png';
import Modal2 from '@components/Modal2';

interface Props {
  show: boolean;
  onCloseModal: () => void;
  setShowGroupInviteModal: (flag: boolean) => void;
}

const GroupInviteModal: VFC<Props> = ({ show, onCloseModal, setShowGroupInviteModal }) => {
  const [InvitePk, onChangeInvitePk, setInvitePk] = useInput('');
  // const [Password, onChangePassword, setPassword] = useInput('');
  // const [GroupDesc, onChangeGroupDesc, setGroupDesc] = useInput('');
  // const [x, setX] = useState('is_Active');

  const tockenData = sessionStorage.getItem('tocken');
  const { groupname, groupmemo, groupinnerdata } = useParams<{
    groupname: string;
    groupmemo?: string;
    groupinnerdata?: string;
  }>();
  const groupData = sessionStorage.getItem('group');
  const parsedData = JSON.parse(`${groupData}`);
  console.log(`paresd Data :`, parsedData);
  const onInviteGroup = useCallback(
    (e) => {
      e.preventDefault();

      if (!InvitePk || !InvitePk.trim()) {
        console.log('InvitePkNull :', InvitePk);
        return;
      }
      axios
        .post(
          `https://memolucky.run.goorm.io/invitation/group/${groupname}/`,
          {
            to_user: `${InvitePk}`,
            to_group: `${parsedData.id}`,
          },
          {
            headers: {
              Authorization: `Bearer ${tockenData}`,
            },
            withCredentials: true,
          },
        )
        .then((r) => {
          console.log('이게 되?');
          setShowGroupInviteModal(false);
          setInvitePk('');
        })
        .catch((error) => {
          console.log('이게 안되?');

          console.dir(error);
          toast.error(error.response?.data, { position: 'bottom-center' });
        });
    },
    [InvitePk, tockenData, groupname, parsedData],
  );

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={onInviteGroup}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img width={45} height={44} style={{ backgroundColor: 'white' }} src={Box} alt="create_group_plusImg" />
          <Label id="Group-label">
            <InputGroupName
              id="Group"
              type="text"
              defaultValue={InvitePk}
              onChange={onChangeInvitePk}
              placeholder={'초대할 유저의 pk를 입력하세요'}
            ></InputGroupName>
          </Label>

          {/* <div style={{ display: 'flex', marginLeft: 'auto', alignItems: 'center' }}>
            <label>
              <span style={{ marginLeft: '10px' }}>공개</span>
              <input
                type="radio"
                value={'is_Active'}
                onChange={(e) => {
                  setX(e.target.value);
                }}
              />
            </label>
            <label>
              <span style={{ marginLeft: '5px' }}>비공개</span>
              <input
                type="radio"
                value={'is_Private'}
                onChange={(e) => {
                  setX(e.target.value);
                }}
              />
            </label>

            {/* <Label id="Password-label">
              <InputInvitePk
                id="Password"
                type="Password"
                value={Password}
                onChange={onChangePassword}
                placeholder={'비밀번호를 입력하세요'}
                readOnly={x === 'is_Active' ? true : false}
              ></InputInvitePk>
            </Label>
          </div> 
          */}
          <input style={{ marginLeft: 15 }} type="submit" value={'저장'}></input>
        </div>

        {/* <Label id="GroupDesc-label">
          <InputInvitePk
            id="GroupDesc"
            type="text"
            value={GroupDesc}
            onChange={onChangeGroupDesc}
            placeholder={'그룹 설명'}
          ></InputInvitePk>
        </Label> */}
      </form>
    </Modal>
  );
};

export default GroupInviteModal;
