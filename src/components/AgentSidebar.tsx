"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAgentStore, AgentTask, TaskStatus } from "@/store/agentStore";
import { X, Loader2, CheckCircle2, AlertCircle, Clock, Trash2, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const statusConfig: Record<TaskStatus, { label: string; color: string; icon: React.ReactNode }> = {
  running: {
    label: "Running",
    color: "text-[#10B981]",
    icon: <Loader2 className="w-3 h-3 animate-spin" />,
  },
  complete: {
    label: "Done",
    color: "text-white/40",
    icon: <CheckCircle2 className="w-3 h-3" />,
  },
  error: {
    label: "Error",
    color: "text-red-400",
    icon: <AlertCircle className="w-3 h-3" />,
  },
  queued: {
    label: "Queued",
    color: "text-amber-400",
    icon: <Clock className="w-3 h-3" />,
  },
};

function TaskRow({ task }: { task: AgentTask }) {
  const cfg = statusConfig[task.status];
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex flex-col gap-1 py-3 last:border-0"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
    >
      <div className="flex items-start gap-2">
        <span className={cn("mt-0.5 shrink-0", cfg.color)}>{cfg.icon}</span>
        <span
          style={{
            fontFamily: "'Satoshi', sans-serif",
            fontWeight: 400,
            fontSize: "12px",
            color: "rgba(248,250,252,0.7)",
            lineHeight: 1.4,
          }}
        >
          {task.label}
        </span>
      </div>
      <div className="flex items-center gap-2 pl-5">
        <span
          className={cn("font-medium", cfg.color)}
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "9px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {cfg.label}
        </span>
        <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "9px" }}>·</span>
        <span
          style={{
            fontFamily: "'Satoshi', sans-serif",
            fontSize: "9px",
            color: "rgba(255,255,255,0.25)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          {task.module}
        </span>
      </div>
    </motion.div>
  );
}

export function AgentSidebar() {
  const { tasks, sidebarOpen, setSidebarOpen, clearCompleted } = useAgentStore();
  const runningCount = tasks.filter((t) => t.status === "running").length;

  return (
    <>
      {/* Trigger Tab */}
      <motion.button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-1.5 px-1.5 py-4 rounded-l-xl transition-all duration-200"
        style={{
          background: "#1A1D23",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRight: "none",
        }}
        whileHover={{ x: -2 }}
      >
        <span
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 500,
            fontSize: "7px",
            letterSpacing: "0.15em",
            color: "rgba(248,250,252,0.3)",
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            textTransform: "uppercase",
          }}
        >
          Agent
        </span>
        {runningCount > 0 && (
          <span
            className="w-4 h-4 rounded-full flex items-center justify-center"
            style={{
              background: "#10B981",
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 600,
              fontSize: "9px",
              color: "#0F1115",
            }}
          >
            {runningCount}
          </span>
        )}
        <ChevronRight
          className={cn("w-3 h-3 transition-transform", sidebarOpen && "rotate-180")}
          style={{ color: "rgba(248,250,252,0.3)" }}
        />
      </motion.button>

      {/* Sidebar Panel */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-40"
              style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
            />

            {/* Panel */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 h-full w-80 z-50 flex flex-col shadow-2xl"
              style={{
                background: "#0F1115",
                borderLeft: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between p-5"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div>
                  <h2
                    style={{
                      fontFamily: "'Clash Display', sans-serif",
                      fontWeight: 700,
                      fontSize: "11px",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#F8FAFC",
                    }}
                  >
                    Agent Status
                  </h2>
                  <p
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 400,
                      fontSize: "10px",
                      color: "rgba(248,250,252,0.3)",
                      marginTop: "2px",
                    }}
                  >
                    {runningCount} process{runningCount !== 1 ? "es" : ""} active
                  </p>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1.5 rounded-lg transition-colors"
                  style={{ color: "rgba(248,250,252,0.3)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#F8FAFC"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(248,250,252,0.3)"; e.currentTarget.style.background = "transparent"; }}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Task List */}
              <div className="flex-1 overflow-y-auto px-5">
                <AnimatePresence mode="popLayout">
                  {tasks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-40">
                      <span
                        style={{
                          fontFamily: "'Satoshi', sans-serif",
                          fontWeight: 400,
                          fontSize: "12px",
                          color: "rgba(248,250,252,0.2)",
                        }}
                      >
                        No active tasks
                      </span>
                    </div>
                  ) : (
                    tasks.map((task) => <TaskRow key={task.id} task={task} />)
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div
                className="p-5"
                style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
              >
                <button
                  onClick={clearCompleted}
                  className="flex items-center gap-2 transition-colors"
                  style={{
                    fontFamily: "'Satoshi', sans-serif",
                    fontWeight: 400,
                    fontSize: "11px",
                    color: "rgba(248,250,252,0.25)",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(248,250,252,0.6)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(248,250,252,0.25)"; }}
                >
                  <Trash2 className="w-3 h-3" />
                  Clear Completed
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
