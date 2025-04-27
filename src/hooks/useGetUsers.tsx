/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useMemo } from "react";
import { fetchUserProfile, fetchUserRepos } from '../api/githubApi';
import useLocalStorage from "./useLocalStorage";

export interface User {
  username: string;
  avatar_url: string;
  public_repos: number;
  latest_commit: Date | null;
  primary_language: string | null;
  repos: any;
}

// lets use local storage for all the state so that it will resume from same point
const useGetUsers = (initialUsers: string[]) => {
  const [usernames, setUsernames] = useLocalStorage<string[]>('gh_usernames', initialUsers)
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalUsers, setTotalUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useLocalStorage<string>('gh_search', "");


  const getUserData = async (username: string) => {
    const profile = await fetchUserProfile(username);
    const repoData = await fetchUserRepos(username, profile.public_repos);

    return {
      username: profile.login,
      avatar_url: profile.avatar_url,
      public_repos: profile.public_repos,
      latest_commit: repoData.latestCommit,
      primary_language: repoData.primaryLanguage,
      repos: repoData.repos,
    };
  }

  const getAllUsers = async () => {
    setIsLoading(true);
    const results = await Promise.all(usernames.map(getUserData));
    setTotalUsers(results);
    setIsLoading(false);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const onSearch = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  };

  const addUser = (username: string) => {
    if (username) {
      const doesDataExist = usernames.find((u) => u.toLowerCase() === username);
      if(!doesDataExist){
        getUserData(username)
        .then((res) => {
            setUsernames((prev) => ([...prev, username]));
            setTotalUsers((prev) => ([...prev, res]));
          })
      }
    }
  };

  const removeUser = (username: string) => {
    setUsernames((prev) => (prev.filter((addedUser) => addedUser !== username)));
    setTotalUsers((prev) => (
      prev.filter((prevUser) => prevUser.username !== username)
    ));
  }

  const users = useMemo(() => (
    totalUsers.filter((u) => u.username.toLowerCase().includes(searchTerm.toLowerCase()))
  ), [totalUsers, searchTerm]);

  return {
    isLoading,
    users,
    searchTerm,
    onSearch,
    addUser,
    removeUser,
  };
};

export default useGetUsers;
