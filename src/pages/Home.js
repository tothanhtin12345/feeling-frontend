import { Layout } from "antd";


//code của mình
import SubContent from "../components/Layout/Sub/SubContent";
import MainSider from "../components/Layout/Main/MainSider";
import OnlineList from "../components/Home/OnlineList";
import HomeTimeline from "../components/Home/HomeTimeline";
import useFetchOnlineGroupsChat from "../hooks/home/useFetchOnlineGroupsChat";

const Home = () => {


  //lấy một số groups chat mới nhất để hiện lên online list
  useFetchOnlineGroupsChat();

  return (
    <Layout>
      {/* Phần Layout này là để áp dụng cho trang chủ */}
      {/* SubContent chứa Timeline */}
      {/* MainSider chứa phần Liên hệ */}
      <SubContent className="near-sub-sider">
        <HomeTimeline/>
      </SubContent>
      {/* Có danh sách người dùng đang online - và group chat */}
      <MainSider className="sider-right">
        <OnlineList/>
      </MainSider>
    </Layout>
  );
};

export default Home;