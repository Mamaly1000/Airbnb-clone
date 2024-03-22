"use client";
import { isEmpty, isUndefined } from "lodash";
import React from "react";
import TableHeaderLabel, {
  SingleTable_TH_type,
} from "../table-shared-components/TableHeaderLabel";
import { twMerge } from "tailwind-merge";
export type TableHeaderTypes = {
  tableHeaderLabels?: SingleTable_TH_type[];
};
const TableHead = ({ tableHeaderLabels }: TableHeaderTypes) => {
  return (
    <thead
      className={twMerge(`
    min-w-full w-fit max-w-fit 
    bg-neutral-300 dark:bg-neutral-900 
    px-3 py-2 rounded-t-[5px] 
    flex items-center justify-start gap-2 min-h-[40px]
    sticky z-20 -top-3 left-0
    `)}
    >
      <tr className="min-w-full max-w-full flex items-center justify-start gap-2 bg-inherit relative">
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
