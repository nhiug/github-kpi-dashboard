import axios from "axios";

const BASE_URL = "https://api.github.com";
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const api = axios.create({
  baseURL: BASE_URL,
  headers: TOKEN ? { Authorization: `token ${TOKEN}` } : {},
});

export const fetchUserProfile = async (username: string) => {
  const res = await api.get(`${BASE_URL}/users/${username}`);
  return res.data;
};

export const fetchUserRepos = async (username: string, repoCount: number) => {
  let noOfRequestToBeMade = Math.ceil(repoCount / 100);
  let pageNumber = 0;
  const repos = [];
  while (noOfRequestToBeMade > 0) {
    const res = await api.get(`https://api.github.com/users/${username}/repos?per_page=100&page=${pageNumber}`);
    repos.push(...res.data);
    noOfRequestToBeMade--;
    pageNumber++;
  }

  let latestCommit = null;
  const languageCount: Record<string, number> = {};

  for (const repo of repos) {
    if (repo.language) {
      languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
    }
    const commitDate = new Date(repo.pushed_at);
    if (!latestCommit || commitDate > latestCommit) {
      latestCommit = commitDate;
    }
  }

  const entries = Object.entries(languageCount);
  entries.sort((a, b) => {
    return b[1] - a[1];
  });
  const topEntry = entries[0];
  let primaryLanguage = null;
  if (topEntry) {
    primaryLanguage = topEntry[0];
  }

  return {
    latestCommit,
    primaryLanguage,
    repos,
  };
};

// export const fetchRepoCommits = async (username: string, repo: string) => {
//   const res = await api.get(`${BASE_URL}/repos/${username}/${repo}/commits`);
//   return res.data;
// };
