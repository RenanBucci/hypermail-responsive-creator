
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type MessageRole = "user" | "assistant";

export interface Message {
  id: string;
  content: string;
  role: MessageRole;
  timestamp: string;
}

interface ProposalState {
  title: string;
  company: string;
  messages: Message[];
  setTitle: (title: string) => void;
  setCompany: (company: string) => void;
  addMessage: (message: Message) => void;
  clearMessages: () => void;
}

export const useProposalStore = create<ProposalState>()(
  persist(
    (set) => ({
      title: "",
      company: "",
      messages: [],
      setTitle: (title) => set({ title }),
      setCompany: (company) => set({ company }),
      addMessage: (message) => set((state) => ({ 
        messages: [...state.messages, message] 
      })),
      clearMessages: () => set({ messages: [] }),
    }),
    {
      name: 'proposal-storage',
    }
  )
);
