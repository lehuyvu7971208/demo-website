// Utilities
import { Metadata } from "next";
import httpServer from "@/utils/http/server";

// Components
import AllPosts from "./_components/all-posts";

// Apis
import { getSkip } from "@/utils";
import { POST_PER_PAGE } from "@/constants";
import postApi, { GetAllPostsQuery, GetAllPostsResponse } from "@/api/post";

type HomePageProps = {
  searchParams?: {
    page?: number;
    order?: string;
    sortBy?: string;
    search?: string;
  };
};

export const metadata: Metadata = {
  title: "Demo App - Home page",
};

const getAllPosts = async (
  query?: GetAllPostsQuery
): Promise<GetAllPostsResponse> => {
  const response = await postApi(httpServer).getAllPost(query);

  return response.data;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const page = searchParams?.page ?? 1;
  const order = searchParams?.order ?? null;
  const sortBy = searchParams?.sortBy ?? null;
  const search = searchParams?.search ?? null;

  const data = await getAllPosts({
    order,
    sortBy,
    q: search,
    limit: POST_PER_PAGE,
    skip: getSkip(page, POST_PER_PAGE),
  });

  return (
    <div>
      <AllPosts data={data} />
    </div>
  );
}
