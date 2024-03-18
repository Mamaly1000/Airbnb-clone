"use client";
import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import Avatar from "../ui/Avatar";
import { SafeNotificationType } from "@/types/safeNotificationType";
import { BiDotsHorizontal, BiHome, BiMoney } from "react-icons/bi";
import { formatDistanceToNowStrict } from "date-fns";
import { BsClock, BsEye } from "react-icons/bs";
import { TbEyeEdit, TbTag } from "react-icons/tb";
import DropDown from "../ui/Dropdown";
import { useSelectedNotifDropDown } from "@/hooks/useSelectedNotifDropDown";
import { MdDeleteOutline } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useUpdateReservationModal } from "@/hooks/useUpdateReservationModal";
import useNotifications, {
  notificationQueryParams,
} from "@/hooks/useNotifications";
import toast from "react-hot-toast";
import axios from "axios";

const NotifCard = ({
  notif,
  index,
  params,
}: {
  params?: notificationQueryParams;
  index: number;
  notif: SafeNotificationType;
}) => {
  const { mutate } = useNotifications(params);

  const [isLoading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [seen, setSeen] = useState(notif.read);
  const router = useRouter();
  const { onOpen } = useUpdateReservationModal();
  const {
    id: selectedNotif,
    onDeselect,
    onSelect,
  } = useSelectedNotifDropDown();
  const createdAt = useMemo(() => {
    if (!notif?.createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(notif?.createdAt), {
      addSuffix: true,
    });
  }, [notif?.createdAt]);
  const dropDownOptions = [
    {
      Icon: MdDeleteOutline,
      label: "delete",
      onClick: async () => {
        try {
          setLoading(true);
          await axios
            .patch(`/api/notifications/delete/${notif.id}`)
            .then((res) => {
              mutate();
              toast.success(res.data.message);
              setDeleted(true);
            });
        } catch (error) {
          console.log(error);
          toast.error("something went wrong!");
        } finally {
          setLoading(false);
        }
      },
    },
    {
      label: "check listing",
      Icon: BiHome,
      onClick: () => {
        router.push(`/listings/${notif.listingId}`);
      },
    },
    {
      disabled: notif.read,
      label: "seen",
      Icon: BsEye,
      onClick: async () => {
        try {
          setLoading(true);
          await axios
            .patch(`/api/notifications/seen/${notif.id}`)
            .then((res) => {
              mutate();
              toast.success(res.data.message);
              setSeen(true);
            });
        } catch (error) {
          console.log(error);
          toast.error("something went wrong!");
        } finally {
          setLoading(false);
        }
      },
    },
    {
      disabled:
        notif?.reservation?.status === "COMPLETED" || !!!notif?.reservationId,
      label: "update reservation",
      onClick: () => {
        if (notif.reservationId) {
          onOpen({ id: notif.reservationId, reservations: [] });
        }
      },
      Icon: TbTag,
    },
  ];
  return (
    <AnimatePresence>
      {!deleted && (
        <motion.article
          initial={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          exit={{ opacity: 0, translateX: 1000 }}
          transition={{
            duration: 0.15,
            ease: "linear",
            delay: index / 10 + 0.01,
          }}
          className={twMerge(
            ` min-w-full max-w-full relative
           flex flex-col items-start justify-start gap-1
           p-2  
           text-black dark:text-white text-sm
           border-b-[1px] border-neutral-200 dark:border-neutral-700 `,
            selectedNotif === notif.id ? "z-[20]" : "z-0"
          )}
        >
          <div className="min-w-full max-w-full flex items-center justify-between gap-1 relative">
            <div className="flex items-center justify-start gap-2 ">
              <Avatar userId={notif.actionUserId} />
              <div className="flex flex-col items-start justify-start gap-1">
                <p className="font-semibold text-black dark:text-white">
                  {notif.actionUser.name}
                </p>
                <p className="font-light text-[13px] text-neutral-500 dark:text-neutral-200">
                  {notif.actionUser.email}
                </p>
              </div>
            </div>
            <DropDown
              onDropDown={(e) => {
                e.stopPropagation();
                onSelect(notif.id);
              }}
              isLoading={isLoading}
              onClose={() => onDeselect()}
              display={notif.id === selectedNotif}
              options={dropDownOptions}
              position="top-[100%] end-0"
            >
              <BiDotsHorizontal size={20} />
            </DropDown>
          </div>
          <p className="text-[14px] text-black dark:text-white font-bold capitalize min-w-full max-w-full text-left">
            {notif.title}
          </p>
          <p className="text-[12px] font-light capitalize text-neutral-800 dark:text-neutral-300 whitespace-pre-wrap min-w-full max-w-full">
            {notif.message}
          </p>
          <div className="min-w-full max-w-full text-[12px] flex items-center justify-start gap-3 flex-wrap">
            <span
              className={twMerge(
                "flex items-center justify-center gap-1 text-white py-1 capitalize px-2 rounded-[5px] drop-shadow-2xl",
                seen ? "bg-green-600" : "bg-black dark:bg-rose-500"
              )}
            >
              <TbEyeEdit size={14} /> {seen ? "seen" : "unseen"}
            </span>
            {notif.totalAmount && (
              <span className="flex items-center justify-center gap-1">
                <BiMoney size={14} />${notif.totalAmount}
              </span>
            )}
            <span className="flex items-center justify-center gap-1">
              <BsClock size={14} />
              {createdAt}
            </span>
          </div>
        </motion.article>
      )}
    </AnimatePresence>
  );
};

export default NotifCard;
