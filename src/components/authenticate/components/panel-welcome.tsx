"use client";

// Utilities
import { FunctionComponent } from "react";

// Components
import Image from "next/image";

type PanelWelcomeProps = {};

const PanelWelcome: FunctionComponent<PanelWelcomeProps> = () => (
  <div className="flex flex-row gap-x-3">
    <Image
      width="50"
      height="50"
      alt="Simple chat"
      src="/images/logo.png"
      className="object-center object-cover"
    />

    <div className="flex-1">
      <h3 className="text-base text-blue-400 font-medium">Demo Website</h3>
      <p className="text-xs">Chào mừng đến với Demo Website</p>
    </div>
  </div>
);

export default PanelWelcome;
