import { Menu, MenuItem } from '@mui/material';

import Icon from '../Icon/Icon';

import s from './MoveTaskMenu.module.css';

const MoveTaskMenu = ({
  columns,
  anchorEl,
  taskToEdit,
  handleCloseMenu,
  handleMoveTask,
}) => {
  // Validate that anchorEl is attached to the document
  const isValidAnchor =
    anchorEl &&
    typeof anchorEl === 'object' &&
    'ownerDocument' in anchorEl &&
    anchorEl.ownerDocument?.documentElement?.contains(anchorEl);

  // Don't render Menu at all if anchor is invalid
  if (!isValidAnchor) {
    return null;
  }

  return (
    <Menu
      anchorEl={anchorEl}
      open={true}
      onClose={handleCloseMenu}
      keepMounted={false}
      disableEnforceFocus
      disableAutoFocus
      disableRestoreFocus
    >
      {columns
        .filter(column => column._id !== taskToEdit?.columnId)
        .map(column => (
          <MenuItem key={column._id} onClick={() => handleMoveTask(column._id)}>
            {column.title}
            <div className={s.iconBox}>
              <Icon className={s.icon} name="icon-right" />
            </div>
          </MenuItem>
        ))}
    </Menu>
  );
};

export default MoveTaskMenu;
