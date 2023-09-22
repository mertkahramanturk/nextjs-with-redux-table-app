import React, { useState, useMemo } from "react";

interface SortConfig {
  key: string | null;
  direction: "asc" | "desc";
}

function useSortableTable(data: any[], initialConfig: SortConfig | null = null) {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(initialConfig);

  const sortedData = useMemo(() => {
    let sortableData = [...data];

    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        const keyA = a[sortConfig.key!];
        const keyB = b[sortConfig.key!];

        if (typeof keyA === "number" && typeof keyB === "number") {
          return sortConfig.direction === "asc" ? keyA - keyB : keyB - keyA;
        } else {
          return sortConfig.direction === "asc"
            ? keyA?.toString().localeCompare(keyB)
            : keyB?.toString().localeCompare(keyA);
        }
      });
    }

    return sortableData;
  }, [data, sortConfig]);

  const handleSortClick = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return { sortedData, handleSortClick, sortConfig };
}

export default useSortableTable;
