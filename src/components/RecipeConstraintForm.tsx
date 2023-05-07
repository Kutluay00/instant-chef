import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

export const RecipeConstraintForm: React.FC<{ onSubmit: (values: { constraint: string }) => void, className?: string }> = ({ onSubmit, className }) => {

  return (
    <Formik
      initialValues={{ constraint: '' }}
      onSubmit={(values, formik) => {
        onSubmit(values);
        formik.resetForm();
      }}
      validationSchema={Yup.object({
        constraint: Yup.string()
          .min(3, 'Constraint must be at least 3 characters')
          .max(32, 'Constraint must be at most 32 characters'),
      })}
    >
      {({ errors, touched }) => (
        <Form className={className}>
          <div className="w-full flex gap-2">
          <Field type="text" name="constraint" placeholder="Enter a constraint" className="flex-1 p-2"/>
          <button type="submit" className='bg-white p-2'>Add</button>
          </div>
          {errors.constraint && touched.constraint ? (
            <div>{errors.constraint}</div>
          ) : null}
        </Form>
      )}
    </Formik>
  );
};