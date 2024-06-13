"use client";

// Uititlies
import * as Yup from "yup";
import { FunctionComponent, useState } from "react";

// Components
import Image from "next/image";
import Button from "@/components/button";
import { Formik, FormikHelpers } from "formik";
import FormikTextarea from "@/components/formik/textarea";

// Hooks
import useAddComment from "@/hooks/comment/add-comment";

// Store
import { useAppStore } from "@/store/app-store-provider";

// Types
import { AddCommentResponse } from "@/api/comment";

type FormValues = {
  body: string;
};

const initialValues: FormValues = {
  body: "",
};

const validationSchema = Yup.object().shape({
  body: Yup.string().required("Bạn chưa nhập nội dung bình luận."),
});

type PostCommentEditorProps = {
  postId: number;
  onSuccess?: (comment: AddCommentResponse) => void;
};

const PostCommentEditor: FunctionComponent<PostCommentEditorProps> = ({
  postId,
  onSuccess,
}) => {
  const me = useAppStore((state) => state.me);
  const [error, setError] = useState<Nullable<string>>();

  const [isDetailShown, setDetailShow] = useState<boolean>(false);

  const { mutate: addComment, isPending } = useAddComment({
    onSuccess: (response) => {
      !!onSuccess && onSuccess(response.data);
    },
    onError: () => {
      setError("Đã có lỗi xảy ra! Vui lòng thử lại");
    },
  });

  const handleTextAreaFocus = () => {
    setDetailShow(true);
  };

  if (!me) return null;

  const handleFormSubmit = async (
    values: FormValues,
    helper: FormikHelpers<FormValues>
  ) => {
    setError(null);

    addComment({
      postId,
      userId: me?.id,
      body: values.body,
    });

    helper.resetForm();

    return;
  };

  return (
    <div>
      <Formik<FormValues>
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {(formProps) => (
          <form
            onSubmit={formProps.handleSubmit}
            className={`flex flex-col gap-y-3`}
          >
            {!!error && (
              <div className="p-4 bg-red-100 rounded-md text-red-600">
                {error}
              </div>
            )}

            <FormikTextarea
              name={"body"}
              rows={isDetailShown ? 4 : 1}
              placeholder="Chia sẻ ý kiến của bạn"
              onFocus={handleTextAreaFocus}
            />

            {isDetailShown && (
              <div className={`flex flex-row items-center justify-end gap-x-4`}>
                <div
                  className={`flex flex-row items-center gap-x-4 font-semibold`}
                >
                  <Image
                    width={30}
                    height={30}
                    alt="Demo Website"
                    src={"/images/avatar.png"}
                  />
                  {me.firstName} {me.lastName}
                </div>

                <Button
                  type="submit"
                  loading={isPending}
                  className="!w-auto px-7"
                >
                  Bình luận
                </Button>
              </div>
            )}
          </form>
        )}
      </Formik>
    </div>
  );
};

export default PostCommentEditor;
