import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

export const RecipeConstraintForm = () => {
  const [constraints, setConstraints] = useState<string[]>([]);

  return (
    <Formik
      initialValues={{ constraint: '' }}
      onSubmit={(values) => {
        setConstraints((prevConstraints) => ([...prevConstraints, values.constraint]))
      }}
      validationSchema={Yup.object({
        constraint: Yup.string()
          .required('This field is required')
          .min(3, 'Constraint must be at least 3 characters')
          .max(32, 'Constraint must be at most 32 characters'),
      })}
    >
      {({ errors, touched }) => (
        <Form>
          <Field type="text" name="constraint" />
          {errors.constraint && touched.constraint ? (
            <div className="error-message">{errors.constraint}</div>
          ) : null}
          <button type="submit" hidden>Submit</button>
        </Form>
      )}
    </Formik>
  );
};