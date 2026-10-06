// Central registry of API endpoint paths, relative to API_BASE_URL (which already includes "/api/").
export const API_ENDPOINTS = {
  signup: {
    CREATE: "createAccount",
    GET_BY_EMAIL: "getUserDetailByEmail",
    UPDATE: "updateAccount",
    DELETE: "deleteAccount",
  },
  login: {
    VERIFY: "verifyLogin",
  },
  product: {
    LIST: "productsList",
    byId: (productId: string): string => `products/${productId}`,
    SEARCH: "searchProduct",
  },
  brand: {
    LIST: "brandsList",
  },
} as const;
