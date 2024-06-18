"use client";
import EditprofileModal from "@/components/modals/EditprofileModal";
import FeedbackModal from "@/components/modals/FeedbackModal";
import FilterReservationModal from "@/components/modals/FilterReservationModal";
import LoginModal from "@/components/modals/LoginModal";
import RebookReservationModal from "@/components/modals/RebookReservationModal";
import RegisterModal from "@/components/modals/RegisterModal";
import RentModal from "@/components/modals/RentModal";
import DateRangeModal from "@/components/modals/DateRangeModal";
import SearchModal from "@/components/modals/SearchModal";
import UpdatePropertyModal from "@/components/modals/UpdatePropertyModal";
import UpdateReservationModal from "@/components/modals/UpdateReservationModal";
import React, { useEffect, useState } from "react";
import ReviewFilterModal from "@/components/modals/ReviewFilterModal";
import { usePathname } from "next/navigation";
const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  const isDashboard = pathname?.includes("/mydashboard");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <RegisterModal />
      <LoginModal />
      <RentModal />
      <SearchModal />
      <RebookReservationModal />
      <UpdateReservationModal />
      <UpdatePropertyModal />
      <FeedbackModal />
      <EditprofileModal />
      <DateRangeModal />
      {isDashboard && <FilterReservationModal />}
      {isDashboard && <ReviewFilterModal />}
    </>
  );
};

export default ModalProvider;
