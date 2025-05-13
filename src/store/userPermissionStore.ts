
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AccessType = "all" | "marketing" | "sales" | "admin";

interface UserPermissionState {
  emailAccess: AccessType;
  proposalAccess: AccessType;
  setEmailAccess: (access: AccessType) => void;
  setProposalAccess: (access: AccessType) => void;
}

export const useUserPermissionStore = create<UserPermissionState>()(
  persist(
    (set) => ({
      emailAccess: "all",
      proposalAccess: "all",
      setEmailAccess: (emailAccess) => set({ emailAccess }),
      setProposalAccess: (proposalAccess) => set({ proposalAccess }),
    }),
    {
      name: "user-permission-storage",
    }
  )
);
