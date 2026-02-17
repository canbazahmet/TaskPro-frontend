import { useEffect, useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';

import Icon from '../Icon/Icon';
import ModalWrapper from '../../components/ModalWrapper/ModalWrapper';
import EditCard from '../../components/EditCard/EditCard';
import MoveTaskMenu from '../MoveTaskMenu/MoveTaskMenu';
import IconButton from '../IconButton/IconButton';

import { deleteTask, updateTask } from '../../redux/tasks/tasksOperations';
import { setCurrentTask } from '../../redux/tasks/tasksSlice';
import { selectColumnsForBoard } from '../../redux/columns/columnsSelectors';
import { fetchBoard } from '../../redux/board/boardOperations';

import s from './TaskItem.module.css';

const TaskItem = ({ tasks, boardId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [loadingTaskId, setLoadingTaskId] = useState(null);
  const anchorRef = useRef(null);

  const dispatch = useDispatch();
  const columns = useSelector(state => selectColumnsForBoard(state, boardId));

  // Validate anchor element with callback
  const setValidAnchor = useCallback(element => {
    if (element && element.ownerDocument?.documentElement?.contains(element)) {
      anchorRef.current = element;
      setAnchorEl(element);
    } else {
      anchorRef.current = null;
      setAnchorEl(null);
    }
  }, []);

  useEffect(() => {
    return () => {
      anchorRef.current = null;
      setAnchorEl(null);
    };
  }, []);

  // Clean up stale anchorEl references
  useEffect(() => {
    if (!anchorEl || !anchorRef.current) return;

    const checkAndCleanup = () => {
      const isAttached =
        anchorRef.current?.ownerDocument?.documentElement?.contains(
          anchorRef.current
        );
      if (!isAttached) {
        anchorRef.current = null;
        setAnchorEl(null);
        setTaskToEdit(null);
      }
    };

    // Use RAF to avoid setState in effect
    const rafId = requestAnimationFrame(checkAndCleanup);
    return () => cancelAnimationFrame(rafId);
  }, [anchorEl, isModalOpen]);

  const handleOpenModal = taskCard => {
    handleCloseMenu(); // Close move menu if open
    dispatch(setCurrentTask(taskCard));
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    handleCloseMenu(); // Close move menu if open
    setIsModalOpen(false);
  };

  const handleOpenMenu = (event, task) => {
    event.preventDefault();
    event.stopPropagation();
    const element = event.currentTarget;
    // Store in ref immediately
    anchorRef.current = element;
    // Use double RAF to ensure DOM is completely stable
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (anchorRef.current && anchorRef.current === element) {
          setValidAnchor(element);
          setTaskToEdit(task);
        }
      });
    });
  };

  const handleCloseMenu = () => {
    anchorRef.current = null;
    setAnchorEl(null);
    setTaskToEdit(null);
  };

  const handleMoveTask = newColumnId => {
    const task = {
      columnId: newColumnId,
    };

    dispatch(
      updateTask({
        task,
        id: taskToEdit._id,
      })
    )
      .unwrap()
      .then(() => {
        // Refetch board WITHOUT priority filter to show all tasks
        return dispatch(fetchBoard({ id: boardId }));
      })
      .then(() => {
        handleCloseMenu();
      })
      .catch(() => {});
  };

  const handleDeleteTask = taskCard => {
    setLoadingTaskId(taskCard._id);
    dispatch(
      deleteTask({
        id: taskCard._id,
        columnId: taskCard.columnId,
      })
    )
      .unwrap()
      .then(() => {
        // Refetch board WITHOUT priority filter to show all tasks
        return dispatch(fetchBoard({ id: boardId }));
      })
      .then(() => {
        setLoadingTaskId(null);
      })
      .catch(() => {
        setLoadingTaskId(null);
      });
  };

  const taskArr = tasks;

  const formatDate = isoDate => {
    const date = new Date(isoDate);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const isDeadlineToday = isoDate => {
    const deadlineDate = new Date(isoDate).toDateString();
    const todayDate = new Date().toDateString();
    return deadlineDate === todayDate;
  };

  const getPriorityClass = priority => {
    const priorityMap = {
      without: s.priority_without,
      low: s.priority_low,
      medium: s.priority_medium,
      high: s.priority_high,
    };
    return priorityMap[priority.toLowerCase()] || s.priority_without;
  };

  return (
    <>
      {taskArr?.length > 0 &&
        taskArr.map(taskCard => (
          <div
            key={taskCard._id}
            className={clsx(s.card_item, getPriorityClass(taskCard.priority))}
          >
            <h4 className={s.task_title}>{taskCard.title}</h4>
            <p className={s.task_description}>{taskCard.description}</p>
            <span className={s.separator}></span>
            <div className={s.task_footer}>
              <div className={s.task_container_wrapper}>
                <span className={s.wrapper_title}>Priority</span>
                <div
                  className={clsx(
                    s.task_priority,
                    getPriorityClass(taskCard.priority)
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
                  onClick={event => handleOpenMenu(event, taskCard)}
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
      {anchorEl && !isModalOpen && (
        <MoveTaskMenu
          columns={columns}
          anchorEl={anchorEl}
          taskToEdit={taskToEdit}
          handleCloseMenu={handleCloseMenu}
          handleMoveTask={handleMoveTask}
        />
      )}
    </>
  );
};

export default TaskItem;
