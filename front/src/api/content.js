import axios from 'axios';

export const fetchContentSurveyList = async ({ queryKey, pageParam = 1 }) => {
  const data = { genres: queryKey[1].userGenres, years: queryKey[1].userYears, page: pageParam }
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


export const fetchContentDetail = async id => {
  const { data } = await axios.get(`/api/contents/detail/${id}`);
  return data;
};


export const fetchSearchItem = async (searchWord, searchType) => {
  const { data } = await axios
    .get(`/api/contents/search?q=${searchWord}&type=${searchType}`)
  return data;
};

