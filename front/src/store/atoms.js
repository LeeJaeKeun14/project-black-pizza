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
    return Object.values(rating)
  }
})

export const loginState = atom({
  key: 'loginState',
  default: null
})
