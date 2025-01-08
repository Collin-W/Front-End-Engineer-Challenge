import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card, Text, Title, Stack } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faCodeFork,
  faExclamationTriangle,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";

// Secondary details page rendering a repository card based on the repoId passed in the URL
function RepoDetails() {
  const { repoId } = useParams<{ repoId: string }>();
  const navigate = useNavigate();
  const [repo, setRepo] = useState<any>(null);

  // Fetch the repository details from the GitHub API based on the repoId from grid row click
  useEffect(() => {
    async function fetchRepoDetails() {
      const response = await fetch(`https://api.github.com/repositories/${repoId}`);
      const data = await response.json();
      setRepo(data);
    }

    if (repoId) {
      fetchRepoDetails();
    }
  }, [repoId]);

  if (!repo) {
    return <Text>Loading repo details...</Text>;
  }

  return (
    <>
      <Button variant="outline" mb="sm" onClick={() => navigate("/")}>
        Back to Home
      </Button>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title order={2}>Details for {repo.name}</Title>
        <Text mt="sm">
          <Text component="span" fw={600}>
            Owner:
          </Text>{" "}
          <a href={repo.owner.html_url} target="_blank" rel="noreferrer">
            {repo.owner.login}
          </a>
        </Text>
        <Text size="sm" color="dimmed" mt="sm">
          {repo.description || "No description available."}
        </Text>

       <Stack>
        <Text mt="md">
          <FontAwesomeIcon icon={faStar} />{" "}
          <Text component="span" fw={600}>
            Stars:
          </Text>{" "}
          {repo.stargazers_count}
        </Text>

        <Text>
          <FontAwesomeIcon icon={faCodeFork} />{" "}
          <Text component="span" fw={600}>
            Forks:
          </Text>{" "}
          {repo.forks_count}
        </Text>

        <Text>
          <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
          <Text component="span" fw={600}>
            Open Issues:
          </Text>{" "}
          {repo.open_issues_count}
        </Text>

        {repo.license ? (
          <Text>
            <FontAwesomeIcon icon={faFileLines} />{" "}
            <Text component="span" fw={600}>
              License:
            </Text>{" "}
            {repo.license.name}
          </Text>
        ) : (
          <Text>
            <FontAwesomeIcon icon={faFileLines} />{" "}
            <Text component="span" fw={600}>
              License:
            </Text>{" "}
            No license information available.
          </Text>
        )}
          </Stack>
      </Card>
    </>
  );
}

export default RepoDetails;
