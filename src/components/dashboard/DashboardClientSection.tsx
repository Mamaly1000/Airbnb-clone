"use client";
import useClients from "@/hooks/useClients";
import React, { useCallback, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import Avatar from "../ui/Avatar";
import { format } from "date-fns";
import { IoPricetagOutline } from "react-icons/io5";
import { sum } from "lodash";
import Counter from "../shared/Counter";
import { TbReportAnalytics } from "react-icons/tb";
import Loader from "../ui/Loader";
import { PiWarningCircleLight } from "react-icons/pi";

const DashboardClientSection = () => {
  const { clients, isLoading } = useClients({ type: "MAIN_DASHBOARD" });
  const labels = useMemo(() => {
    return [
      {
        label: "client data",
        className: "min-w-[200px] z-10",
      },
      {
        label: "created at",
        className: "min-w-[220px]",
      },
      {
        label: "total reservations",
        className: "min-w-[200px]",
      },
      {
        label: "total reviews",
        className: "min-w-[100px] ",
      },
      {
        label: "total revenue",
        className: "min-w-[200px] z-10",
      },
    ].map((l, i, arr) => (
      <span
        className={twMerge(
          "flex items-center text-sm capitalize bg-white dark:bg-neutral-900 relative z-0",
          i === 0 && "justify-start md:sticky left-0 top-0",
          i === arr.length - 1 && "justify-end md:sticky top-0 right-0",
          l.className
        )}
        key={i}
      >
        {l.label}
      </span>
    ));
  }, []);
  const clientItem = useCallback(
    (client: (typeof clients)[0]) => {
      return (
        <div
          key={client.id}
          className="min-w-full max-w-fit flex items-center justify-start min-h-[60px]"
        >
          <span className="min-w-[200px] max-w-[200px] flex items-center justify-start capitalize text-sm gap-2 bg-white dark:bg-neutral-900 md:sticky top-0 left-0 z-10">
            <Avatar
              userId={client.id}
              className="min-w-[30px] max-w-[30px] min-h-[30px] max-h-[30px] w-[30px] h-[30px]"
            />
            {client.name}
          </span>
          <span className="min-w-[220px] max-w-[220px] flex items-center justify-start capitalize text-sm gap-1 bg-white dark:bg-neutral-900">
            {format(new Date(client.createdAt), "yyyy/MMMM/dd-hh:mm a")}
          </span>
          <span className="min-w-[200px] max-w-[200px] flex items-center justify-start capitalize text-sm gap-1 bg-white dark:bg-neutral-900">
            <IoPricetagOutline size={20} />
            {client.reservations.length}
          </span>
          <span className="min-w-[100px] max-w-[100px] flex items-center justify-start capitalize text-sm gap-1 bg-white dark:bg-neutral-900 ">
            <TbReportAnalytics size={20} />
            {client.feedbacks.length}
          </span>
          <Counter
            endValue={sum(client.reservations.map((r) => r.totalPrice))}
            decimal=","
            decimals={2}
            prefix="$"
            className="min-w-[200px] max-w-[200px]  flex items-center justify-end capitalize text-sm gap-1 bg-white dark:bg-neutral-900 md:sticky top-0 right-0 z-10"
          />
        </div>
      );
    },
    [clients]
  );
  return (
    <section className="col-span-12 lg:col-span-6 flex items-start justify-start gap-3 flex-col p-3 rounded-lg drop-shadow-2xl bg-white dark:bg-neutral-900">
      <div className="min-w-full max-w-full flex items-center justify-between text-left">
        <span className="text-sm md:text-lg capitalize font-semibold">
          recent clients
        </span>
      </div>
      {isLoading ? (
        <Loader
          size={30}
          className="min-w-full max-w-full bg-transparent dark:bg-transparent h-[300px] min-h[300px] max-h-[300px] flex items-center justify-center"
        />
      ) : (
        <div className="min-w-full max-w-full flex flex-col items-start justify-start overflow-auto">
          {clients.length === 0 ? (
            <div className="min-w-full max-w-full p-3 flex gap-1 items-center justify-center min-h-[200px]">
              <PiWarningCircleLight size={20} />
              currently,there is no data
            </div>
          ) : (
            <>
              <div className="min-w-full max-w-full flex items-center">
                {labels}
              </div>
              <div className="min-w-full max-w-fit flex flex-col items-start justify-start">
                {clients.map((client) => clientItem(client))}
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
};

export default DashboardClientSection;
