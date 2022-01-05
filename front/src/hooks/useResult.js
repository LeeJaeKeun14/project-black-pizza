import { useRecoilValue } from 'recoil';
import { featchSurveyResult } from '../api/surveyResult';
import { USEQUERY } from '../reactQuery/reactQuery';
import { ratingStateResult } from '../store/atoms';

export const useResult = () => {
  const rating = useRecoilValue(ratingStateResult);
  return USEQUERY(["surveyResult", rating], () => featchSurveyResult(rating))
}
