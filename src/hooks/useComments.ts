import fetcher from "@/libs/fetcher"; 
import { Comment } from "@prisma/client";
import useSWR from "swr";

const useComments = (id?: string) => {
  const url = id ? `/api/comments/${id}` : null;
  const { data: comments, error, isLoading, mutate } = useSWR(url, fetcher);
  return { comments: (comments || []) as Comment[], error, isLoading, mutate };
};

export default useComments;
