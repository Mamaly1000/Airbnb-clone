"use client";
import React from "react";
import TableHeader from "./table-heading/TableHeader";
import TableFilterSection, {
  TableFilterSectionPropsType,
} from "./table-heading/TableFilterSection";
import { filterItems } from "../search-page/FilterSelect";
import { formatDistanceToNowStrict } from "date-fns";
import { IoCreate } from "react-icons/io5";
import { MdLockReset } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import { tableHeaderPropsType } from "./table-heading/TableHeader";
import TableControllSection, {
  TableControllSectionPropsType,
} from "./table-body/TableControllSection";

const Table = ({
  TableDefaultFilterOptions,
  heading,
  headingActions,
  onDeselectTableFilter,
  onResetTableFilter,
  onSelectTableFilter,
  tableFilterOptions,
  classNames,
  controllSection,
}: tableHeaderPropsType &
  TableFilterSectionPropsType &
  TableControllSectionPropsType & {
    classNames: {
      heading?: string;
      filterSection?: string;
      container?: string;
      controllSection?: string;
    };
  }) => {
  return (
    <section
      className={twMerge(
        `min-w-full max-w-full flex items-start justify-start gap-0 border-[1px] border-neutral-200 dark:border-neutral-700 rounded-md drop-shadow-2xl p-0 flex-col`,
        classNames.container
      )}
    >
      <TableHeader
        heading={heading}
        headingActions={headingActions}
        className={classNames.heading}
      />
      <TableFilterSection
        tableFilterOptions={tableFilterOptions}
        onResetTableFilter={onResetTableFilter}
        TableDefaultFilterOptions={TableDefaultFilterOptions}
        onSelectTableFilter={onSelectTableFilter}
        onDeselectTableFilter={onDeselectTableFilter}
        className={classNames.filterSection}
      />
      <TableControllSection
        controllSection={controllSection}
        className={classNames.controllSection}
      />
    </section>
  );
};

export default Table;
