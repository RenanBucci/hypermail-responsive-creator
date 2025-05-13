
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AccessType = "all" | "marketing" | "sales" | "admin" | "restricted" | "none";

interface UserRole {
  id: string;
  name: string;
  description: string;
  permissions: {
    emailBuilder: AccessType;
    proposalGenerator: AccessType;
    settings: AccessType;
    analytics: AccessType;
  };
}

interface UserPermissionState {
  emailAccess: AccessType;
  proposalAccess: AccessType;
  settingsAccess: AccessType;
  analyticsAccess: AccessType;
  
  userRoles: UserRole[];
  activeRoleId: string | null;
  
  // Actions
  setEmailAccess: (access: AccessType) => void;
  setProposalAccess: (access: AccessType) => void;
  setSettingsAccess: (access: AccessType) => void;
  setAnalyticsAccess: (access: AccessType) => void;
  
  addRole: (role: Omit<UserRole, 'id'>) => void;
  updateRole: (id: string, role: Partial<UserRole>) => void;
  deleteRole: (id: string) => void;
  setActiveRole: (id: string | null) => void;
  applyRolePermissions: (id: string) => void;
}

const defaultRoles: UserRole[] = [
  {
    id: "admin",
    name: "Administrador",
    description: "Acesso completo a todas as funcionalidades",
    permissions: {
      emailBuilder: "all",
      proposalGenerator: "all",
      settings: "all",
      analytics: "all"
    }
  },
  {
    id: "marketing",
    name: "Marketing",
    description: "Acesso ao construtor de emails e análises",
    permissions: {
      emailBuilder: "all",
      proposalGenerator: "restricted",
      settings: "restricted",
      analytics: "all"
    }
  },
  {
    id: "sales",
    name: "Vendas",
    description: "Acesso ao gerador de propostas e análises",
    permissions: {
      emailBuilder: "restricted",
      proposalGenerator: "all",
      settings: "restricted",
      analytics: "all"
    }
  }
];

export const useUserPermissionStore = create<UserPermissionState>()(
  persist(
    (set, get) => ({
      emailAccess: "all",
      proposalAccess: "all",
      settingsAccess: "all",
      analyticsAccess: "all",
      
      userRoles: defaultRoles,
      activeRoleId: "admin",
      
      setEmailAccess: (emailAccess) => set({ emailAccess }),
      setProposalAccess: (proposalAccess) => set({ proposalAccess }),
      setSettingsAccess: (settingsAccess) => set({ settingsAccess }),
      setAnalyticsAccess: (analyticsAccess) => set({ analyticsAccess }),
      
      addRole: (role) => set((state) => ({
        userRoles: [
          ...state.userRoles,
          { ...role, id: `role-${Date.now()}` }
        ]
      })),
      
      updateRole: (id, updatedRole) => set((state) => ({
        userRoles: state.userRoles.map(role => 
          role.id === id ? { ...role, ...updatedRole } : role
        )
      })),
      
      deleteRole: (id) => set((state) => {
        const newUserRoles = state.userRoles.filter(role => role.id !== id);
        const newActiveRoleId = state.activeRoleId === id ? 
          (newUserRoles.length > 0 ? newUserRoles[0].id : null) : 
          state.activeRoleId;
          
        return {
          userRoles: newUserRoles,
          activeRoleId: newActiveRoleId
        };
      }),
      
      setActiveRole: (activeRoleId) => set({ activeRoleId }),
      
      applyRolePermissions: (id) => {
        const role = get().userRoles.find(role => role.id === id);
        if (role) {
          set({
            emailAccess: role.permissions.emailBuilder,
            proposalAccess: role.permissions.proposalGenerator,
            settingsAccess: role.permissions.settings,
            analyticsAccess: role.permissions.analytics,
            activeRoleId: id
          });
        }
      }
    }),
    {
      name: "user-permission-storage",
    }
  )
);
