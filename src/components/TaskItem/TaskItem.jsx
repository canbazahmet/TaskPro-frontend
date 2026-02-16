import { useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";

import Icon from "../Icon/Icon";
import ModalWrapper from "../../components/ModalWrapper/ModalWrapper";
import EditCard from "../../components/EditCard/EditCard";
import MoveTaskMenu from "../MoveTaskMenu/MoveTaskMenu";
import IconButton from "../IconButton/IconButton";

import { deleteTask, updateTask } from "../../redux/tasks/tasksOperations";
import { setCurrentTask } from "../../redux/tasks/tasksSlice";
import { selectColumnsForBoard } from "../../redux/columns/columnsSelectors";

import s from "./TaskItem.module.css";

const PRIORITY_CLASS_MAP = {
  without: "priority_without",
  low: "priority_low",
  medium: "priority_medium",
  high: "priority_high",
};

const TaskItem = ({ tasks, boardId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [loadingTaskId, setLoadingTaskId] = useState(null);

  const dispatch = useDispatch();
  const columns = useSelector((state) => selectColumnsForBoard(state, boardId));

  const handleOpenModal = useCallback(
    (taskCard) => {
      dispatch(setCurrentTask(taskCard));
      setIsModalOpen(true);
    },
    [dispatch],
  );

  const handleCloseModal = useCallback(() => setIsModalOpen(false), []);

  const handleOpenMenu = useCallback((event, task) => {
    setAnchorEl(event.currentTarget);
    setTaskToEdit(task);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setAnchorEl(null);
    setTaskToEdit(null);
  }, []);

  const handleMoveTask = useCallback(
    (newColumnId) => {
      if (taskToEdit) {
        dispatch(
          updateTask({
            task: { columnId: newColumnId },
            id: taskToEdit._id,
          }),
        );
        handleCloseMenu();
      }
    },
    [taskToEdit, dispatch, handleCloseMenu],
  );

  const handleDeleteTask = useCallback(
    (taskCard) => {
      setLoadingTaskId(taskCard._id);
      dispatch(
        deleteTask({
          id: taskCard._id,
          columnId: taskCard.columnId,
        }),
      ).finally(() => {
        setLoadingTaskId(null);
      });
    },
    [dispatch],
  );

  const formatDate = useCallback((isoDate) => {
    const date = new Date(isoDate);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }, []);

  const isDeadlineToday = useCallback((isoDate) => {
    const deadlineDate = new Date(isoDate).toDateString();
    const todayDate = new Date().toDateString();
    return deadlineDate === todayDate;
  }, []);

  const getPriorityClass = useCallback((priority) => {
    const key = priority?.toLowerCase() || "without";
    return s[PRIORITY_CLASS_MAP[key]] || s.priority_without;
  }, []);

  const hasTasksToRender = useMemo(() => tasks && tasks.length > 0, [tasks]);

  return (
    <>
      {hasTasksToRender &&
        tasks.map((taskCard) => (
          <div
            key={taskCard._id}
            className={clsx(s.card_item, getPriorityClass(taskCard.priority))}
          >
            <h4 className={s.task_title}>{taskCard.title}</h4>
            <span className={s.task_description}>{taskCard.description}</span>
            <span className={s.separator}></span>
            <div className={s.task_footer}>
              <div className={s.task_container_wrapper}>
                <span className={s.wrapper_title}>Priority</span>
                <div
                  className={clsx(
                    s.task_priority,
                    getPriorityClass(taskCard.priority),
                  )}
                >
                  <span className={s.task_priority_text}>
                    {taskCard.priority}
                  </span>
                </div>
              </div>
              {taskCard.deadline && (
                <div className={s.task_container_wrapper}>
                  <span className={s.wrapper_title}>Deadline</span>
                  <div className={s.task_deadline}>
                    <span>{formatDate(taskCard.deadline)}</span>
                  </div>
                </div>
              )}
              <div className={s.actions}>
                {isDeadlineToday(taskCard.deadline) && (
                  <Icon className={s.bell_icon} name="icon-bell" />
                )}
                <IconButton
                  className={s.right_arrow}
                  name="icon-right"
                  onClick={(event) => handleOpenMenu(event, taskCard)}
                />
                <IconButton
                  name="icon-pencil"
                  onClick={() => handleOpenModal(taskCard)}
                />
                {loadingTaskId === taskCard._id ? (
                  <div className={s.loader}></div>
                ) : (
                  <IconButton
                    name="icon-trash"
                    onClick={() => handleDeleteTask(taskCard)}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      <ModalWrapper open={isModalOpen} onClose={handleCloseModal}>
        <EditCard onSuccess={handleCloseModal} />
      </ModalWrapper>
      <MoveTaskMenu
        columns={columns}
        anchorEl={anchorEl}
        taskToEdit={taskToEdit}
        handleCloseMenu={handleCloseMenu}
        handleMoveTask={handleMoveTask}
      />
    </>
  );
};

export default TaskItem;
