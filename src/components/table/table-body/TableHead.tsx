"use client";
import { isEmpty, isUndefined } from "lodash";
import React from "react";
import TableHeaderLabel from "../table-shared-components/TableHeaderLabel";
export type TableHeaderTypes = {
  tableHeaderLabels?: {
    label: string;
    sort: { isActive?: boolean; type?: "asc" | "desc" };
    disabled?: boolean;
    display?: boolean;
    onClick?: () => void;
  }[];
};
const TableHead = ({ tableHeaderLabels }: TableHeaderTypes) => {
  return (
    <thead className="min-w-full max-w-full bg-neutral-200 dark:bg-neutral-900 px-3 py-2 rounded-t-[5px] flex items-center justify-start gap-2">
      <tr className="min-w-full max-w-full flex items-center justify-start gap-2 bg-inherit">
        {!isEmpty(tableHeaderLabels) &&
          !isUndefined(tableHeaderLabels) &&
          tableHeaderLabels.map((l, i) => (
            <TableHeaderLabel key={i} index={i} item={l} />
          ))}
      </tr>
    </thead>
  );
};

export default TableHead;
