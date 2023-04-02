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
  setShowInviteGroupModal: (flag: boolean) => void;
}

const InviteGroupModal: VFC<Props> = ({ show, onCloseModal, setShowInviteGroupModal }) => {
  const [GroupName, onChangeGroupName, setGroupName] = useInput('');
  const [Password, onChangePassword, setPassword] = useInput('');
  const [GroupDesc, onChangeGroupDesc, setGroupDesc] = useInput('');
  const [x, setX] = useState('is_Active');

  const tockenData = sessionStorage.getItem('tocken');
  const { groupname, groupmemo, groupinnerdata } = useParams<{
    groupname: string;
    groupmemo?: string;
    groupinnerdata?: string;
  }>();
  const group = sessionStorage.getItem(`inner${groupinnerdata}`);
  const groupNum = group ? JSON.parse(`${group}`).group : '';
  const onInviteGroup = useCallback(
    (e) => {
      e.preventDefault();
      console.log('GroupName :', GroupName);
      console.log('GroupName :', GroupDesc);

      if (!GroupName || !GroupName.trim()) {
        console.log('GroupNameNull :', GroupName);
        return;
      } else if (!GroupDesc || !GroupDesc.trim()) {
        console.log('GroupDescNull :', GroupDesc);
        return;
      }
      axios
        .post(
          `https://memolucky.run.goorm.io/group/`,
          {
            name: `${GroupName}`,
            desc: `${GroupDesc}`,
            is_active: `${x === 'is_Active' ? 1 : 0}`,
            is_private: `${x === 'is_Private' ? 1 : 0}`,
            Password: `${x === 'is_Private' ? Password : null}`,
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
          let result = JSON.stringify(r.data);
          sessionStorage.setItem(`inner${r.data.pk}`, result);
          setShowInviteGroupModal(false);
          setGroupName('');
          setGroupDesc('');
          setPassword('');
        })
        .catch((error) => {
          console.log('이게 안되?');

          console.dir(error);
          toast.error(error.response?.data, { position: 'bottom-center' });
        });
    },
    [GroupName, GroupDesc, x, Password],
  );

  return (
    <Modal2 show={show} onCloseModal2={onCloseModal}>
      <form onSubmit={onInviteGroup}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img width={45} height={44} style={{ backgroundColor: 'white' }} src={Box} alt="create_group_plusImg" />
          <Label id="Group-label">
            <InputGroupName
              id="Group"
              type="text"
              defaultValue={GroupName}
              onChange={onChangeGroupName}
              placeholder={'그룹 명을 입력하세요'}
            ></InputGroupName>
          </Label>

          <div style={{ display: 'flex', marginLeft: 'auto', alignItems: 'center' }}>
            <label>
              <span style={{ marginLeft: '10px' }}>공개</span>
              <input
                type="radio"
                value={'is_Active'}
                checked={x === 'is_Active'}
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
                checked={x === 'is_Private'}
                onChange={(e) => {
                  setX(e.target.value);
                }}
              />
            </label>

            <Label id="Password-label">
              <InputGroupName
                id="Password"
                type="Password"
                value={Password}
                onChange={onChangePassword}
                placeholder={'비밀번호를 입력하세요'}
                readOnly={x === 'is_Active' ? true : false}
              ></InputGroupName>
            </Label>
          </div>
        </div>

        <Label id="GroupDesc-label">
          <InputGroupName
            id="GroupDesc"
            type="text"
            value={GroupDesc}
            onChange={onChangeGroupDesc}
            placeholder={'그룹 설명'}
          ></InputGroupName>
        </Label>
        <input style={{ marginLeft: 15 }} type="submit" value={'저장'}></input>
      </form>
    </Modal2>
  );
};

export default InviteGroupModal;
