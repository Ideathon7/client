import axios from "axios";

export const http = axios.create({
  baseURL: "https://book-rental-d33e2-default-rtdb.firebaseio.com/",
});
