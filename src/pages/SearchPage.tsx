import { useEffect, useState } from "react";
import { Stack, Text } from "@mantine/core";
import SearchInput from "../components/SearchInput";
import RepoTable, { Repo } from "../components/RepoTable";

// Main page
function SearchPage() {
  const [searchText, setSearchText] = useState("");
  const [selectFilter, setSelectFilter] = useState("JavaScript");
  const [repos, setRepos] = useState<Repo[]>([]);

  // Search function with query params
  async function search(searchText: string, selectFilter: string) {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${searchText}+language:${selectFilter}`
    );
    const data = await response.json();
    return data.items;
  }

  // Used to fetch the repositories from the GitHub API based on input change from SearchInput
  useEffect(() => {
    async function fetchRepos() {
      if (searchText) {
        const results = await search(searchText, selectFilter);

        // Mapping of the data from the GitHub API to the Repo type
        const mappedRepos: Repo[] = results.map((repo: any) => ({
          Id: repo.id,
          Name: repo.name,
          Url: repo.html_url,
          Description: repo.description,
          Stars: repo.stargazers_count,
          Forks: repo.forks_count,
          Issues: repo.open_issues_count,
        }));
        setRepos(mappedRepos);
      }
    }
    fetchRepos();
  }, [searchText, selectFilter]);

  return (
    <Stack>
      <Text>KorTerra Front End Coding Challenge</Text>

      <SearchInput
        searchText={searchText}
        selectFilterValue={selectFilter}
        onSearchTextChange={setSearchText}
        onSelectFilterChange={setSelectFilter}
      />

      {searchText && !repos ? (
        <Text>Loading repos...</Text>
      ) : (
        <RepoTable data={repos} />
      )}
    </Stack>
  );
}

export default SearchPage;
