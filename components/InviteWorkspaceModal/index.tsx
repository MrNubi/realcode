import Modal from '@components/Modal';
import useInput from '@hooks/useInput';
import { Button, Input, Label } from '@pages/Login/styles';
import { IChannel, IUser } from '@typings/db';
import axios from 'axios';
import React, { useCallback, VFC } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import fetcher from '../../utills/fetcher';
import useSWR from 'swr';
import { EditColumnDiv, EditColumnDiv2, EditPost } from '@components/MemoContent/styles';
import ChatBox from '@components/ChatBox';

interface Props {
  show: boolean;
  onCloseModal: () => void;
  setShowInviteWorkspaceModal: (flag: boolean) => void;
}

const InviteWorkspaceModal: VFC<Props> = ({ show, onCloseModal, setShowInviteWorkspaceModal }) => {
  const [newMember, onChangeNewMember, setNewMember] = useInput('');
  const [newUrl, onChangeNewUrl] = useInput('');
  const { workspace, channel } = useParams<{ workspace: string; channel: string }>();

  const { data: UserData } = useSWR<IUser>('/api/users', fetcher, {});

  const { data: memberData, mutate: memberMutate } = useSWR<IChannel[]>(
    UserData ? `/api/workspaces/${workspace}/members` : null,

    fetcher,
  );

  const onInviteMember = useCallback(
    (e) => {
      e.preventDefault();
      if (!newMember || !newMember.trim()) {
        return;
      }
      axios
        .post(`/api/workspaces/${workspace}/members`, {
          email: newMember,
        })
        .then((response) => {
          memberMutate(response.data, false);
          setShowInviteWorkspaceModal(false);
          setNewMember('');
        })
        .catch((error) => {
          console.dir(error);
          toast.error(error.response?.data, { position: 'bottom-center' });
        });
    },
    [workspace, newMember],
  );

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={onInviteMember}>
        <EditPost style={{ display: 'flex', width: '100%', height: '22%' }}>
          <EditColumnDiv>
            <ChatBox chat={newMember} onChangeChat={onChangeNewMember} onSubmitForm={onInviteMember} />
          </EditColumnDiv>
          <EditColumnDiv2></EditColumnDiv2>
        </EditPost>
      </form>
    </Modal>
  );
};

export default InviteWorkspaceModal;
