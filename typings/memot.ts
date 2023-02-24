export interface MLogin {
  access_token: string;
  refresh_token: string;
  user: MUSer;
}

export interface MUSer {
  pk: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  nickname: string;
  avatar: string | null;
}

export interface MGroup {
  count: number;
  next: null;
  previous: null;
  results: MGroupResult[];
}
export interface MInnerGroup {
  count: number;
  next: null;
  previous: null;
  results: MIGroupResult[];
}

export interface MGroupResult {
  id: number;
  name: string;
  user: number;
  desc: string | null;
  is_active: boolean;
  is_private: boolean;
  created_at: string | null;
}
export interface MIGroupResult {
  pk: number;
  group: number;
  user: number;
  username: string;
  nickname: string;
  parent: string | null;
  name: string;
  file_type: string;
  created_at: string;
}

export interface MGroupDataMemo {
  count: number;
  next: string | null;
  previous: string | null;
  results: MGroupMemoDataResult[];
}

export interface MGroupMemoDataResult {
  pk: number;
  user: number;
  username: string;
  nickname: string;
  parent: number | null;
  text: string;
  uid: string;
  is_show: boolean;
  is_like: boolean;
  like_count: number;
  refer_count: number;
  file_count: number;
  refer_user: [];
  memo_file: [
    {
      file: string;
    },
  ];
  created_at: string;
}
