"use client";

import { Field } from "formik";
import { InputHTMLAttributes, forwardRef } from "react";
import FormInput, { FormInputProps } from "../form/input";

const FormikInput = forwardRef<
  HTMLInputElement,
  FormInputProps & InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return (
    <Field name={props.name}>
      {({ field, form: { touched, errors, isSubmitting } }: any) => (
        <FormInput
          ref={ref}
          {...field}
          {...props}
          disabled={isSubmitting}
          error={touched[field.name] && errors[field.name]}
        />
      )}
    </Field>
  );

  // return ;
});

FormikInput.displayName = "FormikInput";

export default FormikInput;
