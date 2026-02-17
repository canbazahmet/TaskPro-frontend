import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, MenuItem } from '@mui/material';

import Icon from '../Icon/Icon';
import { updateUserThemeThunk } from '../../redux/auth/authOperations';
import { changeTheme } from '../../redux/auth/authSlice';
import { selectTheme } from '../../redux/auth/authSelectors';

import s from './HeaderTheme.module.css';

const HeaderTheme = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch();
  const activeTheme = useSelector(selectTheme);

  useEffect(() => {
    return () => {
      setAnchorEl(null);
    };
  }, []);

  const handleOpenMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleThemeChange = selectedTheme => {
    dispatch(updateUserThemeThunk(selectedTheme));
    dispatch(changeTheme(selectedTheme));
    handleCloseMenu();
  };

  return (
    <div className={s.themeWrapper}>
      <div className={s.themeToggle} onClick={handleOpenMenu}>
        <span>Theme</span>
        <Icon name={'icon-arrowDown'} className={s.arrowIcon} />
      </div>

      {anchorEl && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          disableAutoFocus
          disableEnforceFocus
          disableRestoreFocus
          keepMounted={false}
          slotProps={{
            paper: {
              onMouseDown: e => e.preventDefault(),
            },
          }}
        >
          <MenuItem
            className={activeTheme === 'light' ? s.activeItem : ''}
            onClick={() => handleThemeChange('light')}
          >
            Light
          </MenuItem>
          <MenuItem
            className={activeTheme === 'dark' ? s.activeItem : ''}
            onClick={() => handleThemeChange('dark')}
          >
            Dark
          </MenuItem>
          <MenuItem
            className={activeTheme === 'violet' ? s.activeItem : ''}
            onClick={() => handleThemeChange('violet')}
          >
            Violet
          </MenuItem>
        </Menu>
      )}
    </div>
  );
};

export default HeaderTheme;
