import { apiSlice } from "./apiSlice";
const USERS_URL = "/api/users";
const FOOD_URL = "/api/foods";
const ORDER_URL = "/api/orders";
const CART_URL = "/api/carts";
const FOOD_IMAGE = "/api/foods/uploads";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `${USERS_URL}/update/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/delete/${id}`,
        method: "DELETE",
      }),
    }),
    addFood: builder.mutation({
      query: (data) => ({
        url: `${FOOD_URL}/add`,
        method: "POST",
        body: data,
      }),
    }),
    getFood: builder.query({
      query: () => ({
        url: `${FOOD_URL}`,
        method: "GET",
      }),
    }),
    getImage: builder.mutation({
      query: () => ({
        url: `${FOOD_IMAGE}/image`,
        method: "GET",
      }),
    }),
    deleteFood: builder.mutation({
      query: (id) => ({
        url: `${FOOD_URL}/${id}`,
        method: "DELETE",
      }),
    }),
    updateFood: builder.mutation({
      query: ({ id, data }) => ({
        url: `${FOOD_URL}/update/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    getCategories: builder.query({
      query: () => ({
        url: `${FOOD_URL}/categories`,
        method: "GET",
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: `${USERS_URL}`,
        method: "GET",
      }),
    }),
    placeOrder: builder.mutation({
      query: (data) => ({
        url: `${ORDER_URL}/place`,
        method: "POST",
        body: data,
      }),
    }),
    getOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}/list`,
        method: "GET",
      }),
    }),
    getOrder: builder.query({
      query: (id) => ({
        url: `${ORDER_URL}/${id}`,
        method: "GET",
      }),
    }),
    getUserOrders: builder.query({
      query: (userId) => ({
        url: `${ORDER_URL}/user`,
        method: "POST",
        body: { userId },
      }),
    }),
    updateOrderStatus: builder.mutation({
      query: (data) => ({
        url: `${ORDER_URL}/update-status`,
        method: "POST",
        body: data,
      }),
    }),
    verifyOrder: builder.mutation({
      query: (data) => ({
        url: `${ORDER_URL}/verify`,
        method: "POST",
        body: data,
      }),
    }),
    addToCart: builder.mutation({
      query: (data) => ({
        url: `${CART_URL}/add`,
        method: "POST",
        body: data,
      }),
    }),
    getCart: builder.query({
      query: (userId) => ({
        url: `${CART_URL}/${userId}`,
        method: "GET",
      }),
    }),
    removeFromCart: builder.mutation({
      query: (data) => ({
        url: `${CART_URL}/remove`,
        method: "DELETE",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/forgot-password`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useUpdateUserProfileMutation, // Added the useUpdateUserProfileMutation export
  useDeleteUserMutation,
  useAddFoodMutation,
  useGetFoodQuery,
  useGetCategoriesQuery,
  useDeleteFoodMutation,
  useUpdateFoodMutation,
  useGetUsersQuery, // Added the getUsers query
  usePlaceOrderMutation,
  useGetOrderQuery,
  useGetOrdersQuery,
  useGetUserOrdersQuery,
  useUpdateOrderStatusMutation,
  useVerifyOrderMutation,
  useAddToCartMutation,
  useGetCartQuery,
  useRemoveFromCartMutation,
  useForgotPasswordMutation,
} = usersApiSlice;
