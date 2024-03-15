import React from "react";

const DashboardPage = () => {
  return (
    <section className="grid grid-cols-12 gap-2 min-w-full max-w-full relative z-0">
      <div className="bg-neutral-300 dark:bg-neutral-600 min-h-[300px] rounded-lg drop-shadow-2xl col-span-4 flex items-center justify-center">
        section 1
      </div>
      <div className="bg-neutral-300 col-span-8 dark:bg-neutral-600 rounded-lg drop-shadow-2xl flex items-center justify-center">
        {" "}
        section 1
      </div>
      <div className="bg-neutral-300 col-span-8 dark:bg-neutral-600 rounded-lg drop-shadow-2xl flex items-center justify-center">
        {" "}
        section 1
      </div>
      <div className="bg-neutral-300 dark:bg-neutral-600 min-h-[300px] rounded-lg drop-shadow-2xl col-span-4 flex items-center justify-center">
        {" "}
        section 1
      </div>
      <div className="bg-neutral-300 col-span-5 dark:bg-neutral-600 min-h-[300px] rounded-lg drop-shadow-2xl flex items-center justify-center">
        section 1
      </div>
    </section>
  );
};

export default DashboardPage;
