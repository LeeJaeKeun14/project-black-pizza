import { fetchFavoriteList, fetchContentDetail, fetchSearchItem } from '../api/content';
import { USE_QUERY } from '../reactQuery/reactQuery';

export const useFavoriteList = () => { return USE_QUERY('favoriteList', fetchFavoriteList) };

export const useContentDetail = (contentId) => {
  return USE_QUERY(
    ["contentDetail", contentId],
    () => fetchContentDetail(contentId),
    {
      enabled: !!contentId,
    }
  )
};

export const useSearchResult = (searchWord, searchType) => {
  return USE_QUERY(
    ["search", searchWord, searchType],
    () => fetchSearchItem(searchWord, searchType),
    {
      enabled: false,
    }
  )
};
