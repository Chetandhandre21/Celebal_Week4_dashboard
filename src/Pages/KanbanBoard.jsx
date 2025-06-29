import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./KanbanBoard.css";

const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const initialData = {
  todo: [
    { id: uuidv4(), title: "Design homepage" },
    { id: uuidv4(), title: "Set up project repo" },
  ],
  inProgress: [{ id: uuidv4(), title: "Develop login feature" }],
  done: [{ id: uuidv4(), title: "Project kickoff meeting" }],
};

const KanbanBoard = () => {
  const [tasks, setTasks] = useState(initialData);
  const [newTask, setNewTask] = useState({ todo: "", inProgress: "", done: "" });
  const [editingTask, setEditingTask] = useState({ column: null, id: null, title: "" });

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return;

    const sourceColTasks = Array.from(tasks[source.droppableId]);
    const [movedTask] = sourceColTasks.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceColTasks.splice(destination.index, 0, movedTask);
      setTasks((prev) => ({
        ...prev,
        [source.droppableId]: sourceColTasks,
      }));
    } else {
      const destColTasks = Array.from(tasks[destination.droppableId]);
      destColTasks.splice(destination.index, 0, movedTask);
      setTasks((prev) => ({
        ...prev,
        [source.droppableId]: sourceColTasks,
        [destination.droppableId]: destColTasks,
      }));
    }
  };

  const handleAddTask = (col) => {
    if (!newTask[col].trim()) return;
    const task = { id: uuidv4(), title: newTask[col].trim() };
    setTasks((prev) => ({
      ...prev,
      [col]: [task, ...prev[col]],
    }));
    setNewTask((prev) => ({ ...prev, [col]: "" }));
  };

  const handleDeleteTask = (col, id) => {
    setTasks((prev) => ({
      ...prev,
      [col]: prev[col].filter((task) => task.id !== id),
    }));
  };

  const startEditing = (col, id, title) => {
    setEditingTask({ column: col, id, title });
  };

  const cancelEditing = () => {
    setEditingTask({ column: null, id: null, title: "" });
  };

  const saveEditing = () => {
    const { column, id, title } = editingTask;
    if (!title.trim()) return;
    setTasks((prev) => ({
      ...prev,
      [column]: prev[column].map((task) =>
        task.id === id ? { ...task, title: title.trim() } : task
      ),
    }));
    cancelEditing();
  };

  return (
    <div className="kanban-board">
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.entries(tasks).map(([column, colTasks]) => (
          <Droppable droppableId={column} key={column}>
            {(provided, snapshot) => (
              <div
                className={`kanban-column ${
                  snapshot.isDraggingOver ? "dragging-over" : ""
                }`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h3 className="kanban-title">{column}</h3>

                <div className="add-task">
                  <input
                    type="text"
                    placeholder={`Add new task in ${column}`}
                    value={newTask[column]}
                    onChange={(e) =>
                      setNewTask((prev) => ({ ...prev, [column]: e.target.value }))
                    }
                    onKeyDown={(e) => e.key === "Enter" && handleAddTask(column)}
                  />
                  <button onClick={() => handleAddTask(column)}>Add</button>
                </div>

                {colTasks.map(({ id, title }, index) => (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        className={`kanban-task ${
                          snapshot.isDragging ? "dragging" : ""
                        }`}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {editingTask.id === id && editingTask.column === column ? (
                          <>
                            <input
                              type="text"
                              value={editingTask.title}
                              onChange={(e) =>
                                setEditingTask((prev) => ({
                                  ...prev,
                                  title: e.target.value,
                                }))
                              }
                              onKeyDown={(e) => {
                                if (e.key === "Enter") saveEditing();
                                else if (e.key === "Escape") cancelEditing();
                              }}
                              autoFocus
                            />
                            <button onClick={saveEditing}>Save</button>
                            <button onClick={cancelEditing}>Cancel</button>
                          </>
                        ) : (
                          <>
                            <span onDoubleClick={() => startEditing(column, id, title)}>
                              {title}
                            </span>
                            <button
                              className="delete-btn"
                              onClick={() => handleDeleteTask(column, id)}
                              title="Delete Task"
                            >
                              ×
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
