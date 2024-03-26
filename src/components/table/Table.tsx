"use client";
import React from "react";
import TableHeader from "./table-heading/TableHeader";
import TableFilterSection, {
  TableFilterSectionPropsType,
} from "./table-heading/TableFilterSection";
import { twMerge } from "tailwind-merge";
import { tableHeaderPropsType } from "./table-heading/TableHeader";
import TableControllSection, {
  TableControllSectionPropsType,
} from "./table-heading/TableControllSection";
import TableMainContainer from "./table-body/TableMainContainer";
import { TableHeaderTypes } from "./table-body/TableHead";
import { TableBodyPropsType } from "./table-body/TableBody";
import TableFooter, { TableFooterPropsType } from "./table-footer/TableFooter";
import FootNote, { FootNotePropsType } from "../shared/FootNote";

const Table = ({
  filterSectionActions,
  classNames,
  controllSection,
  tableHeaderLabels,
  header,
  tableBody,
  footer,
  footNote,
}: TableControllSectionPropsType &
  TableHeaderTypes & {
    classNames?: {
      heading?: string;
      filterSection?: string;
      container?: string;
      controllSection?: string;
      mainTable?: string;
      footer?: string;
      footNote?: string;
    };
    footer: TableFooterPropsType;
    filterSectionActions: TableFilterSectionPropsType;
    header: tableHeaderPropsType;
    tableBody: TableBodyPropsType;
    footNote?: FootNotePropsType;
  }) => {
  return (
    <section
      className={twMerge(
        `min-w-full max-w-full flex items-start justify-start gap-0 border-[1px] border-neutral-200 dark:border-neutral-700 rounded-md drop-shadow-2xl p-0 flex-col bg-white dark:bg-neutral-800`,
        classNames?.container
      )}
    >
      <TableHeader
        heading={header.heading}
        headingActions={header.headingActions}
        className={classNames?.heading}
      />
      <TableFilterSection
        tableFilterOptions={filterSectionActions.tableFilterOptions}
        onResetTableFilter={filterSectionActions.onResetTableFilter}
        TableDefaultFilterOptions={
          filterSectionActions.TableDefaultFilterOptions
        }
        filterButton={filterSectionActions.filterButton}
        onSelectTableFilter={filterSectionActions.onSelectTableFilter}
        onDeselectTableFilter={filterSectionActions.onDeselectTableFilter}
        className={classNames?.filterSection}
      />
      <TableControllSection
        controllSection={controllSection}
        className={classNames?.controllSection}
      />
      <TableMainContainer
        className={classNames?.mainTable}
        tableHeaderLabels={tableHeaderLabels}
        tableBody={tableBody}
      />
      <TableFooter
        footerItemOnclick={footer.footerItemOnclick}
        isLoading={footer.isLoading}
        pagination={footer.pagination}
        className={classNames?.footer}
      />
      <FootNote
        className={classNames?.footNote}
        notes={footNote?.notes}
        ul={footNote?.ul}
      />
    </section>
  );
};

export default Table;
