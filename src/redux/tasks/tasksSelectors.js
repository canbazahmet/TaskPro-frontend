import { createSelector } from "reselect";

export const selectTasks = (state) => state.tasks.tasks;

export const selectCurrentTask = (state) => state.tasks.currentTask;

export const selectIsLoading = (state) => state.tasks.isLoading;

export const selectIsError = (state) => state.tasks.isError;

export const selectColumns = (state) => state.columns.columns;

export const selectTasksForColumn = createSelector(
  [selectColumns, selectTasks, (_, columnId) => columnId],
  (columns, tasks, columnId) => {
    const column = columns.find((col) => col._id === columnId);
    if (!column || !column.tasksIds) return [];
    const tasksById = new Map(tasks.map((task) => [task._id, task]));
    return column.tasksIds
      .map((taskId) => tasksById.get(taskId))
      .filter(Boolean);
  },
);
