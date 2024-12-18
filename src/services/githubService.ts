import axios from "axios";
import { Repository } from "../interfaces/repository.interface";

const API_BASE_URL = process.env.BASE_URL || 'http://localhost:4000';
const ACCESS_TOKEN = "";

/**
 * Get and store the github access token
 * @param code code returned after github Oauth (single use code)
 */
export const getAccessToken = async (code: string): Promise<void> => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  if (accessToken) return;

  const response = await axios.get(`${API_BASE_URL}/getAccessToken?code=${code}`);
  const { access_token } = response.data;

  if (access_token) {
    localStorage.setItem(ACCESS_TOKEN, access_token);
  } else {
    throw new Error("Error al obtener access token.");
  }
};

/**
 * Get the user repositories information
 * @returns A list of repositories
 */
export const getUserRepositories = async (): Promise<Repository[]> => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const response = await axios.get("https://api.github.com/user/repos", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};
