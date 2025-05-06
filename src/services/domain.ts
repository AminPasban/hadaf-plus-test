import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// constants
import { BASE_URL } from "../constants";
// types
import { IDomain } from "../types";

export const domainApi = createApi({
    reducerPath: "domainApi",
    tagTypes: ["Domain"],
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        getDomains: builder.query<IDomain[], void>({
            query: () => "domain",
            providesTags: (result) =>
                result ? [...result.map(({ id }) => ({ type: "Domain" as const, id })), "Domain"] : ["Domain"],
        }),
        addDomain: builder.mutation<IDomain, Partial<IDomain>>({
            query: (data) => ({
                url: "domain",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Domain"],
        }),
        editDomain: builder.mutation<IDomain, { id: string; data: Partial<IDomain> }>({
            query: ({ id, data }) => ({
                url: `domain/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: (_, __, { id }) => [{ type: "Domain", id }],
        }),
        deleteDomain: builder.mutation<IDomain, string>({
            query: (id) => ({
                url: `domain/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (_, __, id) => [{ type: "Domain", id }, "Domain"],
        }),
    }),
});

export const { useGetDomainsQuery, useAddDomainMutation, useEditDomainMutation, useDeleteDomainMutation } = domainApi;
