import { LegendType } from "recharts";
import { Formatter } from "recharts/types/component/DefaultLegendContent";
import { AxisDomain } from "recharts/types/util/types";

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
};
export type BarChartXAxisProps = {
  fontSize?: number;
  width?: number;
  formatter?: ((value: any, index: number) => string) | undefined;
  type?: "number" | "category" | undefined;
  color?: string;
  dataKey?: any;
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
    };
