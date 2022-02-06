import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spin } from "antd";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
//code của mình
import { ModalStyled } from "../../Styled/Modal";
import ListTile from "../../UI/ListTile";
import OnlineAvatar from "../../UI/OnlineAvatar";
import hahaIcon from "../../../imagesSource/emotion-icons/haha.svg";
import angryIcon from "../../../imagesSource/emotion-icons/angry.svg";
import sadIcon from "../../../imagesSource/emotion-icons/sad.svg";
import likeIcon from "../../../imagesSource/emotion-icons/like.svg";
import { MediumTitleStyled, SmallTitleStyled } from "../../Styled/Text";
import useHttpRequest from "../../../hooks/useHttpRequest";

const LikeInformationsWrapperStyled = styled.div`
  .like-icon {
    width: 20px;
    height: 20px;
  }
`;

const iconObjects = {
  haha: hahaIcon,
  like: likeIcon,
  angry: angryIcon,
  sad: sadIcon,
};

const LikeInformationsModal = ({ visible, postId, onCancel }) => {
  const [likeInformations, setLikeInformations] = useState([]);
  const [canLoad, setCanLoad] = useState(true);
  const { loading, error, sendRequest } = useHttpRequest();
  const limit = 10;

  const handleFetchLikeInformationsSuccess = ({ resData }) => {
    const { likes } = resData;

  

    if (likes.length < limit) {
      setCanLoad(false);
    }

    setLikeInformations((current) => {
      return [...current, ...likes];
    });
  };

  const fetchLikeInformations = () => {
    let params = {
      postId,
      limit: limit,
    };

    if (likeInformations.length > 0) {


        params = {
        ...params,
        lastId: likeInformations[likeInformations.length - 1]._id,
      };
    }

    sendRequest({
      axiosConfig: {
        url: "/post/like-informations",
        method: "GET",
        params,
      },
      successCallback: handleFetchLikeInformationsSuccess,
      failedCallback: (err) => console.log(err),
    });
  };

  useEffect(() => {
    fetchLikeInformations();
  }, []);

  const handleGetMore = () => {
    fetchLikeInformations();
  };

  return (
    <ModalStyled
      title={
        <MediumTitleStyled>Những người đã thích bài viết</MediumTitleStyled>
      }
      footer={null}
      visible={visible}
      zIndex={9999999999}
      onCancel={onCancel}
    >
      <InfiniteScroll
        height={"300px"}
        dataLength={likeInformations.length}
        next={handleGetMore}
        hasMore={canLoad}
        loader={
          <div style={{ textAlign: "center" }}>
            <Spin />
          </div>
        }
      >
        <LikeInformationsWrapperStyled>
          {likeInformations.map((item, index) => {
            return (
              <NavLink
                key={`like-informations-${index}-${item._id}`}
                to={`/wall/${item.owner._id}`}
              >
                <ListTile
                  showAction={false}
                  title={
                    <SmallTitleStyled>
                      {item.owner.informations.displayName}
                    </SmallTitleStyled>
                  }
                  subTitle={
                    <img
                      className="like-icon"
                      src={iconObjects[item.emotion]}
                    />
                  }
                  avatar={
                    <OnlineAvatar
                      avatar={
                        item.owner.avatar
                          ? item.owner.avatar.files[0].fileUrl
                          : null
                      }
                      online={false}
                      size={42}
                    />
                  }
                />
              </NavLink>
            );
          })}
        </LikeInformationsWrapperStyled>
      </InfiniteScroll>
    </ModalStyled>
  );
};

export default LikeInformationsModal;
