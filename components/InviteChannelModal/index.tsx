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
  const [Parent, onChangeParent, setParent] = useInput('');

  const tockenData = sessionStorage.getItem('tocken');
  const { groupname, groupmemo, groupinnerdata } = useParams<{
    groupname: string;
    groupmemo?: string;
    groupinnerdata?: string;
  }>();
  const group = sessionStorage.getItem(`group`);
  const groupNum = group ? JSON.parse(`${group}`).id : '';
  const onCreateGroup = useCallback(
    (e) => {
      e.preventDefault();
      console.log('text :', Text);
      console.log('group :', group, `${group}`);
      console.log('textG :', groupNum);
      if (!Text || !Text.trim()) {
        console.log('text :', Text);
        return;
      }
      if (!groupNum) {
        console.log('groupNum return :', groupNum);
        return;
      }
      axios
        .post(
          `https://memolucky.run.goorm.io/group/group-data/${decodeURI(`${groupname}`)}/`,
          {
            group: `${groupNum}`,
            name: `${Text}`,
            file_type: 'folder',
          },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${tockenData}`,
            },
          },
        )
        .then((r) => {
          console.log('이게 되?');
          let result = JSON.stringify(r.data);
          sessionStorage.setItem(`inner${r.data.pk}`, result);
          setShowInviteChannelModal(false);
          setText('');
          setParent('');
          location.reload();
        })
        .catch((error) => {
          console.log('이게 안되?', `${groupNum}`, error);
          console.log('이게 안되?', `${groupNum}`, tockenData);

          console.dir(error);
          toast.error(error.response?.data, { position: 'bottom-center' });
        });
    },
    [Text, Parent, tockenData, groupNum],
  );

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={onCreateGroup}>
        <Label id="member-label">
          <span>파일 이름</span>
          <Input id="member" type="text" value={Text} onChange={onChangeText}></Input>
        </Label>

        <Button type="submit">생성하기</Button>
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
      <form onSubmit={onCreateGroup}>
        <EditPost style={{ display: 'flex', width: '100%', height: '32%', backgroundColor: 'black' }}>
          <ChatBox chat={Text} onChangeChat={onChangeText} onSubmitForm={onCreateGroup} />
        </EditPost>
      </form>
    </Modal>
  );
};

export default InviteChannelModal;

*/
}
