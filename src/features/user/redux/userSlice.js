import { querySlice, querySelector } from '../../../utils/redux/toolkit';

export const userSlice = querySlice('user')
export const { request, success, failure } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectUserById = querySelector('user')

export default userSlice.reducer;
