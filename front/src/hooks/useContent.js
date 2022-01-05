import { fetchfavoriteList, fetchContentDetail, fetchSearchItem } from '../api/content';
import { USEQUERY } from '../reactQuery/reactQuery';

export const useFavoriteList = () => { return USEQUERY('favoriteList', fetchfavoriteList) };

export const useContentDetail = (contentId) => {
  return USEQUERY(
    ["contentDetail", contentId],
    () => fetchContentDetail(contentId),
    {
      enabled: !!contentId,
    }
  )
};

export const useSearchResult = (searchWord, searchType) => {
  return USEQUERY(
    ["search", searchWord, searchType],
    () => fetchSearchItem(searchWord, searchType),
    {
      enabled: false,
    }
  )
};
