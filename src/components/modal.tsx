// import { XMarkIcon } from "@heroicons/react/16/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FunctionComponent, MouseEvent, PropsWithChildren } from "react";

export type ModalProps = {
  open?: boolean;
  title?: string;
  persistence?: boolean;

  onClose?: () => void;
} & PropsWithChildren;

const Modal: FunctionComponent<ModalProps> = ({
  open,
  title,
  children,
  persistence,
  onClose,
}) => {
  const handleCloseClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    !!onClose && onClose();
  };

  return (
    open && (
      <div
        className={`
        fixed z-50 left-0 top-0 w-screen h-screen
        after:block after:absoluted after:content-[''] after:top-0 
        after:left-0 after:w-full after:h-full after:bg-gray-400 after:opacity-30
      `}
      >
        <div
          className={`
          flex flex-col gap-y-4 shadow-md
          w-full max-w-[320px] bg-white absolute z-50 top-10 
          left-1/2 origin-center translate-x-[-50%] p-4 rounded-md
        `}
        >
          <div className={`flex items-center`}>
            <div className={`mr-auto text-md font-semibold`}>{title ?? ""}</div>

            {!persistence && (
              <a href="#" onClick={handleCloseClick}>
                <XMarkIcon className={`w-6`} />
              </a>
            )}
          </div>

          <div className={`flex-1 w-full`}>{children}</div>
        </div>
      </div>
    )
  );
};

export default Modal;
