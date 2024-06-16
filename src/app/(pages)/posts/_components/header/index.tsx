// Utilities
import { FunctionComponent } from "react";

// Components
import Link from "next/link";
import Profile from "./_components/profile";
import SearchBar from "./_components/search-bar";
import { HomeIcon } from "@heroicons/react/16/solid";

type HeaderProps = {};

const Header: FunctionComponent<HeaderProps> = () => {
  return (
    <div
      className={`
        bg-white rounded-md shadow-sm
        flex flex-row flex-nowrap sm:gap-x-5 items-stretch
      `}
    >
      <div
        className={`p-4 flex flex-1 flex-row flex-nowrap items-center gap-x-5`}
      >
        <Link
          href="/"
          className="flex-0 w-6 hover:text-blue-400"
          data-testid="header-link-homepage"
        >
          <HomeIcon />
        </Link>

        <SearchBar className="flex-1 max-w-lg" data-testid="header-searchbar" />
      </div>

      <Profile className="flex-0 ml-auto" data-testid="header-profile" />
    </div>
  );
};

export default Header;
