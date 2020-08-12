import { querySlice, querySelector } from '../../../utils/redux/toolkit';

export const postSlice = querySlice('post')
export const { request, success, failure } = postSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectPostByUserId = querySelector('post')

export default postSlice.reducer;
