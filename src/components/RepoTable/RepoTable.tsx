import {
  DataSource,
  InfiniteTable,
  InfiniteTablePropColumns,
} from "@infinite-table/infinite-react";
import { Button, Box } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import "./RepoTable.css";

// Repo type
export type Repo = {
  Id: number;
  Name: string;
  Description: string;
  Url: string;
};

// Columns for the InfiniteTable
const columns: InfiniteTablePropColumns<Repo> = {
  repoName: {
    field: "Name",
    header: "Repo",
    minWidth: 275,
  },
  description: {
    field: "Description",
    header: "Description",
    minWidth: 275,
  },
  details: {
    header: "Details",
    render: () => null,
    minWidth: 275,
  },
};

interface RepoTableProps {
  data: Repo[];
}

function RepoTable({ data }: RepoTableProps) {

  // Use for See Details button functionality
  const navigate = useNavigate();

  // Mapping columns to include custom elements in the table
  const mappedColumns: InfiniteTablePropColumns<Repo> = {
    ...columns,
    repoName: {
      header: "Repo",
      render: ({ data: rowData }) => (
        <a href={rowData?.Url} target="_blank" className="RepoTable__link">
          {rowData?.Name}
        </a>
      ),
      minWidth: 275,
    },
    details: {
      ...columns.details,
      render: ({ data: rowData }) => {
        return (
          <Button
            variant="outline"
            onClick={() =>
              navigate(`/repo-details/${rowData?.Id}`, {
                state: { repo: rowData },
              })
            }
          >
            See Details
          </Button>
        );
      },
    },
  };

  return (
    <Box className="infinite-theme-mode--light">
      <DataSource<Repo> data={data} primaryKey="Id">
        <InfiniteTable<Repo> columns={mappedColumns} />
      </DataSource>
    </Box>
  );
}

export default RepoTable;
