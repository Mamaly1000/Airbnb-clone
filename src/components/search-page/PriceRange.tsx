"use client";
import { useTheme } from "@/hooks/useTheme";
import * as React from "react";
import { Range, getTrackBackground } from "react-range";

const PriceRange: React.FC<{
  STEP?: number;
  MIN?: number;
  MAX?: number;
  handlePriceRangeChange: (val: { min: number; max: number }) => void;
}> = ({ MAX = 100, MIN = 0, STEP = 0.1, handlePriceRangeChange }) => {
  const { mode } = useTheme();
  const [values, setValues] = React.useState([0, MAX / 2]);
  const emptyColor = "rgb(212 212 212 / var(--tw-border-opacity))";
  return (
    <div className="rounded-[5px] bg-white dark:bg-neutral-800 border-[1px] border-neutral-300 hover:border-neutral-400 px-4 py-2 flex items-center justify-between gap-2 min-h-[65.6px] max-h-[65.6px]   text-[17px] text-neutral-500 whitespace-nowrap">
      price :
      <div className="flex justify-center flex-wrap items-center min-w-[70%] px-2">
        <Range
          values={values}
          step={STEP}
          min={MIN}
          max={MAX}
          onChange={(values) => {
            handlePriceRangeChange({ min: values[0], max: values[1] });
            setValues(values);
          }}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              className="min-w-[100%] transition-all duration-300"
            >
              <div
                ref={props.ref}
                style={{
                  height: "5px",
                  width: "100%",
                  borderRadius: "4px",
                  background: getTrackBackground({
                    values,
                    colors:
                      mode === "dark"
                        ? [emptyColor, "#F43F5E", emptyColor]
                        : [emptyColor, "#000000", emptyColor],
                    min: MIN,
                    max: MAX,
                  }),
                  alignSelf: "center",
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ index, props, isDragged }) => (
            <div
              {...props}
              key={props.key}
              style={{
                ...props.style,
                height: "20px",
                width: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: isDragged ? "50%" : "5px",
              }}
              className="outline-none drop-shadow-2xl bg-black dark:bg-rose-500"
            >
              <div
                style={{
                  position: "absolute",
                  top: "-22px",
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "10px",
                  fontFamily: "Arial,Helvetica Neue,Helvetica,sans-serif",
                  padding: "2px",
                  borderRadius: "4px",
                  opacity: !isDragged ? 1 : 0,
                }}
                className="bg-black dark:bg-rose-500"
              >
                ${values[index].toFixed(1)}
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default PriceRange;
