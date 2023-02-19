export interface MLogin {
  access_token: string;
  refresh_token: string;
  user: MUSer[];
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
