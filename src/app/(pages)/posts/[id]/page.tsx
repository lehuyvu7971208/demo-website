// Utilities
import httpServer from "@/utils/http/server";

// Components
import PostDetail from "./_components/post-detail";
import PostComments from "./_components/post-comments";

// Apis
import postApi from "@/api/post";
import { cookies } from "next/headers";

type PageDetailPageProps = {
  params: { id: number };
};

const getSinglePost = async (id: number) => {
  if (!cookies().get("accessToken")?.value) {
    return null;
  }

  const response = await postApi(httpServer).getSinglePost(id);
  return response.data;
};

export async function generateMetadata({ params }: PageDetailPageProps) {
  const response = await postApi(httpServer).getSinglePost(params.id);

  return {
    title: `Demo Website - ${response.data.title}`,
  };
}

export default async function PostDetailPage({ params }: PageDetailPageProps) {
  const post = await getSinglePost(params.id);

  return (
    <div className="flex flex-col gap-y-3 ">
      <PostDetail post={post} />

      {params.id && <PostComments postId={params.id} />}
    </div>
  );
}
