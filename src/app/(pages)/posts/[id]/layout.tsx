"use client";

// Utilities
import { FunctionComponent, PropsWithChildren } from "react";

// Components
import Authenticate from "@/components/authenticate";
import PostPlaceholder from "./_components/post-placeholder";

type PostDetailLayoutProps = PropsWithChildren;

const PostDetailLayout: FunctionComponent<PostDetailLayoutProps> = ({
  children,
}) => {
  return (
    <div className="max-w-3xl mx-auto">
      <Authenticate
        persistence
        unauthenticateRender={() => <PostPlaceholder />}
      >
        {children}
      </Authenticate>
    </div>
  );
};

export default PostDetailLayout;
