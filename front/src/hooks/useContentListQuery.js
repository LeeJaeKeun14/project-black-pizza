import axios from 'axios';
import { useInfiniteQuery } from 'react-query';

export const useContentListQuery = () => {

  const fetchProjects = async ({ pageParam = 1 }) => {
    try {
      const res = await axios
        .get(`/api/contents/list?page=${pageParam}`)
        .then(res => res.data.list)
      // .catch(console.log);
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
    getNextPageParam: (lastPage, pages) => {
      return lastPage.nextpage;
    }, onError: (error) => {
      console.log(error)
    }
  });
  return { data, error, isLoading, fetchNextPage, isFetching };
};
