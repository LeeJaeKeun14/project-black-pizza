import axios from 'axios';

export const fetchSurveyResult = async (rating) => {
  try {
    const { data } = await axios.post("/api/contents/recommend",
      rating,
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
