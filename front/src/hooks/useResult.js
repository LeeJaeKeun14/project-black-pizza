import { useRecoilValue, useSetRecoilState } from 'recoil';
import { fetchSurveyResult } from '../api/surveyResult';
import { USE_MUTATION, USE_QUERY } from '../reactQuery/reactQuery';
import { ratingStateResult, recommendResult } from '../store/atoms';

export const useResult = () => {
  const rating = useRecoilValue(ratingStateResult);
  return USE_QUERY(["surveyResult", rating], () => fetchSurveyResult(rating), {

  })
}

export const useResultPost = () => {
  const setRecommendResult = useSetRecoilState(recommendResult);
  return USE_MUTATION((input) => fetchSurveyResult(input), {
    onSuccess: (data) => {
      setRecommendResult(data)
    }
  })
};
