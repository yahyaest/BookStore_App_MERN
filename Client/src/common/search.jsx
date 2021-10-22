import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

function Search(props) {
  const { handleSearch } = props;

  return (
    <div className="books__search">
      <InputGroup
        className="mb-3"
        size="sm"
      >
        <FormControl
          placeholder="Start search"
          aria-label="Start search"
          aria-describedby="basic-addon2"
          onChange={handleSearch}
        />
        <InputGroup.Append>
          <Button variant="info" style={{ margin: 0 }} className="search_btn">
            Search
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
}

export default Search;
