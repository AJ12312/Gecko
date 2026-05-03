import { create } from "zustand";

export type TaskStatus = "running" | "complete" | "error" | "queued";

export interface AgentTask {
  id: string;
  label: string;
  status: TaskStatus;
  module: string;
  startedAt: Date;
  completedAt?: Date;
}

interface AgentStore {
  tasks: AgentTask[];
  sidebarOpen: boolean;
  addTask: (task: Omit<AgentTask, "id" | "startedAt">) => string;
  updateTask: (id: string, updates: Partial<AgentTask>) => void;
  completeTask: (id: string) => void;
  errorTask: (id: string) => void;
  clearCompleted: () => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useAgentStore = create<AgentStore>((set, get) => ({
  sidebarOpen: false,
  tasks: [
    {
      id: "demo-1",
      label: "RERA Compliance Scan — Mumbai Q2",
      status: "running",
      module: "RERA Watch",
      startedAt: new Date(Date.now() - 12000),
    },
    {
      id: "demo-2",
      label: "NCR Heatmap Refresh",
      status: "complete",
      module: "NCR Intelligence",
      startedAt: new Date(Date.now() - 60000),
      completedAt: new Date(Date.now() - 5000),
    },
    {
      id: "demo-3",
      label: "Estimate Model Warm-Up",
      status: "queued",
      module: "GeckoEstimate™",
      startedAt: new Date(),
    },
  ],

  addTask: (task) => {
    const id = `task-${Date.now()}`;
    set((s) => ({
      tasks: [{ ...task, id, startedAt: new Date() }, ...s.tasks],
    }));
    return id;
  },

  updateTask: (id, updates) =>
    set((s) => ({
      tasks: s.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    })),

  completeTask: (id) =>
    set((s) => ({
      tasks: s.tasks.map((t) =>
        t.id === id ? { ...t, status: "complete", completedAt: new Date() } : t
      ),
    })),

  errorTask: (id) =>
    set((s) => ({
      tasks: s.tasks.map((t) => (t.id === id ? { ...t, status: "error" } : t)),
    })),

  clearCompleted: () =>
    set((s) => ({
      tasks: s.tasks.filter((t) => t.status !== "complete"),
    })),

  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));
