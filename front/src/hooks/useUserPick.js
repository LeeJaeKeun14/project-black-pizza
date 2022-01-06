import { useMutation } from 'react-query';
import { fetchUserPick, postUserPick } from '../api/userPick';
import { USE_QUERY } from '../reactQuery/reactQuery';

export const useUserPick = () => { return USE_QUERY("userPick", fetchUserPick) };

export const useUserPickPost = () => {
  return useMutation((input) => postUserPick(input))
};
