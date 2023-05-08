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
          <label htmlFor="constraint" className="block text-gray-800 italic font-medium mb-2">Add Constraint:</label>
          <div className="w-full flex gap-2">
            <Field type="text" name="constraint" placeholder="Enter a constraint" className="flex-1 bg-white text-gray-800 border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <button type="submit" className='bg-gray-600 text-white px-4 py-2 rounded transition duration-200 border border-transparent hover:bg-gray-700 hover:border hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 font-semibold'>Add</button>
          </div>
          {errors.constraint && touched.constraint ? (
            <div className='text-white text-sm mt-2 bg-red-600 rounded px-4 py-2'>{errors.constraint}</div>
          ) : null}
        </Form>
      )}
    </Formik>
  );
};