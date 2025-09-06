import Instagram from "@mui/icons-material/Instagram";
import { SBaseIcon } from "components/images/SBaseIcon";

const InstagramIcon = ({ url }) => {
  return (
    <SBaseIcon>
      <Instagram onClick={() => window.open(url)} />
    </SBaseIcon>
  );
};

export default InstagramIcon;
