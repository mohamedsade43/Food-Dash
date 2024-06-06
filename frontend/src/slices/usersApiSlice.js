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
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
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
      endpoint: (builder) => ({
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
    placeOrder: builder.mutation({
      query: (data) => ({
        url: `${ORDER_URL}/place`,
        method: "POST",
        body: data,
      }),
    }),
    getOrder: builder.query({
      query: (id) => ({
        url: `${ORDER_URL}/${id}`,
        method: "GET",
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
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useAddFoodMutation,
  useGetFoodQuery,
  useDeleteFoodMutation,
  usePlaceOrderMutation,
  useGetOrderQuery,
  useAddToCartMutation,
  useGetCartQuery,
  useRemoveFromCartMutation,
  useForgotUserMutation,
} = usersApiSlice;
