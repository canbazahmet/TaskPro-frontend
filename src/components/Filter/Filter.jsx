import { useCallback, useMemo } from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import clsx from "clsx";
import Modal from "../ModalWrapper/ModalWrapper.jsx";
import { radioButtons, filterOptions } from "./radioButtons.js";

import s from "./Filter.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setFilterType } from "../../redux/filter/filterSlice.js";
import { selectFilterPriority } from "../../redux/filter/filterSelectors.js";

const Filter = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const filterType = useSelector(selectFilterPriority);

  const selectedValue = useMemo(() => {
    if (filterType === "All") return "";
    const match = filterOptions.find((option) => option.filter === filterType);
    return match?.value || "";
  }, [filterType]);

  const handleChange = useCallback(
    (event) => {
      const value = event.target.value;
      const selectedOption = filterOptions.find((obj) => obj.value === value);
      const selectedFilter = selectedOption?.filter;

      dispatch(
        setFilterType(selectedFilter !== undefined ? selectedFilter : "All"),
      );
    },
    [dispatch],
  );

  const handleShowAll = useCallback(() => {
    dispatch(setFilterType("All"));
  }, [dispatch]);

  return (
    <Modal open={open} onClose={handleClose}>
      <h2 className={clsx(s.text, s.title)}>Filters</h2>
      <div className={s.wrapper}>
        <h3 className={clsx(s.text, s.subtitle)}>Label color</h3>
        <button className={s.button} onClick={handleShowAll} type="button">
          Show all
        </button>
      </div>
      <FormControl
        classes={{
          root: s.control,
        }}
      >
        <RadioGroup
          name="filter-options"
          value={selectedValue}
          onChange={handleChange}
        >
          {radioButtons.map(({ label, value }) => {
            return (
              <FormControlLabel
                key={value}
                value={value}
                checked={selectedValue === value}
                control={
                  <Radio
                    color={value}
                    classes={{
                      root: clsx(
                        s.radio,
                        selectedValue === value && s.checked,
                        s[`radio-${value}`],
                        s[`radio-color-${value}`],
                      ),
                    }}
                  />
                }
                label={label}
                classes={{
                  root: clsx(
                    s.label,
                    selectedValue === value && s["checked-label"],
                  ),
                }}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
    </Modal>
  );
};

export default Filter;
