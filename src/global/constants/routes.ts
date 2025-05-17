export const homeRoute = "/";
export const signUpRoute = "/sign-up"; // Tab
export const signInRoute = "/sign-in"; // After Auth.js
export const viewUserRoute = (id: string) => `/users/view/${id}`;
export const editUserRoute = (id: string) => `/users/edit/${id}`;

export const userBooksRoute = (id: string) =>
  `/users/${id}/books/page/1?sort=title&order=Asc&genre=All`;

export const saveBookRoute = "/books/save";
export const booksRoute = "/books/page/1?sort=title&order=Asc&genre=All";
export const booksStartsWith = "/books/page";
export const viewBookRoute = (id: string) => `/books/view/${id}`;
export const editBookRoute = (id: string) => `/books/edit/${id}`;
export const bookCommentsRoute = (id: string) => `/books/${id}/comments/page/1`;
export const subscribeRoute = "/subscribe";
export const purchaseRoute = "/purchase";

// export const verifyEmailRoute = "/verify-email"; // Not yet implemented
// export const resetPasswordRoute = "/reset-password"; // Not yet implemented
// export const forgotPasswordRoute = "/forgot-password"; // Not yet implemented
