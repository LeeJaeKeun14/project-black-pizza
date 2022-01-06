import { useMutation } from 'react-query';
import { fetchUserPick, postUserPick } from '../api/userPick';
import { USEQUERY } from '../reactQuery/reactQuery';

export const useUserPick = () => { return USEQUERY("userPick", fetchUserPick) };

export const useUserPickPost = (contentId) => {

  return useMutation(contentId => postUserPick(contentId))
};
