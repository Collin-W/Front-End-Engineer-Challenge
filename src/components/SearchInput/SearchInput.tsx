import { TextInput, Group, Select } from "@mantine/core";
import "./SearchInput.css";

interface SearchInputProps {
  searchText: string;
  onSearchTextChange: (text: string) => void;
  selectFilterValue: string;
  onSelectFilterChange: (filter: string) => void;
}

// SearchInput combines the TextInput and Select components for search functionality
function SearchInput({
  searchText,
  onSearchTextChange,
  selectFilterValue,
  onSelectFilterChange,
}: SearchInputProps) {

  return (
    <Group justify="center">
      <TextInput
        value={searchText}
        onChange={(event) => onSearchTextChange(event.currentTarget.value)}
        label="Search repos on GitHub"
        placeholder="e.g. freeCodeCamp"
        className="SearchInput__textInput"
      />
      
      <Select
        value={selectFilterValue}
        onChange={(value) => {
          if (value !== null) {
            onSelectFilterChange(value);
          }
        }}
        label="Filter by language"
        placeholder="Pick value"
        data={["JavaScript", "TypeScript", "C#"]}
        className="SearchInput__select"
      />
    </Group>
  );
}

export default SearchInput;
