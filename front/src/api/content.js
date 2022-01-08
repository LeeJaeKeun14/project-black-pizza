import axios from 'axios';

export const fetchContentSurveyList = async ({ queryKey, pageParam = 1 }) => {
  const data = { genres: queryKey[1].userGenres, years: queryKey[1].userYears, page: pageParam }
  try {
    const res = await axios
      .post("/api/contents/list", data)
    return {
      result: res.data.list,
      nextPage: pageParam + 1,
    };
  } catch (error) {
    console.log(error)
    return error
  }

};

export const fetchFavoriteList = async () => {
  try {
    const { data } = await axios.get("/api/contents/favorite");
    return data;
  } catch (error) {
    console.log(error)
  }
};


export const fetchContentDetail = async id => {
  try {
    const { data } = await axios.get(`/api/contents/detail/${id}`);
    return data;
  } catch (error) {
    console.log(error)
  }
};


export const fetchSearchItem = async (searchWord, searchType) => {
  try {
    const { data } = await axios
      .get(`/api/contents/search?q=${searchWord}&type=${searchType}`)
    return data;
  }
  catch (error) {
    console.log(error)
  }
};

