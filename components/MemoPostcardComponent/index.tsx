import React, { useEffect, useState, VFC } from 'react';
import DefaultProfile from '../../img/user.png';
import setting from '../../img/Setting.png';
import heart from '../../img/heart.png';
import { useParams } from 'react-router';

interface PostProps {
  postType?: string;
  postId?: string;
  created?: string;
  profile?: string | null;
  hostname?: string;
  message?: string;
  file?: string;
  is_host?: boolean;
  likeCount?: string;
  settingClick?: boolean;
  onClickPostPatch?: (e: any, id?: number) => void;
  onClickPostDel?: (e: any, id?: number) => void;
  onClickSetting?: (e: any, id?: number) => void;
}

const MemoPostcardComponent: VFC<PostProps> = ({
  postType,
  postId,
  created,
  profile,
  hostname,
  message,
  file,
  is_host,
  likeCount,
  settingClick,
  onClickPostPatch,
  onClickPostDel,
  onClickSetting,
}: PostProps) => {
  const { groupname, groupinnerdata } = useParams<{ groupname?: string; groupinnerdata?: string }>();
  const [showPopup, setShowPopUp] = useState(false);

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', border: '0.5px solid #6C6C6C' }}>
      <div
        style={{
          padding: 10,
          display: 'flex',
          flexDirection: 'column',
          width: '85%',
          height: '100%',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <span>
            # {postId} / {created}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={profile ? profile : DefaultProfile}
            alt="profile"
            width={postType === 'reply' ? 22 : 44}
            height={postType === 'reply' ? 22 : 44}
            style={{ marginRight: 5 }}
          />
          <span>{`${hostname}`}</span>
        </div>
        <div>
          <span>{message}</span>
        </div>
        {postType != 'reply' && (
          <div>
            <small>{file ? 'file 1' : null}</small>
          </div>
        )}
      </div>
      <div
        style={
          is_host
            ? { display: 'flex', flexDirection: 'column', width: '15%', height: '100%' }
            : { visibility: 'hidden' }
        }
      >
        <img
          src={is_host ? setting : null}
          alt="setting 아이콘"
          width={22}
          height={22}
          style={{ cursor: 'pointer', margin: '5px', marginLeft: 'auto' }}
          onClick={(e) => {
            e.preventDefault();
            setShowPopUp((p) => !p);
          }}
        />

        {showPopup && (
          <div
            style={{
              width: 79,
              height: 46,
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '50%',
                cursor: 'pointer',
                border: '1px solid #A1A8B9',
              }}
              onClick={onClickPostPatch}
            >
              수정하기
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '50%',
                cursor: 'pointer',
                border: '1px solid #A1A8B9',
              }}
              onClick={onClickPostDel}
            >
              삭제하기
            </div>
          </div>
        )}

        {likeCount && (
          <div style={{ display: 'flex', margin: '5px', marginTop: 'auto', marginLeft: 'auto', alignItems: 'center' }}>
            <img src={heart} alt="setting 아이콘" width={22} height={22} style={{ marginRight: '5px' }} />
            <span>={likeCount}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoPostcardComponent;
