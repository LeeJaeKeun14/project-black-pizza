import { atom, selector } from 'recoil';

export const contentList = atom({
  key: 'contentList',
  default: [],
})

export const userSelectedGenres = atom({
  key: 'userSelectedGenres',
  default: []
})

export const userSelectedYears = atom({
  key: 'userSelectedYears',
  default: []
})

export const ratingState = atom({
  key: 'ratingState',
  default: {},
});

export const ratingStateResult = selector({
  key: 'ratingStateResult',
  get: ({ get }) => {
    const rating = get(ratingState);
    return Object.values(rating).filter(e => e.score !== 0 || e.is_picked)
  }
})

export const loginState = atom({
  key: 'loginState',
  default: null
})
