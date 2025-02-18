import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";

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
    user: builder.query<ApiResponse<User>, void>({
      query: () => `/user/:id`,
    }),
    login: builder.mutation<ApiResponse<{ accessToken: string; refreshToken: string }>, { email: string; password: string }>({
      query: (body) => ({ url: `/user/login`, method: "POST", body }),
    }),
    register: builder.mutation<ApiResponse<User>, Omit<User, "_id" | "active" | "role"> & { confirmPassword: string } & { groupsCreated?: string[]; groupsJoined?: string[] }>({
      query: (body) => ({ url: `/user/register`, method: "POST", body }),
    }),

    updateUser: builder.mutation<ApiResponse<User>, User>({
      query: (body) => ({ url: `/user/`, method: "PUT", body }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({ url: `/user/logout`, method: "POST" }),
    }),

    // Group API
    getAllGroups: builder.query<ApiResponse<IGroup[]>, void>({
      query: () => "/groups/",
    }),

    // Fetch groups created by the logged-in user (Admin)
    getUserCreatedGroups: builder.query<ApiResponse<IGroup[]>, void>({
      query: () => "/groups/admin/groups",
    }),

    // Join a group
    joinGroup: builder.mutation<ApiResponse<void>, { groupId: string }>({
      query: (body) => ({
        url: "/groups/join",
        method: "POST",
        body,
      }),
    }),

    // Get user's invitations
    getUserInvitations: builder.query<ApiResponse<Invitation[]>, void>({
      query: () => "/groups/invitations",
    }),

    // Respond to an invitation
    respondInvitation: builder.mutation<ApiResponse<void>, { groupId: string; action: "accept" | "reject" }>({
      query: (body) => ({
        url: "/groups/invitations/respond",
        method: "POST",
        body,
      }),
    }),

    // Create a group (Updated route)
    createGroup: builder.mutation<ApiResponse<IGroup>, { name: string; isPublic?: boolean }>({
      query: (body) => ({
        url: "/groups/create",
        method: "POST",
        body,
      }),
    }),

    // Invite a user to a group
    inviteUser: builder.mutation<ApiResponse<void>, { groupId: string; userId: string }>({
      query: (body) => ({
        url: "/groups/invite",
        method: "POST",
        body,
      }),
    }),

    // Approve a user's request to join
    approveRequest: builder.mutation<ApiResponse<void>, { groupId: string; userId: string }>({
      query: (body) => ({
        url: "/groups/approve",
        method: "POST",
        body,
      }),
    }),

    // Reject a user's request to join
    rejectRequest: builder.mutation<ApiResponse<void>, { groupId: string; userId: string }>({
      query: (body) => ({
        url: "/groups/reject",
        method: "POST",
        body,
      }),
    }),

    // Fetch group details by ID
    getGroupById: builder.query<ApiResponse<IGroup>, { groupId: string }>({
      query: ({ groupId }) => `/groups/${groupId}`,
    }),

    // Update a group (newly added)
    updateGroup: builder.mutation<ApiResponse<IGroup>, { groupId: string; data: Partial<IGroup> }>({
      query: ({ groupId, data }) => ({
        url: `/groups/${groupId}`,
        method: "PUT",
        body: data,
      }),
    }),

    // Delete a group (newly added)
    deleteGroup: builder.mutation<ApiResponse<void>, { groupId: string }>({
      query: ({ groupId }) => ({
        url: `/groups/${groupId}`,
        method: "DELETE",
      }),
    }),

    // Message API
    sendMessage: builder.mutation<ApiResponse<void>, { content: string; groupId?: string; userId?: string }>({
      query: (body) => ({ url: `/message/`, method: "POST", body }),
    }),
    getMessagesForUser: builder.query<ApiResponse<IMessage[]>, { userId: string }>({
      query: ({ userId }) => `/message/user/${userId}`,
    }),
    getMessagesForGroup: builder.query<ApiResponse<IMessage[]>, { groupId: string }>({
      query: ({ groupId }) => `/message/group/${groupId}`,
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
  useSendMessageMutation,
  useGetMessagesForUserQuery,
  useGetMessagesForGroupQuery,
} = api;
