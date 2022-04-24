import styled from "styled-components";

const SearchBarContainer = styled.div``;

const SearchInput = styled.input`
  background: rgba(255, 255, 255, 0.4);
  input::after {
    content: "♥";
    z-index: 10;
  }
  color: white;
`;

const SearchBar = ({
  onInputChange,
}: {
  onInputChange: (term: string) => void;
}) => {
  const handleChangeEvent = (e: any) => {
    onInputChange(e.target.value);
  };

  return (
    <SearchBarContainer>
      <SearchInput onChange={handleChangeEvent} name="movieSearch" />
    </SearchBarContainer>
  );
};

export default SearchBar;
