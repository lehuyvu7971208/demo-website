import { FunctionComponent } from "react";

type PostPlaceholderProps = {};

const PostPlaceholder: FunctionComponent<PostPlaceholderProps> = () => {
  return (
    <div className="flex flex-col gap-y-3">
      <div className="p-4 bg-white rounded-md">
        <div className="max-w-lg mx-auto animate-pulse">
          <div
            style={{ paddingTop: "100%" }}
            className={`w-full mb-4 max-w-lg max-h-lg bg-slate-200 rounded-md`}
          ></div>

          <h3 className={`w-3/4 h-7 mb-2 bg-slate-200 rounded-md`}></h3>

          <div className={`h-4 mb-1 bg-slate-200 rounded-md`}></div>
          <div className={`h-4 mb-1 bg-slate-200 rounded-md`}></div>
          <div className={`h-4 mb-4 w-3/4 bg-slate-200 rounded-md`}></div>

          <div className={`h-4 mb-4 bg-slate-200 rounded-md`}></div>

          <div className={`h-4 mb-4 bg-slate-200 rounded-md`}></div>
        </div>
      </div>

      <div className={`p-4 bg-white rounded-md`}>
        <div className="flex flex-col max-w-lg mx-auto gap-y-4  animate-pulse">
          <h3 className={`w-1/5 h-7 bg-slate-200 rounded-md`}></h3>

          <div className={`flex flex-col gap-y-5`}>
            <div className={`flex flex-col gap-y-2`}>
              <div className={`h-4 w-1/3 bg-slate-200 rounded-md`}></div>

              <div>
                <div className={`h-4 mb-1 bg-slate-200 rounded-md`}></div>
                <div className={`h-4 mb-1 bg-slate-200 rounded-md`}></div>
                <div className={`h-4 mb-1 w-3/4 bg-slate-200 rounded-md`}></div>
              </div>
            </div>

            <div className={`flex flex-col gap-y-2`}>
              <div className={`h-4 w-1/3 bg-slate-200 rounded-md`}></div>

              <div>
                <div className={`h-4 mb-1 bg-slate-200 rounded-md`}></div>
                <div className={`h-4 mb-1 bg-slate-200 rounded-md`}></div>
                <div className={`h-4 mb-1 w-3/4 bg-slate-200 rounded-md`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPlaceholder;
