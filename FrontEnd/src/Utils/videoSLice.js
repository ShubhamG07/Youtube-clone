import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    videos: [],
};

const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        setVideos: (state, action) => {
            state.videos = action.payload;
        },
        updateVideo: (state, action) => {
            const index = state.videos.findIndex((v) => v._id === action.payload._id);
            if (index !== -1) {
                state.videos[index] = action.payload;
            }
        },
        deleteVideo: (state, action) => {
            state.videos = state.videos.filter((v) => v._id !== action.payload);
        },
    },
});

export const { setVideos, updateVideo, deleteVideo } = videoSlice.actions;
export default videoSlice.reducer;
