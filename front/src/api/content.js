import axios from 'axios';
import { useQuery } from 'react-query';

export const getContentList = async (page) => {
  const res = await axios.get(`/api/contents/list?page=${page}`)
    .then(res => {
      return res.data.list;
    })
    .catch(console.log);
  return res
}

const fetchfavoriteList = async () => {
  try {
    const { data } = await axios.get("/api/contents/favorite");
    return data;
  } catch (error) {
    console.log(error)
  }
};
export const useFavoriteList = () => { return useQuery("favoriteList", fetchfavoriteList) };

const fetchContentDetail = async id => {
  const { data } = await axios(`/api/contents/detail/${id}`);
  return data;
};
export const useContentDetail = (contentId) => {
  return useQuery(
    ["contentDetail", contentId],
    () => fetchContentDetail(contentId),
    {
      enabled: !!contentId,
      // keepPreviousData: true,
    }
  )
};


const fetchSearchItem = async (searchWord, searchType) => {
  const { data } = await axios
    .get(`/api/contents/search?q=${searchWord}&type=${searchType}`)
  return data;
};
export const useSearchResult = (searchWord, searchType) => {
  return useQuery(
    ["search", searchWord, searchType],
    () => fetchSearchItem(searchWord, searchType),
    {
      enabled: false,
    }
  )
};
