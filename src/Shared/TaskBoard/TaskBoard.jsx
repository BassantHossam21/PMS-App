import { useEffect, useState } from "react";
import { DndContext, closestCorners, useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useTasksApi } from "../../Hooks/useTasks";

const columns = [
  { id: "ToDo", title: "To Do" },
  { id: "InProgress", title: "In progress" },
  { id: "Done", title: "Done" },
];

import { FaEdit } from "react-icons/fa";

function TaskCard({ task }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-3.5 mb-3 bg-[#EF9B28] text-white rounded-xl cursor-grab active:cursor-grabbing shadow-md hover:shadow-lg transition-all duration-200 font-bold flex flex-col justify-center min-h-[70px] active:scale-[0.98] group relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-white/20"></div>
      <div className="flex justify-between items-center gap-3">
        <span className="text-base leading-tight tracking-wide">
          {task.title}
        </span>
        {task.status === "ToDo" && (
          <FaEdit
            className="text-white/80 hover:text-white transition-all shrink-0"
            size={14}
          />
        )}
      </div>
    </div>
  );
}

function Column({ column, tasks }) {
  const { setNodeRef } = useDroppable({ id: column.id });

  return (
    <div className="flex-1 flex flex-col min-w-[300px] mb-10 md:mb-0">
      {/* Column Header */}
      <div className="px-4 mb-5 border-l-4 border-[#EF9B28]">
        <h3 className="text-xl font-bold text-[#0E382F] dark:text-(--text-primary) tracking-wide">
          {column.title}
        </h3>
      </div>

      {/* Column Container */}
      <div
        ref={setNodeRef}
        className="flex-1 max-h-[400px] bg-[#4f6f67] p-6 rounded-[2.5rem] shadow-lg transition-all duration-300"
      >
        <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-2">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </SortableContext>
      </div>
    </div>
  );
}

// البورد كله
export default function TaskBoard() {
  const [tasks, setTasks] = useState([]);
  const { data, tasksEmployee, ChangeTaskStatus } = useTasksApi();

  // هات التاسكات أول ما الصفحة تفتح
  useEffect(() => {
    tasksEmployee();
  }, []);

  // خزن الداتا في state
  useEffect(() => {
    if (data) setTasks(data);
  }, [data]);

  // Drag End
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const activeTask = tasks.find((t) => t.id === activeId);
    if (!activeTask) return;

    let newStatus;

    // IF Drop it at column
    const column = columns.find((c) => c.id === over.id);
    if (column) {
      newStatus = column.id;
    } else {
      // IF Drop it to  another Task

      const overTask = tasks.find((t) => t.id === over.id);
      newStatus = overTask?.status;
    }

    if (!newStatus || newStatus === activeTask.status) return;

    // Update UI (Optimistic Update)
    setTasks((prev) =>
      prev.map((t) => (t.id === activeId ? { ...t, status: newStatus } : t)),
    );

    // Call API
    try {
      await ChangeTaskStatus(activeId, newStatus);
      console.log("✅ Status updated:", newStatus);
    } catch (err) {
      console.error("❌ Failed:", err);

      // Rollback
      setTasks((prev) =>
        prev.map((t) =>
          t.id === activeId ? { ...t, status: activeTask.status } : t,
        ),
      );
    }
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="flex flex-col md:flex-row gap-8 p-6 overflow-x-auto min-h-screen bg-[#F8F9FB] dark:bg-(--bg-main) transition-colors duration-300">
        {columns.map((col) => (
          <Column
            key={col.id}
            column={col}
            tasks={tasks.filter((t) => t.status === col.id)}
          />
        ))}
      </div>
    </DndContext>
  );
}
