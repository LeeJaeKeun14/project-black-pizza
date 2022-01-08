
import { fetchUserPick, postUserPick } from '../api/userPick';
import { USE_MUTATION, USE_QUERY } from '../reactQuery/reactQuery';

export const useUserPick = () => { return USE_QUERY("userPick", fetchUserPick) };

export const useUserPickPost = () => {
  return USE_MUTATION((input) => postUserPick(input))
};
