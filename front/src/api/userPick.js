import axios from 'axios';
import { useQuery } from 'react-query';

const fetchUserPick = async () => {
  try {
    const { data } = await axios.get("/api/contents/userpick")
    return data;
  } catch (error) {
    console.log(error)
  }
};

export const useUserPick = () => { return useQuery("userPick", fetchUserPick) };
