"use client";

// Utilities
import * as Yup from "yup";
import { FunctionComponent, useMemo, useState } from "react";

// Components
import { Formik } from "formik";
import Anchor from "@/components/anchor";
import Button from "@/components/button";
import FormikInput from "@/components/formik/input";
import FormikPassword from "@/components/formik/password";

// Hooks
import useSearch from "@/hooks/search";

// Store
import { useAuthStore } from "@/store/auth-store-provider";

type SearchParams = {
  redirectUrl: Nullable<string>;
};

type FormValues = {
  username: string;
  password: string;
  lastName: string;
  firstName: string;
};

const initialValues: FormValues = {
  username: "",
  password: "",
  lastName: "",
  firstName: "",
};

const validationSchema = Yup.object().shape({
  password: Yup.string().required("Vui lòng nhập mật khẩu"),
  username: Yup.string().required("Vui lòng nhập tên tài khoản"),
});

type FormSignUpProps = {
  onSuccess?: (token: string) => void;
};

const FormSignUp: FunctionComponent<FormSignUpProps> = ({ onSuccess }) => {
  const [error, setError] = useState<Nullable<string>>();

  const authStore = useAuthStore((state) => state);
  const searchParams = useSearch<SearchParams>({ redirectUrl: null });

  const signInUrl = useMemo<string>(() => {
    if (!searchParams.redirectUrl) {
      return "/auth/sign-in";
    }
    return `/auth/sign-in?redirectUrl=${searchParams.redirectUrl}`;
  }, [searchParams.redirectUrl]);

  const handleLoginError = (error: unknown) => {
    setError("Đã có lỗi xảy ra");
  };

  const handleFormSubmit = async (values: FormValues) => {
    try {
      const accessToken = await authStore.signUp(values);

      !!onSuccess && onSuccess(accessToken);
    } catch (error) {
      handleLoginError(error);
    }
  };

  return (
    <Formik<FormValues>
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {(props) => (
        <form
          data-testid="form-signup"
          onSubmit={props.handleSubmit}
          className="flex w-full flex-1 flex-col gap-y-4"
        >
          {!!error && (
            <div
              data-testid="form-signup-error"
              className="p-4 bg-red-100 rounded-md text-red-600"
            >
              {error}
            </div>
          )}

          <div className="flex-1 w-full">
            <FormikInput
              name="username"
              label="Tên tài khoản"
              placeholder="Nhập tên tài khoản"
              data-testid="form-signup-username"
            />
          </div>

          <div className="flex flex-1 flex-wrap sm:flex-nowrap w-full gap-4">
            <div className="flex-1 basis-full sm:basis-1/2">
              <FormikInput
                name="lastName"
                label="Họ"
                placeholder="Nhập họ"
                data-testid="form-signup-last-name"
              />
            </div>

            <div className="flex-1 basis-full sm:basis-1/2">
              <FormikInput
                label="Tên"
                name="firstName"
                placeholder="Nhập tên"
                data-testid="form-signup-first-name"
              />
            </div>
          </div>

          <div className="flex-1 w-full">
            <FormikPassword
              name="password"
              label="Mật khẩu"
              placeholder="Nhập mật khẩu"
              data-testid="form-signup-password"
            />
          </div>

          <div className="flex-1 w-full">
            <Button
              type="submit"
              loading={props.isSubmitting}
              data-testid="form-signup-button"
            >
              Đăng ký
            </Button>
          </div>

          <div className="py-4">
            <p className="text-center">
              Đã có tài khoản?{" "}
              <Anchor
                replace
                scroll={false}
                href={signInUrl}
                data-testid="signin-link"
                className="!text-blue-400 hover:font-semibold"
              >
                Đăng nhập
              </Anchor>
            </p>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default FormSignUp;
