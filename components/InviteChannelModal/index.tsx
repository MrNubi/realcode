import Modal from '@components/Modal';
import useInput from '@hooks/useInput';
import { Button, Input, Label } from '@pages/Login/styles';
import { IChannel, IUser } from '@typings/db';
import axios from 'axios';
import React, { useCallback, VFC } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import fetcher from '../../utills/fetcher';
import useSWR, { mutate } from 'swr';

interface Props {
  show: boolean;
  onCloseModal: () => void;
  setShowInviteChannelModal: (flag: boolean) => void;
}

const InviteChannelModal: VFC<Props> = ({ show, onCloseModal, setShowInviteChannelModal }) => {
  const [Text, onChangeText, setText] = useInput('');
  const { workspace, channel } = useParams<{ workspace: string; channel: string }>();

  const { data: UserData } = useSWR<IUser>('/api/users', fetcher, {});

  const { data: memberData, mutate: memberMutate } = useSWR<IUser[]>(
    UserData && channel ? `/api/workspaces/${workspace}/channels/${channel}/members` : null,
    fetcher,
  );
  const tockenData = sessionStorage.getItem('tocken');
  const { groupname, groupmemo, groupinnerdata } = useParams<{
    groupname: string;
    groupmemo?: string;
    groupinnerdata?: string;
  }>();

  const onInviteMember = useCallback(
    (e) => {
      e.preventDefault();
      console.log('text :', Text);
      if (!Text || !Text.trim()) {
        console.log('text :', Text);
        return;
      }
      axios
        .post(
          `https://memolucky.run.goorm.io/group/group-data/${decodeURI(`${groupname}`)}/`,
          {
            group: '4',
            parent: null,
            name: Text,
            file_type: 'folder',
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
          setShowInviteChannelModal(false);
          setText('');
        })
        .catch((error) => {
          console.log('이게 안되?');

          console.dir(error);
          toast.error(error.response?.data, { position: 'bottom-center' });
        });
    },
    [Text],
  );

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={onInviteMember}>
        <Label id="member-label">
          <span>이메일</span>
          <Input id="member" type="text" value={Text} onChange={onChangeText}></Input>
        </Label>

        <Button type="submit">초대하기</Button>
      </form>
    </Modal>
  );
};

export default InviteChannelModal;

{
  /*
  import Modal from '@components/Modal';
import useInput from '@hooks/useInput';
import { Button, Input, Label } from '@pages/Login/styles';
import { IChannel, IUser } from '@typings/db';
import axios from 'axios';
import React, { useCallback, VFC } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import fetcher from '../../utills/fetcher';
import useSWR, { mutate } from 'swr';
import { EditColumnDiv, EditColumnDiv2, EditPost } from '@components/MemoContent/styles';
import ChatBox from '@components/ChatBox';

interface Props {
  show: boolean;
  onCloseModal: () => void;
  setShowInviteChannelModal: (flag: boolean) => void;
}

const InviteChannelModal: VFC<Props> = ({ show, onCloseModal, setShowInviteChannelModal }) => {
  const [Text, onChangeText, setText] = useInput('');


  const { data: UserData } = useSWR<IUser>('/api/users', fetcher, {});


  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={onInviteMember}>
        <EditPost style={{ display: 'flex', width: '100%', height: '32%', backgroundColor: 'black' }}>
          <ChatBox chat={Text} onChangeChat={onChangeText} onSubmitForm={onInviteMember} />
        </EditPost>
      </form>
    </Modal>
  );
};

export default InviteChannelModal;

*/
}
