import { useEffect, useState } from "react";
import { Stack, Text, Group, Button } from "@mantine/core";
import SearchInput from "../components/SearchInput";
import RepoTable, { Repo } from "../components/RepoTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

function SearchPage() {
  const [searchText, setSearchText] = useState("");
  const [selectFilter, setSelectFilter] = useState("JavaScript");
  const [repos, setRepos] = useState<Repo[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  async function search(
    searchText: string,
    selectFilter: string,
    page: number
  ) {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${searchText}+language:${selectFilter}&sort=stars&order=desc&per_page=3&page=${page}`
    );
    const data = await response.json();
    return data.items;
  }

  useEffect(() => {
    async function fetchRepos() {
      if (searchText && page > 0) {
        setLoading(true);
        try {
          const results = await search(searchText, selectFilter, page);
          const mappedRepos: Repo[] = results.map((repo: any) => ({
            Id: repo.id,
            Name: repo.name,
            Url: repo.html_url,
            Description: repo.description,
          }));
          setRepos(mappedRepos);
        } finally {
          setLoading(false);
        }
      } else {
        // If search clears
        setRepos([]);
      }
    }
    fetchRepos();
  }, [searchText, selectFilter, page]);

  return (
    <Stack>
      <Text fw={700}>KorTerra Front End Coding Challenge</Text>

      <SearchInput
        searchText={searchText}
        selectFilterValue={selectFilter}
        onSearchTextChange={setSearchText}
        onSelectFilterChange={setSelectFilter}
      />

      {!searchText && <Text>Please enter a search term above.</Text>}

      {searchText && loading && <Text>Loading repos...</Text>}

      {searchText && !loading && repos.length > 0 && (
        <>
          <RepoTable data={repos} />

          <Group mt="md">
            <Button
              variant="outline"
              disabled={page <= 1}
              onClick={() => setPage((prev) => prev - 1)}
              leftSection={<FontAwesomeIcon icon={faArrowLeft} />}
            >
              Previous Page
            </Button>

            <Button
              variant="outline"
              onClick={() => setPage((prev) => prev + 1)}
              rightSection={<FontAwesomeIcon icon={faArrowRight} />}
            >
              Next Page
            </Button>
          </Group>
        </>
      )}

      {searchText && !loading && repos.length === 0 && (
        <Text>No results found.</Text>
      )}
    </Stack>
  );
}

export default SearchPage;
