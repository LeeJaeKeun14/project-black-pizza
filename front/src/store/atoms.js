import { atom, selector } from 'recoil';

export const contentList = atom({
  key: 'contentList',
  default: [],
})
export const ratingState = atom({
  key: 'ratingState',
  default: {},
});

export const ratingStateResult = selector({
  key: 'ratingStateResult',
  get: ({ get }) => {
    const rating = get(ratingState);
    return Object.entries(rating).map(([key, value]) => [parseInt(key), value])
  }
})

