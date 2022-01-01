import axios from 'axios';
import { useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { loginState, userSelectedYears, userSelectedGenres } from '../store/atoms';

export const useContentListQuery = () => {
  const isLogin = useRecoilValue(loginState);
  const userGenres = useRecoilValue(userSelectedGenres);
  const userYears = useRecoilValue(userSelectedYears);

  const fetchProjects = async ({ pageParam = 1 }) => {
    const data = { genres: userGenres, years: userYears, page: pageParam }
    console.log(pageParam)
    try {
      const res = await axios
        .post("/api/contents/list", data)
        .then(res => res.data.list)
      // .catch(console.log);
      console.log(res)
      return {
        result: res,
        nextpage: pageParam + 1,
      };
    } catch (error) {
      console.log(error)
      return error
    }

  };
  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery("contentList", fetchProjects, {
    getNextPageParam: (lastPage, pages) => lastPage.nextpage
    , onError: (error) => {
      console.log(error)
    },
  });
  return { data, error, isLoading, fetchNextPage, isFetching, hasNextPage };
};
