import { LegendType } from "recharts";
import { LineDot } from "recharts/types/cartesian/Line";
import { Formatter } from "recharts/types/component/DefaultLegendContent";
import { Props } from "recharts/types/container/Surface";
import { CurveType } from "recharts/types/shape/Curve";
import { ActiveShape, AxisDomain } from "recharts/types/util/types";

export type BarChartLegendProps = {
  iconType?:
    | "line"
    | "plainline"
    | "square"
    | "rect"
    | "circle"
    | "cross"
    | "diamond"
    | "star"
    | "triangle"
    | "wye";
  iconSize?: number;
  align?: "left" | "center" | "right";
  verticalAlign?: "top" | "middle" | "bottom";
  layout?: "horizontal" | "vertical";
  width?: number;
  height?: number;
  margin?: { top?: number; left?: number; right?: number; bottom?: number };
  fill?: { dark?: string; light?: string };
  display?: boolean;
  formatter?: Formatter;
};
export type BarChartYAxisProps = {
  fontSize?: number;
  width?: number;
  formatter?: ((value: any, index: number) => string) | undefined;
  type?: "number" | "category" | undefined;
  color?: string;
  dataKey?: any;
  decimal?: boolean;
  domain?: AxisDomain;
  yAxisId?: string;
  orientation?: "left" | "right" | undefined;
  hide?: boolean;
};
export type BarChartXAxisProps = {
  fontSize?: number;
  width?: number;
  formatter?: ((value: any, index: number) => string) | undefined;
  type?: "number" | "category" | undefined;
  color?: string;
  dataKey?: any;
  hide?: boolean;
  padding?:
    | "gap"
    | {
        left?: number | undefined;
        right?: number | undefined;
      }
    | "no-gap"
    | undefined;
};
export type BarChartSizePorp = {
  width: number | string;
  height: number | string;
};
export interface BarDataItem {
  id: string | number;
  dataKey?: any;
  fill?: {
    dark?: string;
    light?: string;
  };
  activeBar?: {
    fill?: {
      dark?: string;
      light?: string;
    };
    stroke?: string;
  };
  radius?: number | [number, number, number, number];
  legendType?: LegendType;
  legendTitle?: string;
  stackId?: string;
}
export interface LineDataItem extends BarDataItem {
  yAxisId?: string;
  activeDot?: ActiveShape<any> | undefined;
  type?: CurveType;
  stroke?: string;
  dot?: LineDot;
  strokeWidth?: string | number | undefined;
}
export type ChartValueType =
  | {
      legend: string;
      type:
        | "LISTING_CATEGORY_COUNT"
        | "LISTING_CATEGORY_PRICE"
        | "LISTING_LOCATION_COUNT"
        | "LISTING_RATE_AVERAGE"
        | "LISTING_VIEWS_COUNT"
        | "FEEDBACK_LISTING_COUNT";
      data: {
        label: string;
        value: number;
        id: string;
      }[];
    }
  | {
      legend: string;
      type: "LISTING_ENTITIES_COUNT";
      data: {
        id: string;
        label: string;
        bathroomCount: number;
        guestCount: number;
        roomCount: number;
        title: string;
      }[];
    }
  | {
      type: "FEEDBACK_TOTAL_AVERAGE";
      legend: string;
      data: {
        id: string;
        userId: string;
        rating: number;
        cleanliness: number;
        accuracy: number;
        checkIn: number;
        communication: number;
        location: number;
        listing_name: string;
      }[];
    }
  | {
      legend: string;
      type: "FEEDBACK_RATE_COUNT";
      data: {
        label: string;
        id: string;
        value: number;
        title: string;
      }[];
    }
  | {
      type: "RESERVATION_CREATED_COUNT";
      legend: string;
      data: {
        total: number;
        createdAt: Date;
        id: string;
        title: string;
      }[];
    }
  | {
      type: "RESERVATION_DATE_TOTALPRICE";
      legend: string;
      data: { title: string; endDate: Date; totalPrice: number; id: string }[];
    }
  | {
      type: "RESERVATION_REVENUE_COUNT";
      legend: string;
      data: {
        id: string | undefined;
        title: string | undefined;
        average: number | null;
        createdAt: Date | undefined;
      }[];
    }
  | {
      type: "RESERVATION_STATUS";
      legend: string;
      data: {
        id: string;
        status: string;
        title: string;
        startDate: Date;
        endDate: Date;
        totalPrice: number;
      }[];
    }
  | {
      type: "RESERVATION_USER_COUNT";
      legend: string;
      data: {
        label: string;
        id: string;
        totalReservations: number;
        createdAt: Date;
      }[];
    };
