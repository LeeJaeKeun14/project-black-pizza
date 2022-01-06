import { fetchUserPick } from '../api/userPick';
import { USEQUERY } from '../reactQuery/reactQuery';

export const useUserPick = () => { return USEQUERY("userPick", fetchUserPick) };
