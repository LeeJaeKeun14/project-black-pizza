import axios from 'axios';

export const featchSurveyResult = async (rating) => {
  try {
    const { data } = await axios.post("/api/contents/recommend", {
      data: rating,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
