"use client";

// Utilities
import classNames from "classnames";
import { useMemo, MouseEvent, forwardRef, HTMLAttributes } from "react";

// Components
import Button from "@/components/button";
import Dropdown from "@/components/dropdown";
import Authenticate from "@/components/authenticate";
import {
  ArrowLeftStartOnRectangleIcon,
  ChevronUpDownIcon,
  UserIcon,
} from "@heroicons/react/16/solid";

// Store
import { useAppStore } from "@/store/app-store-provider";

type ProfileSummaryProps = HTMLAttributes<HTMLAnchorElement>;

const ProfileSummary = forwardRef<HTMLAnchorElement, ProfileSummaryProps>(
  ({ className, ...props }, ref) => {
    const appStore = useAppStore((state) => state);

    const computedClassName = useMemo(() => {
      return classNames([
        className,
        `
          flex px-4 h-full items-center 
          gap-x-2 hover:cursor-pointer select-none
        `,
      ]);
    }, [className]);

    return (
      <a ref={ref} {...props} className={computedClassName}>
        <div className={"hidden sm:block"}>
          Hello
          <span className="inline-block ml-1 text-blue-400 font-medium ">
            {appStore.me?.firstName} {appStore.me?.lastName}
          </span>
          !
        </div>
        <div className={"block sm:hidden"}>
          <UserIcon className={"w-5"} />
        </div>
        <ChevronUpDownIcon className={`w-4`} />
      </a>
    );
  }
);

ProfileSummary.displayName = "ProfileSummary";

type ProfileActionsProps = HTMLAttributes<HTMLUListElement> & {
  onSignOut: (event: MouseEvent<HTMLAnchorElement>) => void;
};

const ProfileActions = forwardRef<HTMLUListElement, ProfileActionsProps>(
  ({ className, onSignOut, ...props }, ref) => {
    const me = useAppStore((state) => state.me);

    const computedClassName = useMemo(() => {
      return classNames([
        className,
        `
          flex flex-col bg-white w-60 
          rounded-md overflow-hidden shadow-md
        `,
      ]);
    }, [className]);

    return (
      <ul ref={ref} className={computedClassName}>
        <li className="sm:hidden">
          <div className={"p-4"}>
            Hello{" "}
            <span className="font-semibold text-blue-400">
              {me?.firstName} {me?.lastName}
            </span>{" "}
          </div>
        </li>

        <li>
          <a
            href="#"
            className={`
              block p-4 transition-all ease-linear 
            hover:bg-blue-400 hover:text-white
            `}
            onClick={onSignOut}
          >
            Đăng xuất
          </a>
        </li>
      </ul>
    );
  }
);

ProfileActions.displayName = "ProfileActions";

type ProfileProps = {} & HTMLAttributes<HTMLDivElement>;

const Profile = forwardRef<HTMLDivElement, ProfileProps>(
  ({ className }, ref) => {
    const appStore = useAppStore((state) => state);

    const computedClassName = useMemo(() => {
      return classNames([className, `flex items-center`]);
    }, [className]);

    const handleSignOutClick = (
      toggle: () => void,
      event: MouseEvent<HTMLAnchorElement>
    ) => {
      toggle();
      event.preventDefault();

      appStore.close();
    };

    return (
      <div ref={ref} className={computedClassName}>
        <Authenticate
          unauthenticateRender={({ login }) => (
            <div className={`px-4`}>
              <Button className="!rounded-full px-5 " onClick={login}>
                <span className="hidden sm:inline-block">Đăng nhập</span>
                <ArrowLeftStartOnRectangleIcon className={`sm:hidden w-5`} />
              </Button>
            </div>
          )}
        >
          <Dropdown
            className={"h-full"}
            toggle={({ toggle }) => <ProfileSummary onClick={toggle} />}
            menu={({ toggle }) => (
              <ProfileActions
                onSignOut={(event) => handleSignOutClick(toggle, event)}
              />
            )}
          />
        </Authenticate>
      </div>
    );
  }
);

Profile.displayName = "Profile";

export default Profile;
