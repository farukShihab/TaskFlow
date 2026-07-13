import { useTaskHistoryStore } from "@/store/task-history.store";
import { useTasksStore } from "@/store/task.store";
import {
  isToday,
  parseISO,
} from "date-fns";
import {
  Plus,
  Pencil,
  Trash2,
  MoveRight,
} from "lucide-react";
import { ReactNode } from "react";

interface StatProps {
  icon: ReactNode;
  label: string;
  value: number;
}

function Stat({
  icon,
  label,
  value,
}: StatProps) {
  return (
    <div className="rounded-2xl bg-muted/40 p-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <p className="text-xs">
          {label}
        </p>
      </div>

      <p className="mt-2 text-2xl font-bold">
        {value}
      </p>
    </div>
  );
}

export function Dashboard() {
  const history = useTaskHistoryStore(
    (state) => state.history
  );

  const tasks = useTasksStore(
    (state) => state.tasks
  );


  const todayHistory = history.filter((item) =>
    isToday(parseISO(item.created_at))
  );

  const createdCount = todayHistory.filter(
    (h) => h.action === "created"
  ).length;

  const updatedCount = todayHistory.filter(
    (h) => h.action === "updated"
  ).length;

  const deletedCount = todayHistory.filter(
    (h) => h.action === "deleted"
  ).length;

  const movedCount = todayHistory.filter(
    (h) => h.action === "moved"
  ).length;

  const completedCount = tasks.filter(
    (task) => task.status === "done"
  ).length;

  const completionRate =
    tasks.length === 0
      ? 0
      : Math.round(
        (completedCount / tasks.length) * 100
      );

  const recentHistory = history.slice(0, 5);


  return (
    <aside className="space-y-5">
      <div className="rounded-3xl border border-border bg-card p-5">
        <div className="mb-4">
          <h3 className="font-semibold">
            Today's Activity
          </h3>

          <p className="text-xs text-muted-foreground">
            {todayHistory.length} actions today
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Stat
            icon={<Plus size={16} />}
            label="Created"
            value={createdCount}
          />

          <Stat
            icon={<Pencil size={16} />}
            label="Updated"
            value={updatedCount}
          />

          <Stat
            icon={<Trash2 size={16} />}
            label="Deleted"
            value={deletedCount}
          />

          <Stat
            icon={<MoveRight size={16} />}
            label="Moved"
            value={movedCount}
          />
        </div>
      </div>
      <div className="rounded-3xl border border-border bg-card p-5">
        <h3 className="mb-4 text-sm font-semibold">
          Productivity
        </h3>

        <div className="space-y-2">
          <p>{completedCount} completed</p>

          <div className="h-2 rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-violet-600"
              style={{
                width: `${completionRate}%`,
              }}
            />
          </div>

          <p className="text-xs text-muted-foreground">
            {completionRate}% complete
          </p>
        </div>
      </div>
      <div className="rounded-3xl border border-border bg-card p-5">
        <h3 className="mb-4 text-sm font-semibold">
          Recent Activity
        </h3>

        <div className="space-y-3">
          {recentHistory.map((item) => (
            <div
              key={item.id}
              className="text-sm"
            >
              {item.action} "{item.task_title}"
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}