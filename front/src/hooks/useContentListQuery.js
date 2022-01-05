import axios from 'axios';
import { useEffect } from 'react';
// import { useInfiniteQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { fetchContentSurveyList } from '../api/content';
import { USERINFINITEQUERY } from '../reactQuery/reactQuery';
import { loginState, userSelectedYears, userSelectedGenres } from '../store/atoms';

export const useContentListQuery = () => {
  const isLogin = useRecoilValue(loginState)
  const userGenres = useRecoilValue(userSelectedGenres);
  const userYears = useRecoilValue(userSelectedYears);

  const params = { userGenres, userYears }
  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = USERINFINITEQUERY(["contentList", params], fetchContentSurveyList,
    {
      getNextPageParam: (lastPage, pages) => lastPage.nextpage,
      enable: !!isLogin
    });
  return { data, error, isLoading, fetchNextPage, isFetching, hasNextPage };
};
