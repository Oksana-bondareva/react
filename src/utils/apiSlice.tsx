import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ResultItem } from './interfaces';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    getPersonById: builder.query<ResultItem, string>({
      query: (id) => `people/${id}`,
    }),
    getPeople: builder.query<{ results: ResultItem[] }, { search: string, page: number }>({
      query: ({ search, page }) => `people/?search=${search}&page=${page}`,
    }),
  }),
});

export const { useGetPersonByIdQuery, useGetPeopleQuery } = apiSlice;
