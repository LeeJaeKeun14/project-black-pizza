import { useRecoilValue } from 'recoil';
import { fetchContentSurveyList } from '../api/content';
import { USE_INFINITE_QUERY } from '../reactQuery/reactQuery';
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
  } = USE_INFINITE_QUERY(["contentList", params], fetchContentSurveyList,
    {
      getNextPageParam: (lastPage, pages) => lastPage.nextPage,
      enable: !!isLogin
    });
  return { data, error, isLoading, fetchNextPage, isFetching, hasNextPage };
};
