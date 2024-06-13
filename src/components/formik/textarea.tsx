"use client";

// Utilities
import { Field } from "formik";
import { forwardRef } from "react";
import FormTextarea, { FormTextareaProps } from "../form/textarea";

const FormikTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (props, ref) => {
    return (
      <Field name={props.name}>
        {({ field, form: { touched, errors, isSubmitting } }: any) => (
          <FormTextarea
            ref={ref}
            {...field}
            {...props}
            disabled={isSubmitting}
            error={touched[field.name] && errors[field.name]}
          />
        )}
      </Field>
    );
  }
);

FormikTextarea.displayName = "FormikTextarea";

export default FormikTextarea;
