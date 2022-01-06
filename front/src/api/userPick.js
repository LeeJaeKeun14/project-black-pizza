import axios from 'axios';

export const fetchUserPick = async () => {
  try {
    const { data } = await axios.get("/api/contents/userpick")
    return data;
  } catch (error) {
    console.log(error)
  }
};
export const postUserPick = async (postInput) => {
  try {
    const { data } = await axios.post("/api/contents/userpick", postInput)
    return data
  } catch (error) {
    console.log(error)
  }
}

