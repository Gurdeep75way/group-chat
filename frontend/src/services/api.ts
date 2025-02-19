import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";
import { User, Invitation, ApiResponse, IMessage, IGroup } from "../types";

const baseUrl = import.meta.env.VITE_API_URL;

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // User API
    getAllUsers: builder.query<ApiResponse<User[]>, void>({
      query: () => "/user/",
    }),
    me: builder.query<ApiResponse<User>, void>({
      query: () => `/user/me`,
    }),
    user: builder.query<ApiResponse<User>, { id: string }>({
      query: ({ id }) => `/user/${id}`,
    }),
    login: builder.mutation<
      ApiResponse<{ accessToken: string; refreshToken: string }>,
      { email: string; password: string }
    >({
      query: (body) => ({ url: `/user/login`, method: "POST", body }),
    }),
    register: builder.mutation<
      ApiResponse<User>,
      Omit<User, "_id" | "active" | "role"> & { confirmPassword: string }
    >({
      query: (body) => ({ url: `/user/register`, method: "POST", body }),
    }),

    updateUser: builder.mutation<ApiResponse<User>, Partial<User>>({
      query: (body) => ({ url: `/user/`, method: "PUT", body }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({ url: `/user/logout`, method: "POST" }),
    }),

    // Group API
    getAllGroups: builder.query<ApiResponse<IGroup[]>, void>({
      query: () => "/groups/",
    }),

    getUserCreatedGroups: builder.query<{ groups: IGroup[] }, void>({
      query: () => "/groups/my-groups",
    }),


    joinGroup: builder.mutation<ApiResponse<void>, { groupId: string }>({
      query: (body) => ({
        url: "/groups/join",
        method: "POST",
        body,
      }),
    }),

    getUserInvitations: builder.query<ApiResponse<Invitation[]>, void>({
      query: () => "/groups/invitations",
    }),

    respondInvitation: builder.mutation<
      ApiResponse<void>,
      { groupId: string; action: "accept" | "reject" }
    >({
      query: (body) => ({
        url: "/groups/respond-to-invitations",
        method: "POST",
        body,
      }),
    }),

    createGroup: builder.mutation<
      ApiResponse<IGroup>,
      { name: string; isPublic?: boolean }
    >({
      query: (body) => ({
        url: "/groups/create",
        method: "POST",
        body,
      }),
    }),

    inviteUser: builder.mutation<
      ApiResponse<void>,
      { groupId: string; userId: string }
    >({
      query: (body) => ({
        url: "/groups/invite",
        method: "POST",
        body,
      }),
    }),

    approveRequest: builder.mutation<
      ApiResponse<void>,
      { groupId: string; userId: string }
    >({
      query: (body) => ({
        url: "/groups/approve",
        method: "POST",
        body,
      }),
    }),

    rejectRequest: builder.mutation<
      ApiResponse<void>,
      { groupId: string; userId: string }
    >({
      query: (body) => ({
        url: "/groups/reject",
        method: "POST",
        body,
      }),
    }),

    getGroupById: builder.query<ApiResponse<IGroup>, { _id: string }>({
      query: ({ _id }) => `/groups/${_id}`,
    }),

    updateGroup: builder.mutation<
      ApiResponse<IGroup>,
      { groupId: string; data: Partial<IGroup> }
    >({
      query: ({ groupId, data }) => ({
        url: `/groups/${groupId}`,
        method: "PUT",
        body: data,
      }),
    }),

    deleteGroup: builder.mutation<ApiResponse<void>, { groupId: string }>({
      query: ({ groupId }) => ({
        url: `/groups/${groupId}`,
        method: "DELETE",
      }),
    }),

    // Message API
    sendMessage: builder.mutation<
      ApiResponse<void>,
      { content: string; group?: string; recipient?: string; sender?: string; }
    >({
      query: (body) => ({ url: `/message/`, method: "POST", body }),
    }),
    getMessagesForUser: builder.query<ApiResponse<IMessage[]>, { recipient: string }>({
      query: ({ recipient }) => `/message/user/${recipient}`,
    }),
    getMessagesForGroup: builder.query<ApiResponse<IMessage[]>, { group: string }>({
      query: ({ group }) => `/message/group/${group}`,
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useMeQuery,
  useUserQuery,
  useLoginMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useLogoutMutation,


  useGetAllGroupsQuery,
  useGetUserCreatedGroupsQuery,
  useJoinGroupMutation,
  useGetUserInvitationsQuery,
  useRespondInvitationMutation,
  useCreateGroupMutation,
  useInviteUserMutation,
  useApproveRequestMutation,
  useRejectRequestMutation,
  useGetGroupByIdQuery,
  useUpdateGroupMutation,
  useDeleteGroupMutation,
  useSendMessageMutation,
  useGetMessagesForUserQuery,
  useGetMessagesForGroupQuery,
} = api;
