import { useInfiniteQuery, useQuery } from 'react-query';

export const USEQUERY = (queryKey, method, config = {}) => useQuery(queryKey, method, config)

export const USERINFINITEQUERY = (queryKey, method, config = {}) => useInfiniteQuery(queryKey, method, config)
