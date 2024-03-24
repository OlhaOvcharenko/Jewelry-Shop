export const API_URL =
  process.env.NODE_ENV === "production" ? "/api" : "http://localhost:8000/api";

  export const IMAGES_URL = (process.env.NODE_ENV === 'production') ? 'public/uploads' : 'http://localhost:8000/public/uploads';