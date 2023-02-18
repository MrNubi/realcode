import styled from '@emotion/styled';

export const BaseContainer = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  height: 100%;

  background: #bebebe;
`;

export const GroupTopBar = styled.div`
  width: 100%;
  height: 160px;
  margin: 5px;

  background: #ffffff;
  border-radius: 15px;
`;
export const ContextLayout = styled.div`
  width: 100%;
  height: 890px;
  display: flex;
  background: transparent;
`;
export const WorkDescriptionBar = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  background: #8b8b8b;
  border-radius: 15px 0px 0px 15px;
`;
export const WorkspaceZone = styled.div`
  width: 59%;
  height: 100%;
  display: flex;
  background: #ffffff;
  border-radius: 0px 15px 15px 0px;
`;
export const DireecMessageBar = styled.div`
  margin-left: 10px;
  width: 16%;
  height: 100%;
  display: flex;
  background: #ffffff;
  border-radius: 15px;
`;

export const GroupSidebar = styled.div`
  width: 20%;
  height: 1060px;
  padding-left: 9px;
  padding-right: 9px;
  margin: 5px;
  margin-right: 10px;
  background: #ffffff;
  border-radius: 15px;
`;
export const SearchTextDiv = styled.form`
  display:flex;
  align-items:center
  bordercolor: transparent;
  width: 100%;
  margin-top: 14px;
  background: #D9D9D9;
  border-radius: 15px;
  height: 30px;
  padding: 0px 15px 0px 10px;
  color: white;
 
`;
export const SearchTextArea = styled.input`
  width: 90%;
  background: transparent;
  border: none;
  border-right: 0px;
  border-top: 0px;
  boder-left: 0px;
  boder-bottom: 0px;

  :focus {
    outline: none;
    border: none;
    border-right: 0px;
    border-top: 0px;
    boder-left: 0px;
    boder-bottom: 0px;
  }

  ::placeholder {
    color: white;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
  }
`;
