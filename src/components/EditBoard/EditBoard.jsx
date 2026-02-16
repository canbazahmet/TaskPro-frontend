import { useDispatch } from "react-redux";
import { useCallback } from "react";

import { updateBoard } from "../../redux/board/boardOperations";
import BoardForm from "../BoardForm/BoardForm";

const EditBoard = ({ boardToEdit = {}, onClose }) => {
  const dispatch = useDispatch();

  const defaultBoard = {
    title: "Sample Board",
    icon: "icon_2",
    background: "iconBackground",
  };

  const { title, icon, background } = { ...defaultBoard, ...boardToEdit };

  const handleUpdateBoard = useCallback(
    async (updatedBoardData) => {
      const updatedData = {
        title: updatedBoardData.title,
        icon: updatedBoardData.selectedIcon,
      };
      updatedData.backgroundImage =
        updatedBoardData.selectedBackground === "iconBackground"
          ? null
          : updatedBoardData.selectedBackground;

      try {
        await dispatch(
          updateBoard({ id: boardToEdit.id, data: updatedData }),
        ).unwrap();

        onClose();
      } catch (error) {
        console.error("Error updating board:", error);
      }
    },
    [boardToEdit.id, dispatch, onClose],
  );

  return (
    <BoardForm
      initialTitle={title}
      initialSelectedIcon={icon}
      initialSelectedBackground={
        background === null ? "iconBackground" : background
      }
      formTitle="Edit board"
      buttonText="Edit"
      onSubmit={handleUpdateBoard}
    />
  );
};

export default EditBoard;
