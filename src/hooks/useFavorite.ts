"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import useLoginModal from "./useLoginModal";
import { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";
import useUser from "./useUser";
import { includes } from "lodash";

const useFavorite = ({ listing_id }: { listing_id: string }) => {
  const { user, mutate } = useUser();
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const loginModal = useLoginModal();

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (!user) {
        return loginModal.onOpen();
      }
      try {
        setLoading(true);
        await axios.patch(`/api/favorites/${listing_id}`).then((res) => {
          toast.success(res.data.message);
          mutate();
        });
      } catch (error) {
        console.log(error);
        toast.error("something went wrong!");
      } finally {
        setLoading(false);
      }
    },
    [user, listing_id, loginModal, router, mutate]
  );
  const hasFavorited = useMemo(() => {
    return includes(user?.favoriteIds, listing_id);
  }, [user, listing_id]);

  return { hasFavorited, toggleFavorite, isLoading };
};

export default useFavorite;
