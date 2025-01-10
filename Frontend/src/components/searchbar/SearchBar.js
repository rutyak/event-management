import React from "react";
import FormPopover from "../form/FormPopover";
import { SearchIcon } from "../../assets/Icons";
import styles from "./SearchBar.module.css";

const SearchBar = ({ btnTitle, fields, onSubmit }) => {

  return (
    <div className={styles.searchBarContainer}>
      <div className={styles.inputBtn}>
        <div className={styles.searchInput}>
          <SearchIcon />
          <input type="text" placeholder="Search" />
        </div>
        <div>
          <FormPopover
            btnTitle={btnTitle}
            fields={fields}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
