import { atom, selector } from 'recoil';

export const contentList = atom({
  key: 'contentList',
  default: [],
})
export const ratingState = atom({
  key: 'ratingState',
  default: {},
});
export const zzimState = atom({
  key: 'zzimState',
  default: {}
})
export const ratingStateResult = selector({
  key: 'ratingStateResult',
  get: ({ get }) => {
    const rating = get(ratingState);
    // return Object.entries(rating).map(([key, value]) => [parseInt(key), value])
    return Object.values(rating)
    //   .map(e => {
    //   if (e.score === 0) {
    //     return { contents_id: e.contents_id, is_picked: e.is_picked }
    //   } else if (!e.is_picked) {
    //     return { contents_id: e.contents_id, score: e.score }
    //   } else {
    //     return e
    //   }
    // })
  }
})

