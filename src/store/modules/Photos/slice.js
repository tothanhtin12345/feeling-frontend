import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  skip: 0,
  limit: 10,
  photos: [],
  isCurrentUser: false,
  canLoad: true,
  isCurrentUser: false,
  //đã load lần đầu chưa ?
  isFirstLoad: false,
  fetchloading: false,
  deleteLoading: false,
};

const photosSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    fetchPhotosSaga: (state, action) => {
      state.fetchloading = true;
      action.payload = {
        ...action.payload,
        skip: state.skip,
        limit: state.limit,
      };
    },
    fetchPhotos: (state, action) => {
      const { photos, isCurrentUser } = action.payload;
      const { limit } = state;
      if (photos.length >= limit) {
        state.skip += limit;
      } else {
        state.canLoad = false;
      }
      state.photos = [...state.photos, ...photos];
      state.isCurrentUser = isCurrentUser;
      state.fetchloading = false;
    },
    deletePhotoSaga: (state, action) => {
      state.deleteLoading = true;
    },
    deletePhoto: (state, action) => {
      const fileId = action.payload;

      const fileIndex = state.photos.findIndex(
        (item) => item._id === fileId
      );

      if (fileIndex >= 0) {
        state.photos.splice(fileIndex, 1);

        if (state.skip > 0) {
          state.skip -= 1;
        }
      }

      state.deleteLoading = false;
    },
    setDeletePhotoLoading:(state, action) => {
      state.deleteLoading = action.payload;
    },
    setFetchPhotosLoading: (state, action) => {
      state.fetchloading = action.payload;
    },
    resetPhotos: (state) => {
      return initialState;
    },
  },
});

export const {
  fetchPhotos,
  fetchPhotosSaga,
  resetPhotos,
  setFetchPhotosLoading,
  setDeletePhotoLoading,
  deletePhoto,
  deletePhotoSaga,
} = photosSlice.actions;

export default photosSlice.reducer;
