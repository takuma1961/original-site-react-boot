import { VFC } from "react";

import Desktop from "@mui/icons-material/DesktopMac";

import { SBaseIcon } from "./SBaseIcon";

export const DesktopIcon = (props) => {
  const { url } = props;
  return (
    <SBaseIcon>
      <Desktop onClick={() => window.open(url)} />
    </SBaseIcon>
  );
};
