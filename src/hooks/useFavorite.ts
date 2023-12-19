"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import useLoginModal from "./useLoginModal";
import { safeUserType } from "@/types/safeuser";
import { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";

const useFavorite = ({
  listing_id,
  user,
}: {
  listing_id: string;
  user?: safeUserType | null;
}) => {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    return !!user?.favoriteIds?.find((listing) => listing === listing_id);
  }, [user, listing_id]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (!user) {
        return loginModal.onOpen();
      }
      try {
        setLoading(true);
        let req;
        if (hasFavorited) {
          req = () =>
            axios
              .delete(`/api/favorites/${listing_id}`)
              .then((res) => toast.success(res.data.message))
              .catch((error) => {
                console.log(error);
                toast.error("something went wrong!");
              });
        }
        if (!hasFavorited) {
          req = () =>
            axios
              .post(`/api/favorites/${listing_id}`)
              .then((res) => toast.success(res.data.message))
              .catch((error) => {
                console.log(error);
                toast.error("something went wrong!");
              });
        }
        (await req!()) as unknown as Promise<any>;
        router.refresh();
      } catch (error) {
        console.log(error);
        toast.error("something went wrong!");
      } finally {
        setLoading(false);
      }
    },
    [user, listing_id, hasFavorited, loginModal, router]
  );

  return { hasFavorited, toggleFavorite, isLoading };
};

export default useFavorite;
