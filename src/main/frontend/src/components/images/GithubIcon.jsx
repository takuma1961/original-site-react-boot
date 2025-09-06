import Github from "@mui/icons-material/GitHub";
import { SBaseIcon } from "components/images/SBaseIcon";

const GithubIcon = ({ url }) => {
  return (
    <SBaseIcon>
      <Github onClick={() => window.open(url)} />
    </SBaseIcon>
  );
};

export default GithubIcon;
