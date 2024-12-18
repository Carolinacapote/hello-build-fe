import React, { useEffect, useState } from "react";
import { getUserRepositories, getAccessToken } from "../services/githubService.ts";
import { logout } from "../services/authService.ts";
import { Navbar } from "../components/Navbar.tsx";
import { Repository } from "../interfaces/repository.interface.ts";

export const Profile: React.FC = () => {
  const [repos, setRepos] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchRepos();
  }, []);

  /**
   * Get user github repositories
   */
  const fetchRepos = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (code) {
        await getAccessToken(code);
        const userRepos = await getUserRepositories();
        setRepos(userRepos);
      } else {
        throw new Error("Code param not found.");
      }
    } catch (error) {
      console.error("Error getting profile information: ", error);
      logout();
    }
  };

  /**
   * Set or delete favorite repo from the favorites set
   * @param id Repository id
   */
  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(search.toLowerCase())
  );

  const [favoriteRepos, nonFavoriteRepos] = filteredRepos.reduce(
    (acc, repo) => {
      acc[favorites.has(repo.id) ? 0 : 1].push(repo);
      return acc;
    },
    [[], []] as [Array<any>, Array<any>]
  );
  const sortedFavoriteRepos = favoriteRepos.sort((a, b) => a.name.localeCompare(b.name));
  const sortedNonFavoriteRepos = nonFavoriteRepos.sort((a, b) => a.name.localeCompare(b.name));
  const organizedInfo = sortedFavoriteRepos.concat(sortedNonFavoriteRepos);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="flex space-between align-center">
          <h2>My Profile</h2>
          <input
            className="w-auto"
            placeholder="Search Repositories"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th className="center">Language</th>
              <th className="center">URL</th>
              <th className="center">Visibility</th>
              <th className="center">Favorite</th>
            </tr>
          </thead>
          <tbody>
            {organizedInfo.map((repo: Repository) => (
              <tr key={repo.id}>
                <td>{repo.name}</td>
                <td className="center">{repo.language}</td>
                <td className="center">
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                    Open in GitHub
                  </a>
                </td>
                <td className="center">{repo.visibility}</td>
                <td className="center">
                  <button onClick={() => toggleFavorite(repo.id)}>
                    {favorites.has(repo.id) ? "★" : "☆"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
