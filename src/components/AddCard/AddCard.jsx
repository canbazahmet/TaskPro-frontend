import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import dayjs from "dayjs";
import clsx from "clsx";

import Button from "../Button/Button.jsx";
import CustomDatePicker from "../CustomDatePicker/CustomDatePicker.jsx";
import PriorityPicker from "../PriorityPicker/PriorityPicker.jsx";

import { addCardSchema } from "../../helpers/addCardSchema.js";
import { addTask } from "../../redux/tasks/tasksOperations.js";
import { selectIsLoading } from "../../redux/tasks/tasksSelectors.js";

import s from "./AddCard.module.css";
import t from "../../styles/Forms.module.css";

const AddCard = ({ boardId, columnId, onSuccess }) => {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectIsLoading);

  const initialValues = {
    title: "",
    description: "",
    priority: "Without",
    deadline: null,
  };

  const handleSubmit = useCallback(
    async (values, actions) => {
      if (!boardId || !columnId) {
        actions.setSubmitting(false);
        return;
      }

      const task = {
        title: values.title,
        description: values.description,
        priority: values.priority,
        columnId,
        boardId,
      };

      if (values.deadline) {
        task.deadline = dayjs(values.deadline).toISOString();
      }

      try {
        await dispatch(addTask(task)).unwrap();
        actions.resetForm();
        if (onSuccess) onSuccess();
      } finally {
        actions.setSubmitting(false);
      }
    },
    [boardId, columnId, dispatch, onSuccess],
  );

  return (
    <div className={s.wrapper}>
      <h3 className={s.title}>Add card</h3>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={addCardSchema}
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
                  setFieldValue("deadline", nextDate || null);
                }}
                disablePast
              />
            </label>

            <Button text="Add" showIcon type="submit" isLoading={isLoading} />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddCard;
