import React from "react";

export const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <input
      value={filter || ""}
      placeholder="Filter"
      onChange={(e) => setFilter(e.target.value)}
    ></input>
  );
};
