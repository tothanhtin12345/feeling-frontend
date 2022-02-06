import { useReducer, useEffect } from "react";
import { useSelector } from "react-redux";

//code của mình
import { getWallUserId } from "../../store/modules/Wall/selectors";
import useHttpRequest from "../useHttpRequest";

const initialState = {
  skip: 0,
  limit: 10,
  photos: [],
  isCurrentUser: false,
  canLoad: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_PHOTOS":
      
      const { photos, isCurrentUser } = action.payload;
      const { limit } = state;
      if (photos.length >= limit) {
        state.skip += limit;
      } else {
        state.canLoad = false;
      }

    

      state.photos = [ ...photos];
      state.isCurrentUser = isCurrentUser;
      return {
        ...state,
      };
    case "RESET":
      return initialState;
    default:
      return initialState;
  }
};

//active: có khởi động việc lấy hay không - thêm giá trị này để trường hợp là vào một group thì không bị lỗi
const useGetMiniPhotos = ({active = true}) => {
  const [state, localDispatch] = useReducer(reducer, initialState);

  

  const { fetchPhotosLoading, sendRequest: sendFetchPhotosRequest } =
    useHttpRequest();

  const wallUserId = useSelector(getWallUserId);

  const handleFetchPhotosSuccess = ({ resData }) => {
    localDispatch({ type: "FETCH_PHOTOS", payload: resData });
  };

  const handleFetchPhotosFailed = (message) => {
    console.log(message);
  };

  useEffect(() => {
    if(!active) return;
    sendFetchPhotosRequest({
      axiosConfig: {
        method: "GET",
        url: "/user/photos",
        params: {
          userId: wallUserId,
          skip: 0,
          limit: 6,
        },
      },
      successCallback: handleFetchPhotosSuccess,
      failedCallback: handleFetchPhotosFailed,
    });
    return () => {
        localDispatch({type:"RESET"})
    }
  }, []);

  //const { photos, skip, limit, canLoad, isCurrentUser } = state;
  const {photos} = state;
  return {photos};
};

export default useGetMiniPhotos;