import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import postReducer from '../features/post/redux/postSlice'
import userReducer from '../features/user/redux/userSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    post: postReducer,
    user: userReducer,
  },
});
