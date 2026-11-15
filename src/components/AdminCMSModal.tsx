"use client";

import React from "react";
import AdminCMSDashboard from "@/components/AdminCMSDashboard";

interface AdminCMSModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataChange?: () => void;
}

export default function AdminCMSModal({
  isOpen,
  onClose,
  onDataChange,
}: AdminCMSModalProps) {
  if (!isOpen) return null;

  return (
    <AdminCMSDashboard
      isOpen={isOpen}
      onClose={onClose}
      isStandalonePage={false}
      onDataChange={onDataChange}
    />
  );
}
