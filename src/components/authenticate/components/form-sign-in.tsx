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

// Types
import { AxiosError } from "axios";

type SearchParams = {
  redirectUrl: Nullable<string>;
};

type FormValues = {
  username: string;
  password: string;
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Vui lòng nhập tài khoản"),
  password: Yup.string().required("Vui lòng nhập mật khẩu"),
});

const initialValues = {
  username: "",
  password: "",
};

type FormSignInProps = {
  onSuccess?: (token: string) => void;
};

const FormSignIn: FunctionComponent<FormSignInProps> = ({ onSuccess }) => {
  const [error, setError] = useState<Nullable<string>>();

  const authStore = useAuthStore((state) => state);
  const searchParams = useSearch<SearchParams>({ redirectUrl: null });

  const signUpUrl = useMemo<string>(() => {
    if (!searchParams.redirectUrl) {
      return "/auth/sign-up";
    }
    return `/auth/sign-up?redirectUrl=${searchParams.redirectUrl}`;
  }, [searchParams]);

  const handleLoginError = (error: unknown | AxiosError) => {
    if (error instanceof AxiosError && error.response?.status === 400) {
      setError("Tài khoản hoặc mật khẩu không chính xác");
      return;
    }

    setError("Đã có lỗi xảy ra");
  };

  const handleFormSubmit = async (values: FormValues) => {
    try {
      setError(null);
      const accessToken = await authStore.login(values);

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
          data-testid="form-signin"
          onSubmit={props.handleSubmit}
          className="flex w-full flex-1 flex-col gap-y-3"
        >
          {!!error && (
            <div
              data-testid="form-signin-error"
              className="p-4 bg-red-100 rounded-md text-red-600"
            >
              {error}
            </div>
          )}

          <div className="flex-1 w-full mb-3">
            <FormikInput
              name="username"
              label="Tài khoản"
              placeholder="Nhập tài khoản"
              data-testid="form-signin-username"
            />
          </div>

          <div className="flex-1 w-full mb-3">
            <FormikPassword
              name="password"
              label="Mật khẩu"
              placeholder="Nhập mật khẩu"
              data-testid="form-signin-password"
            />
          </div>

          <div className="flex-1 w-full">
            <Button
              type="submit"
              loading={props.isSubmitting}
              data-testid="form-signin-button"
            >
              Đăng nhập
            </Button>
          </div>

          <div className="py-4">
            <p className="text-center">
              Chưa có tài khoản?{" "}
              <Anchor
                replace
                scroll={false}
                href={signUpUrl}
                data-testid="signup-link"
                className="!text-blue-400 hover:font-semibold"
              >
                Đăng ký
              </Anchor>
            </p>
          </div>
        </form>
      )}
    </Formik>
  );
};

FormSignIn.displayName = "LoginForm";

export default FormSignIn;
