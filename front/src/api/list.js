import axios from 'axios';

export const getContentList = async (page) => {
  const res = await axios.get(`/api/contents/list?page=${page}`)
    .then(res => {
      return res.data.list;
    })
    .catch(console.log);
  return res
}
