"use client";

import React, { MouseEvent } from "react";
import useColumnResizer from "../../hooks/useColumnResizer";
import useSortableTable  from "../../hooks/useSortableTable"; 

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeftRight,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";

interface Column {
  title: string | boolean;
  field: string;
  reSize?: boolean;
  sortableColumn?: boolean;
}

interface TableProps {
  data: any;
  columns: Column[];
  checked_all?: boolean;
  checkable?: boolean;
}
export interface SortConfig {
  key: string | null;
  direction: 'asc' | 'desc' | null;
}
function Table({ data, columns, checked_all = false, checkable = false }: TableProps) {
  const { sortedData, handleSortClick, sortConfig } = useSortableTable(data, {
    key: null,
    direction: 'asc',
  });

  const { width, handleResizeStart } = useColumnResizer(300, 0, 500);

  const handleCheckboxClick = (e: MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };

  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-sm">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          {checked_all && checkable && (
            <th
              className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
              scope="row"
              style={{ width: `${width}px`, position: "relative" }}
            >
              <input
                id="checkbox-head"
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-100 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onClick={handleCheckboxClick}
              />
              <label htmlFor="checkbox-head" className="sr-only"></label>
            </th>
          )}
          {columns.map((column) => {
            if (column.title) {
              return (
                <th
                  key={column.field}
                  className={`px-6 py-4 font-medium text-gray-900 dark:text-white ${
                    column.sortableColumn && "cursor-pointer"
                  }`}
                  scope="row"
                  style={{
                    width: `${column.reSize && width}px`,
                    position: "relative",
                  }}
                  onClick={() => column.sortableColumn && handleSortClick(column.field)}
                >
                  <div className="flex">
                    <span className="px-2">
                      {column.title && column.title}{" "}
                    </span>
                    {column?.reSize && (
                      <div
                        className="resize-handle"
                        onMouseDown={handleResizeStart}
                      >
                        <FontAwesomeIcon icon={faLeftRight} size="lg" />
                      </div>
                    )}

                    {column.sortableColumn && (
                      <div style={{ width: "15px" }}>
                        <FontAwesomeIcon
                          icon={
                            sortConfig?.direction === "asc"
                              ? faChevronDown
                              : faChevronUp
                          }
                          size="lg"
                        />
                      </div>
                    )}
                  </div>
                </th>
              );
            }
            return null; // Eğer column.title false ise null dön (Boş hücre)
          })}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row) => (
          <tr
            key={row.id}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            {columns.map((column) => {
              if (column.field === "checkbox") {
                return (
                  <td className="w-4 p-4" key={column.field}>
                    <div className="flex items-center">
                      <input
                        id={`checkbox-body-${row.id}`}
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onClick={handleCheckboxClick}
                      />
                      <label
                        htmlFor={`checkbox-body-${row.id}`}
                        className="sr-only"
                      ></label>
                    </div>
                  </td>
                );
              } else if (column.field === "image") {
                return (
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    <div className="flex-shrink-0 w-20 h-20">
                      <img
                        className="w-full h-full rounded-full"
                        src={row[column.field]}
                        alt=""
                      />
                    </div>
                  </td>
                );
              } else {
                return (
                  <td key={column.field} className="px-6 py-4">
                    {row[column.field]}
                  </td>
                );
              }
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
