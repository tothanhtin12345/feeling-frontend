import { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
//code của mình
import ImageGridCard from "./WallTimeline/ImageGridCard";

import { getWallUserId } from "../../store/modules/Wall/selectors";

import { fetchPhotosSaga, resetPhotos } from "../../store/modules/Photos/slice";
import { getFetchPhotosLoading, getPhotos, getPhotosIsCurrentUser, getPhotosCanLoad } from "../../store/modules/Photos/selectors";
const PhotosStyled = styled.div`
  margin-top: 16px;
`;





const Photos = () => {
  const dispatch = useDispatch();

  const wallUserId = useSelector(getWallUserId);

  const isCurrentUser = useSelector(getPhotosIsCurrentUser);
  const photos = useSelector(getPhotos);
  const fetchPhotosLoading = useSelector(getFetchPhotosLoading);
  const canLoad = useSelector(getPhotosCanLoad)

  const handleRemoveImage = () => {};

  
  const handleGetMorePhotos = () => {
    if(!fetchPhotosLoading){
      dispatch(fetchPhotosSaga({ userId: wallUserId }))
    }
  }
  

  useEffect(() => {
   
    dispatch(fetchPhotosSaga({ userId: wallUserId }));
    return () => {
      dispatch(resetPhotos());
    };
  },[wallUserId]);

  return (
    <PhotosStyled>
      <ImageGridCard
        handleGetMore={handleGetMorePhotos}
        hasMore={canLoad}
        isCurrentUser={isCurrentUser}
        onRemoveImage={handleRemoveImage}
        type="big"
        files={photos}
        loading={fetchPhotosLoading}
      />
    </PhotosStyled>
  );
};
export default Photos;
