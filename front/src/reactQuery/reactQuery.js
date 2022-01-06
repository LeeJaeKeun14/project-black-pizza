import { useInfiniteQuery, useQuery } from 'react-query';

export const USE_QUERY = (queryKey, method, config = {}) => useQuery(queryKey, method, config)

export const USE_INFINITE_QUERY = (queryKey, method, config = {}) => useInfiniteQuery(queryKey, method, config)
