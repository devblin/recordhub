import axios from "axios"
import { AxiosRequestConfig } from "axios"
import { getCookie } from "./auth"

const USER_PROFILE_URL = "http://localhost:3000/user/profile"
const CREATE_REPO_URL = "http://localhost:3000/repo/create"
const ALL_REPO_URL = "http://localhost:3000/repo/all"

const jwt = getCookie("jwt")

const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${jwt}`
  }
}

const getProfile = async () => await axios.get(USER_PROFILE_URL, config)

const createRepo = async (repoName: string, _private: boolean) =>
  await axios.put(CREATE_REPO_URL, { name: repoName, private: _private }, config)

const getAllRepos = async () => await axios.get(ALL_REPO_URL, config)

export { getProfile, createRepo, getAllRepos }