import axios from 'axios';

export const fetchContentSurveyList = async ({ pageParam = 1, userGenres, userYears }) => {
  const data = { genres: userGenres, years: userYears, page: pageParam }
  console.log(pageParam)
  try {
    const res = await axios
      .post("/api/contents/list", data)
      .then(res => res.data.list)
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

export const fetchfavoriteList = async () => {
  try {
    const { data } = await axios.get("/api/contents/favorite");
    return data;
  } catch (error) {
    console.log(error)
  }
};
// export const useFavoriteList = () => { return useQuery("favoriteList", fetchfavoriteList) };

export const fetchContentDetail = async id => {
  const { data } = await axios(`/api/contents/detail/${id}`);
  return data;
};
// export const useContentDetail = (contentId) => {
//   return useQuery(
//     ["contentDetail", contentId],
//     () => fetchContentDetail(contentId),
//     {
//       enabled: !!contentId,
//       // keepPreviousData: true,
//     }
//   )
// };


export const fetchSearchItem = async (searchWord, searchType) => {
  const { data } = await axios
    .get(`/api/contents/search?q=${searchWord}&type=${searchType}`)
  return data;
};
// export const useSearchResult = (searchWord, searchType) => {
//   return useQuery(
//     ["search", searchWord, searchType],
//     () => fetchSearchItem(searchWord, searchType),
//     {
//       enabled: false,
//     }
//   )
// };
