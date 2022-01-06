import axios from 'axios';

export const fetchUserPick = async () => {
  try {
    const { data } = await axios.get("/api/contents/userpick")
    return data;
  } catch (error) {
    console.log(error)
  }
};
export const postUserPick = async (contentId) => {
  const postInput = [{ contents_id: contentId, is_picked: true }]

  try {
    const { data } = await axios.post("/api/contents/userpick", postInput)
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
}

