export const homeRoute = "/";

export const signUpRoute = "/sign-up"; // Tab

export const signInRoute = "/sign-in"; // After Auth.js

export const requestEmailRoute = "/request-email";

export const viewUserRoute = (id: string) => `/users/view/${id}`;

export const editUserRoute = (id: string) => `/users/edit/${id}`;

export const userBooksRoute = (id: string) =>
  `/users/${id}/books/page/1?sort=title&order=Asc&genre=All`;

export const saveBookRoute = "/books/save";

export const booksServerWindowRoute =
  "/books/server/window/page/1?sort=title&order=Asc&genre=All";

export const booksServerContainerRoute =
  "/books/server/container/page/1?sort=title&order=Asc&genre=All";

export const booksClientWindowRoute =
  "/books/client/window/page/1?sort=title&order=Asc&genre=All";

export const booksClientContainerRoute =
  "/books/client/container/page/1?sort=title&order=Asc&genre=All";

export const startsWithBooksServer = "/books/server";

export const startsWithBooksClient = "/books/client";

export const viewBookRoute = (id: string) => `/books/view/${id}`;

export const editBookRoute = (id: string) => `/books/edit/${id}`;

export const bookCommentsRoute = (id: string) => `/books/${id}/comments/page/1`;

export const cloudinarySignatureApiRoute = "/api/signature";

export const deleteAvatarApiRoute = "/api/delete-avatar";
