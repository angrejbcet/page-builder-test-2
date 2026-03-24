"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useRouter } from "next/navigation";

/**
 * Export-safe ModalProvider for standalone client sites.
 * openContactModal navigates to /contact instead of opening an in-page modal.
 * Used when exporting from AgencyForge - the portal uses the full ModalProvider.
 */
interface ModalContextType {
  isContactModalOpen: boolean;
  openContactModal: () => void;
  closeContactModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const openContactModal = () => router.push("/contact");
  const closeContactModal = () => {};

  const value: ModalContextType = {
    isContactModalOpen: false,
    openContactModal,
    closeContactModal,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
