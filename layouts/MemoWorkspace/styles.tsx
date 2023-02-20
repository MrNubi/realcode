import styled from '@emotion/styled';

export const GroupTopBar = styled.div`
  display: flex;
  flex-direction: column;
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
  flex-direction: column;
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
  height: 3%;
  max-high:30px;
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

export const GroupSidebarTitle = styled.div`
  display: flex;
  flex-basis: 100%;
  align-items: center;
  fontsize: 14px;
  margin: 8px;
`;
export const DashedLine = styled.div`
  flex-grow: 1;
  height: 1px;
  font-size: 0px;
  line-height: 0px;
  border: 0.2px;
  border-style: dashed;
  border-color: black;
  margin-top: 1px;
  margin-bottom: 1px;
  margin-left: 3px;
  margin-right: 10px;
`;
