
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

interface User {
  id: string;
  name: string;
  email: string;
  roleId: string;
}

interface UserPermissionState {
  emailAccess: AccessType;
  proposalAccess: AccessType;
  settingsAccess: AccessType;
  analyticsAccess: AccessType;
  
  userRoles: UserRole[];
  users: User[];
  activeRoleId: string | null;
  isAdminMode: boolean;
  
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
  
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
  assignRoleToUser: (userId: string, roleId: string) => void;
  
  setAdminMode: (enabled: boolean) => void;
  hasPermission: (userId: string, permission: keyof UserRole['permissions']) => boolean;
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

const defaultUsers: User[] = [
  {
    id: "admin-user",
    name: "Admin",
    email: "admin@empresa.com",
    roleId: "admin"
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
      users: defaultUsers,
      activeRoleId: "admin",
      isAdminMode: true, // Por padrão, começamos em modo admin
      
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
          
        // Atualize todos os usuários que tinham esta role
        const updatedUsers = state.users.map(user => 
          user.roleId === id ? { ...user, roleId: "admin" } : user
        );
          
        return {
          userRoles: newUserRoles,
          activeRoleId: newActiveRoleId,
          users: updatedUsers
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
      },
      
      addUser: (user) => set((state) => ({
        users: [...state.users, { ...user, id: `user-${Date.now()}` }]
      })),
      
      updateUser: (id, updatedUser) => set((state) => ({
        users: state.users.map(user => 
          user.id === id ? { ...user, ...updatedUser } : user
        )
      })),
      
      deleteUser: (id) => set((state) => ({
        users: state.users.filter(user => user.id !== id)
      })),
      
      assignRoleToUser: (userId, roleId) => set((state) => ({
        users: state.users.map(user =>
          user.id === userId ? { ...user, roleId } : user
        )
      })),
      
      setAdminMode: (isAdminMode) => set({ isAdminMode }),
      
      hasPermission: (userId, permission) => {
        // Sempre retorna true para o modo admin
        if (get().isAdminMode) return true;
        
        const user = get().users.find(u => u.id === userId);
        if (!user) return false;
        
        const role = get().userRoles.find(r => r.id === user.roleId);
        if (!role) return false;
        
        return role.permissions[permission] === "all" || role.permissions[permission] === "admin";
      }
    }),
    {
      name: "user-permission-storage",
    }
  )
);
