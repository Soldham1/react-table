import React from "react";
import { useTable, useGlobalFilter } from "react-table";
import axios from "axios";

import { GlobalFilter } from "./GlobalFilter";
import res from "./res.json";
import product from "./product.json";

function App() {
  const getData = (async) => {
    // const response = await axios.get("http://localhost:8092/products");
    const response = res;

    return response;
  };

  const data = React.useMemo(() => getData(), []);

  const columns = React.useMemo(() => {
    let headings = [];

    product.properties.map((property) => {
      let heading = {
        Header: "",
        accessor: "",
      };
      heading.Header = property.headerName;
      heading.accessor = property.field;
      headings.push(heading);
    });
    console.log(headings);
    return headings;
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter);

  const { globalFilter } = state;

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: "solid 3px red",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: "10px",
                        border: "solid 1px gray",
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default App;
