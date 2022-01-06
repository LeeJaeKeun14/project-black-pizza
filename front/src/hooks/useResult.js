import { useRecoilValue } from 'recoil';
import { featchSurveyResult } from '../api/surveyResult';
import { USE_QUERY } from '../reactQuery/reactQuery';
import { ratingStateResult } from '../store/atoms';

export const useResult = () => {
  const rating = useRecoilValue(ratingStateResult);
  return USE_QUERY(["surveyResult", rating], () => featchSurveyResult(rating))
}
