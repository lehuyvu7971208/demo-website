import { Field } from "formik";
import { InputHTMLAttributes, forwardRef } from "react";
import FormPassword, { FormPasswordProps } from "../form/password";

const FormikPassword = forwardRef<
  HTMLInputElement,
  FormPasswordProps & InputHTMLAttributes<HTMLInputElement>
>(function (props, ref) {
  return (
    <Field name={props.name}>
      {({ field, form: { touched, errors, isSubmitting } }: any) => (
        <FormPassword
          ref={ref}
          {...field}
          {...props}
          disabled={isSubmitting}
          error={touched[field.name] && errors[field.name]}
        />
      )}
    </Field>
  );
});

FormikPassword.displayName = "FormikPassword";

export default FormikPassword;
