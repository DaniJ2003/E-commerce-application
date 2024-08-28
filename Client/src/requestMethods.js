import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NmQ0NjA1Y2NkMzRkNTI0MmE4OTVjYyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcyMzYzNjI2NywiZXhwIjoxNzIzODk1NDY3fQ.1Lg_PGFJ956dxtG5y27tqNCOYvj_ALCYkiD0hgiVDg8";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
