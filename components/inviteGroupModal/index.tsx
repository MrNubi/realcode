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

  const isActive = document.querySelector('input[name="chk_open"]')?.ariaChecked;
  const isActiveValue = document.querySelector('input[name="chk_open"]:checked')?.nodeValue;

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
      console.log('GroupName :', groupNum);
      console.log('isActive :', isActive);
      console.log('isActive :', isActiveValue);
      if (!GroupName || !GroupName.trim()) {
        console.log('GroupNameNull :', GroupName);
        return;
      }
      axios
        .post(
          `https://memolucky.run.goorm.io/group/`,
          {
            name: `${GroupName}`,
            desc: `${GroupDesc}`,
            is_active: `${isActive == '' ? 1 : 0}`,
            is_private: `${isActive ? 0 : 1}`,
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
        })
        .catch((error) => {
          console.log('이게 안되?');

          console.dir(error);
          toast.error(error.response?.data, { position: 'bottom-center' });
        });
    },
    [GroupName],
  );

  return (
    <Modal2 show={show} onCloseModal2={onCloseModal}>
      <form onSubmit={onInviteGroup}>
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'yellow' }}>
          <img width={45} height={44} style={{ backgroundColor: 'white' }} src={Box} alt="create_group_plusImg" />
          <Label id="Group-label">
            <InputGroupName
              id="Group"
              type="GroupName"
              value={GroupName}
              onChange={onChangeGroupName}
              placeholder={'그룹 명을 입력하세요'}
            ></InputGroupName>
          </Label>

          <div style={{ display: 'flex', marginLeft: 'auto', alignItems: 'center' }}>
            <span style={{ marginLeft: '10px' }}>공개</span>
            <input type="radio" name="chk_open" value="1" checked />
            <span style={{ marginLeft: '5px' }}>비공개</span>
            <input type="radio" name="chk_open" value="0" />
            <Label id="Password-label">
              <InputGroupName
                id="Password"
                type="Password"
                value={Password}
                onChange={onChangePassword}
                placeholder={'비밀번호를 입력하세요'}
              ></InputGroupName>
            </Label>
            <input style={{ marginLeft: 15 }} type="submit" value={'저장'}></input>
          </div>
        </div>

        <Label id="GroupDesc-label">
          <InputGroupName
            id="GroupDesc"
            type="GroupDesc"
            value={GroupDesc}
            onChange={onChangeGroupDesc}
            placeholder={'그룹 설명'}
          ></InputGroupName>
        </Label>
      </form>
    </Modal2>
  );
};

export default InviteGroupModal;
