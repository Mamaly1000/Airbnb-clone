"use client";
import Loader from "@/components/ui/Loader";
import { reservationStatusTypes } from "@/hooks/useReservations";
import { reservationSortTypes } from "@/types/reservationTypes";
import { ReviewSortTypes, ReviewsStatusTypes } from "@/types/ReviewTypes";
import { isEmpty } from "lodash";
import React from "react";
export interface RowData {
  column_type?: reservationSortTypes | ReviewSortTypes;
  row_type?: reservationStatusTypes | ReviewsStatusTypes;
  display_row?: boolean;
  display_column?: boolean;
  data: any;
}
export type TableBodyPropsType = {
  RowElement: React.ComponentType<{ key: any; index: number; row: RowData }>;
  rows?: RowData[];
  isLoading?: boolean;
};
const TableBody = ({
  rows = [],
  RowElement,
  isLoading,
}: TableBodyPropsType) => {
  return !isLoading ? (
    <tbody className="min-w-full max-w-fit flex flex-col gap-0 items-start justify-start relative z-0 min-h-[300px]">
      {rows.map((row, index) => (
        <RowElement key={index} row={row} index={index} />
      ))}
      {isEmpty(rows) && (
        <tr className="min-w-full max-w-full flex items-center justify-center min-h-[200px]">
          <td className="text-neutral-600 dark:text-neutral-300 text-sm capitalize text-center  ">
            there is no reservation...
          </td>
        </tr>
      )}
    </tbody>
  ) : (
    <Loader
      className="min-w-full max-w-full flex items-center justify-center  min-h-[300px]"
      size={30}
    />
  );
};

export default TableBody;
