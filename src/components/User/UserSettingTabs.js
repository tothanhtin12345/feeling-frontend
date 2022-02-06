import styled from "styled-components";
import { Tabs } from "antd";
import { useDispatch } from "react-redux";
//code của mình
import { SmallTitleStyled } from "../Styled/Text";
import { SmallIconStyled } from "../Styled/Icon";
import { RectangleButtonStyled } from "../Styled/Button";
import InformationForm from './InformationForm';
import ChangePasswordForm from "./ChangePasswordForm";
import { logoutSaga } from "../../store/modules/Login/slice";
const { TabPane } = Tabs;

const UserSettingTabsStyled = styled.div`
  &&& {
    .tabs-wrapper {
      padding: 10px 40px;
      background-color: #ffffff;
      border: 1px solid transparent;
      border-radius: 15px;
    }
    .ant-tabs-ink-bar {
      display: none;
    }
    .tab-item {
      display: flex;
      column-gap: 5px;
      align-items: center;
    }

    .ant-tabs-tab-active {
      .tab-item {
        .tab-icon,
        .tab-title {
          color: #615dfa;
        }
      }
    }
    .action-button {
      margin-top: 5px;
      padding: 5px;
      display: flex;
      justify-content: flex-end;
      width: 100%;
      
      span, i{
        color:#FFFFFF;
      }
    }
  }
`;

const UserSettingTabs = () => {
  const dispatch = useDispatch();
  return (
    <UserSettingTabsStyled>
      <div className="tabs-wrapper">
        <Tabs>
          <TabPane
            tab={
              <span className="tab-item">
                <SmallIconStyled className="fas fa-user-edit tab-icon"></SmallIconStyled>
                <SmallTitleStyled className="tab-title">
                  Thông tin cá nhân
                </SmallTitleStyled>
              </span>
            }
            key="user-information-tab-1"
          >
            <InformationForm/>
          </TabPane>
          <TabPane
            tab={
              <span className="tab-item">
                <SmallIconStyled className="fas fa-lock tab-icon"></SmallIconStyled>
                <SmallTitleStyled className="tab-title">
                  Đổi mật khẩu
                </SmallTitleStyled>
              </span>
            }
            key="user-information-tab-2"
          >
            <ChangePasswordForm/>
          </TabPane>
        </Tabs>
      </div>

      <div className="action-button">
        <RectangleButtonStyled color="#615DFA" className="tab-item" type="button" onClick={()=>dispatch(logoutSaga())}>
          <SmallIconStyled className="fas fa-sign-out-alt"></SmallIconStyled>
          <SmallTitleStyled>Đăng xuất</SmallTitleStyled>
        </RectangleButtonStyled>
      </div>
    </UserSettingTabsStyled>
  );
};
export default UserSettingTabs;
