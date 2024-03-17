"use client";
import useNotifications from "@/hooks/useNotifications";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoHeartDislikeSharp, IoNotificationsOutline } from "react-icons/io5"; 
import { IconType } from "react-icons";
import { MdOutlineFavorite } from "react-icons/md";
import { FaTag } from "react-icons/fa";
import {
  TbHomeCheck,
  TbHomeDot,
  TbHomeEco,
  TbHomeEdit,
  TbHomeX,
} from "react-icons/tb";
import { NotificationTypes } from "@/types/notificationstype";

const NotifToggle = () => {
  const router = useRouter();
  const [display, setDisplay] = useState(true);
  const { user, isLoading: userLoading } = useUser();
  const { notifications, isLoading: notifsLoading } = useNotifications();
  const content = useMemo(() => {
    const unReadNotifs = notifications.filter((n) => n.read === false);
    const data: { count: number; Icon: IconType }[] = [
      {
        Icon: MdOutlineFavorite,
        count: unReadNotifs.filter(
          (n) => n.type === NotificationTypes.LIKE_LISTING
        ).length,
      },
      {
        Icon: IoHeartDislikeSharp,
        count: unReadNotifs.filter(
          (n) => n.type === NotificationTypes.DISLIKE_LISTING
        ).length,
      },
      {
        Icon: FaTag,
        count: unReadNotifs.filter(
          (n) => n.type === NotificationTypes.BOOK_RESERVATION
        ).length,
      },
      {
        Icon: TbHomeX,
        count: unReadNotifs.filter(
          (n) => n.type === NotificationTypes.CANCEL_RESERVATION
        ).length,
      },
      {
        Icon: TbHomeCheck,
        count: unReadNotifs.filter(
          (n) => n.type === NotificationTypes.COMPLETE_RESERVATION
        ).length,
      },
      {
        Icon: TbHomeDot,
        count: unReadNotifs.filter(
          (n) => n.type === NotificationTypes.REBOOK_RESERVATION
        ).length,
      },
      {
        Icon: TbHomeEdit,
        count: unReadNotifs.filter(
          (n) => n.type === NotificationTypes.REVIEW_RESERVATION
        ).length,
      },
      {
        Icon: TbHomeEco,
        count: unReadNotifs.filter(
          (n) => n.type === NotificationTypes.UPDATE_RESERVATION
        ).length,
      },
    ];
    return data.map(
      ({ Icon, count }, i) =>
        !!count && (
          <div
            key={i}
            className="flex items-center justify-center gap-1 relative z-10"
          >
            <Icon size={15} />
            {count}
          </div>
        )
    );
  }, [notifications]);

  return (
    <AnimatePresence>
      {user && (
        <motion.section className="relative flex items-center justify-center max-w-fit max-h-fit">
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              router.push("/mydashboard/notifications");
            }}
            disabled={userLoading || notifsLoading}
            className="p-2 min-w-[40px] min-h-[40px]  flex items-center justify-center rounded-full border-[1px] border-neutral-200 disabled:opacity-50 text-inherit bg-inherit relative"
          >
            <IoNotificationsOutline size={15} />
          </motion.button>
          <AnimatePresence initial={true} mode="wait">
            {!notifsLoading && display && (
              <motion.section
                exit={{ opacity: 0, translateY: -10 }}
                initial={{ opacity: 0, translateY: -10 }}
                animate={{ opacity: 1, translateY: 0 }}
                onAnimationComplete={() => {
                  setTimeout(() => {
                    setDisplay(false);
                  }, 4000);
                }}
                transition={{ duration: 0.14, ease: "linear", delay: 1 }}
                className="absolute overflow-visible top-[115%] items-center justify-center gap-3 bg-black text-white z-0 dark:bg-rose-500 rounded-lg text-[12px] font-light drop-shadow-2xl p-2 hidden md:flex"
              >
                <div className="min-w-[10px] min-h-[10px] rotate-45 drop-shadow-2xl -z-10 absolute top-[-5px] bg-black dark:bg-rose-500"></div>
                {content}
              </motion.section>
            )}
          </AnimatePresence>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default NotifToggle;
