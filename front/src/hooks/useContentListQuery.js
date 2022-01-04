import axios from 'axios';
import { useEffect } from 'react';
// import { useInfiniteQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { fetchContentSurveyList } from '../api/content';
import { USERINFINITEQUERY } from '../reactQuery/reactQuery';
import { loginState, userSelectedYears, userSelectedGenres } from '../store/atoms';

export const useContentListQuery = () => {

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
  } = USERINFINITEQUERY(["contentList", params], () => fetchContentSurveyList(params),
    {
      getNextPageParam: (lastPage, pages) => lastPage.nextpage
    });
  return { data, error, isLoading, fetchNextPage, isFetching, hasNextPage };
};
