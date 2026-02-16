import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import dayjs from "dayjs";
import clsx from "clsx";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

import Button from "../Button/Button.jsx";
import CustomDatePicker from "../CustomDatePicker/CustomDatePicker.jsx";
import PriorityPicker from "../PriorityPicker/PriorityPicker.jsx";

import { addCardSchema } from "../../helpers/addCardSchema.js";
import {
  selectCurrentTask,
  selectIsLoading,
} from "../../redux/tasks/tasksSelectors.js";
import { updateTask } from "../../redux/tasks/tasksOperations.js";

import s from "../AddCard/AddCard.module.css";
import t from "../../styles/Forms.module.css";

dayjs.extend(isSameOrAfter);

const EditCard = ({ onSuccess }) => {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectIsLoading);
  const card = useSelector(selectCurrentTask);

  const initialValues = useMemo(() => {
    if (!card) {
      return {
        title: "",
        description: "",
        priority: "Without",
        deadline: null,
      };
    }
    return {
      title: card.title || "",
      description: card.description || "",
      priority: card.priority || "Without",
      deadline: card.deadline ? new Date(card.deadline) : null,
    };
  }, [card]);

  const handleSubmit = useCallback(
    async (values, actions) => {
      if (!card) return;

      const task = {
        title: values.title || "",
        description: values.description || "",
        priority: values.priority || "Without",
        columnId: card.columnId,
        boardId: card.boardId,
      };

      if (values.deadline) {
        task.deadline = dayjs(values.deadline).toISOString();
      }

      try {
        await dispatch(
          updateTask({
            task,
            id: card._id,
          }),
        ).unwrap();

        if (onSuccess) onSuccess();
      } finally {
        actions.setSubmitting(false);
      }
    },
    [card, dispatch, onSuccess],
  );

  if (!card) {
    return (
      <div className={s.wrapper}>
        <div style={{ textAlign: "center", padding: "20px" }}>
          <p>Loading card data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={s.wrapper}>
      <h3 className={s.title}>Edit card</h3>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={addCardSchema}
        enableReinitialize={true}
      >
        {({ values, setFieldValue }) => (
          <Form className={t.form}>
            <div className={t.fieldBox}>
              <Field name="title" className={t.input} placeholder="Title" />
              <ErrorMessage
                name="title"
                component="span"
                className={t.errorMessage}
              />
            </div>
            <div className={t.fieldBox}>
              <Field
                as="textarea"
                name="description"
                className={t.textarea}
                placeholder="Description"
              />
              <ErrorMessage
                name="description"
                component="span"
                className={t.errorMessage}
              />
            </div>
            <label className={s.label}>
              Label color
              <PriorityPicker
                selectedValue={values.priority}
                onChange={(value) => setFieldValue("priority", value)}
              />
            </label>
            <label className={clsx(s.label, s.labelDatePicker)}>
              Deadline
              <CustomDatePicker
                value={values.deadline}
                onChange={(date) => {
                  const nextDate = date?.toDate ? date.toDate() : date;
                  const validDate =
                    nextDate &&
                    dayjs(nextDate).isSameOrAfter(dayjs().startOf("day"))
                      ? nextDate
                      : null;
                  setFieldValue("deadline", validDate);
                }}
                disablePast
              />
            </label>

            <Button text="Edit" showIcon type="submit" isLoading={isLoading} />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditCard;
