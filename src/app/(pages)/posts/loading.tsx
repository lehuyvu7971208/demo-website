import SinglePostPlaceholder from "./_components/single-post-placeholder";

export default function PostsLoading() {
  const posts = [...Array(10)];

  return (
    <div>
      <div className={`flex flex-col gap-y-4`}>
        <div className="flex flex-row items-center">
          <div className="ml-auto" data-testid="sort-posts">
            <div className={`h-[44px] w-[100px] bg-slate-200 rounded-md`}></div>
          </div>
        </div>

        <div
          className={`
            flex flex-row flex-wrap 
            m-[-0.5rem] items-stretch justify-stretch
          `}
        >
          {posts.map((item, index) => (
            <div
              key={`single_post_${index}`}
              className={`
                flex-0 w-full p-2 
                sm:w-1/2 lg:w-1/4 xl:w-1/5
              `}
            >
              <SinglePostPlaceholder />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
