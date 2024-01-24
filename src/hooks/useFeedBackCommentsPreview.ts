import { create } from "zustand";

interface useFeedBackCommentsPreviewStore {
  isOpen: boolean;
  feedbackId?: string;
  listingId?: string;
  onClose: () => void;
  onOpen: ({
    listingId,
    feedbackId,
  }: {
    listingId: string;
    feedbackId: string;
  }) => void;
}

export const useFeedBackCommentsPreview =
  create<useFeedBackCommentsPreviewStore>((set) => ({
    isOpen: false,
    feedbackId: undefined,
    listingId: undefined,
    onClose: () =>
      set({ feedbackId: undefined, isOpen: false, listingId: undefined }),
    onOpen: ({ listingId, feedbackId }) =>
      set({
        listingId,
        feedbackId,
        isOpen: true,
      }),
  }));
