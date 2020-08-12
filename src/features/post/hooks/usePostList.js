import { useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { request, success, failure, makeSelectPostByUserId } from '../redux/postSlice'

export const usePostList = (userId) => {
  const selectPostByUserId = useMemo(makeSelectPostByUserId, [])
  // Reducer
  const post = useSelector(selectPostByUserId)
  const dispatch = useDispatch()
  const postExpensive = useCallback(post, [post]);
  const refetch = useCallback((key) => {
    dispatch(request({ key }));
    return axios(`https://jsonplaceholder.typicode.com/posts?userId=${key}`)
      .then(({ data }) => dispatch(success({ data, key })))
      .catch(error => dispatch(failure({ error, key })))
  }, [dispatch]);
  useEffect(() => {
    if(userId) {
      // ComponentDidUpdate
      refetch(userId);
    }
  }, [userId, refetch]); // shouldComponentUpdate
  return { post: postExpensive, refetch };
}