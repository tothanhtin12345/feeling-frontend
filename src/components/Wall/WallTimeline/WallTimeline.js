import React, { useState, useMemo, useEffect } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

//code của mình

import { SmallIconStyled } from "../../Styled/Icon";


import {
  getWallPosts,
  
  getWallUserConfig,
  getWallUserId,
  getWallUserInformations,
  getWallUserCreatedAt,
  getWallUserFriendCount,
  getWallUserFollowerCount,
  getIsCurrentUser,
  getWallCanLoad,
  getWallLoading,
  getWallPostFirstLoad,

} from "../../../store/modules/Wall/selectors";

import {
  fetchWallPostsSaga,
  setWallPostFirstLoad,

} from "../../../store/modules/Wall/slice";

import TimelineLayout from "../../UI/TimelineLayout";



const WallTimelineStyled = styled.div``;






//dòng thời gian ở trang cá nhân của 1 người
//không nên lấy giá trị wallUserId ở state vì nó có thể bị chậm và gây ảnh hưởng đến việc fetch dữ liệu ban đầu
const WallTimeline = ({wallUserId}) => {
  
  const dispatch = useDispatch();

  const wallPosts = useSelector(getWallPosts);
  const wallUserConfig = useSelector(getWallUserConfig);
  // const wallUserId = useSelector(getWallUserId);
  const wallUserInformations = useSelector(getWallUserInformations);
  const wallUserCreatedAt = useSelector(getWallUserCreatedAt);
  const wallUserFriendCount = useSelector(getWallUserFriendCount);
  const walllUserFollowerCount = useSelector(getWallUserFollowerCount);
  const isCurrentUser = useSelector(getIsCurrentUser);
  const canLoad = useSelector(getWallCanLoad);
  const loading = useSelector(getWallLoading);
  const firstLoad = useSelector(getWallPostFirstLoad); 

 



  useEffect(()=>{
    //nếu đã load lần đầu rồi thì không load lại
    if(firstLoad===true) return;
  
    dispatch(fetchWallPostsSaga({_id: wallUserId}));
    dispatch(setWallPostFirstLoad(true));
    return () => {

    }
  },[firstLoad,wallUserId])

  //hàm xử lý để lấy thêm dữ liệu
  //sau này giá trị hasMore hay việc fetch thêm dữ liệu sẽ được lưu trong store và thực hiện qua redux-saga
  const handleGetMore = () => {
    dispatch(fetchWallPostsSaga({_id: wallUserId}))
  };

  


  const informationsList = useMemo(() => {
    const {
      showFollowerCount,
      showBirthday,
      showNumberphone,
      showWorkAddress,
      showHomeAddress,
    } = wallUserConfig;
    const {
     
      numberphone,
      gender,
      birthday,
      homeAddress,
      workAddress,
     
     
    } = wallUserInformations;

    

    const introduceInformations = [
      {
        key: `participant-date-${wallUserId}`,
        icon: <SmallIconStyled className="fas fa-clock"></SmallIconStyled>,
        title: "Ngày tham gia",
        content: moment(wallUserCreatedAt).format("DD/MM/YYYY"),
      },
    ];

    if (showBirthday && birthday) {
      introduceInformations.push({
        key: `birthday-${wallUserId}`,
        icon: (
          <SmallIconStyled className="fas fa-birthday-case"></SmallIconStyled>
        ),
        title: "Sinh nhật",
        content: birthday,
      });
    }

    introduceInformations.push({
      key: `gender-${wallUserId}`,
      icon: <SmallIconStyled className="fas fa-venus-mars"></SmallIconStyled>,
      title: "Giới tính",
      content: gender === "male" ? "Nam" : "Nữ",
    });

    const socialInformations = [
      {
        key: `friend-count-${wallUserId}`,
        icon: <SmallIconStyled className="fas fa-users"></SmallIconStyled>,
        title: "Số lượng bạn bè",
        content: wallUserFriendCount,
      },
    ];

    if(showFollowerCount){
      socialInformations.push({
        key: `follower-count-${wallUserId}`,
        icon: <SmallIconStyled className="fas fa-users"></SmallIconStyled>,
        title: "Số người theo dõi",
        content: walllUserFollowerCount,
      })
    }

    const contactInformations = [];

    if (showNumberphone && numberphone) {
      contactInformations.push({
        key: `numberphone-${wallUserId}`,
        icon: <SmallIconStyled className="fas fa-phone-alt"></SmallIconStyled>,
        title: "Số điện thoại",
        content: numberphone,
      });
    }
    if (showHomeAddress && homeAddress) {
      contactInformations.push({
        key: `home-address-${wallUserId}`,
        icon: <SmallIconStyled className="fas fa-home"></SmallIconStyled>,
        title: "Nơi ở",
        content: homeAddress,
      });
    }

    if (showWorkAddress && workAddress) {
      contactInformations.push({
        key: `work-address-${wallUserId}`,
        icon: <SmallIconStyled className="fas fa-building"></SmallIconStyled>,
        title: "Nơi ở",
        content: workAddress,
      });
    }

    const arr = [
      {
        key: `introduce-${wallUserId}-in-0`,
        title: "Giới thiệu",
        informations: introduceInformations,
      },
      {
        key: `social-${wallUserId}-in-1`,
        title: "Xã hội",
        informations: socialInformations,
      },
    ];
    if(contactInformations.length > 0){
      arr.push({
        key: `contact-${wallUserId}-in-2`,
        title: "Liên hệ",
        informations: contactInformations,
      })
    }
    return arr
  }, [wallUserId,wallUserConfig,wallUserInformations,wallUserCreatedAt,wallUserFriendCount,walllUserFollowerCount]);

  return (
    <WallTimelineStyled>
      <TimelineLayout
        informationsList={informationsList}
        type="individual"
        
        wallUserId={wallUserId}
        isCurrentUser={isCurrentUser}
        posts={wallPosts}
        handleGetMore={handleGetMore}
        hasMore={canLoad && !loading}
        loading={loading}
      />
    </WallTimelineStyled>
  );
};
export default WallTimeline;
