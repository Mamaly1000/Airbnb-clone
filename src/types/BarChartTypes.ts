import { LegendType } from "recharts";
import { Formatter } from "recharts/types/component/DefaultLegendContent";

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
}
