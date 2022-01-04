import { useQuery } from 'react-query';

export const USEQUERY = (queryKey, method, config = {}) => useQuery(queryKey, method, config)
