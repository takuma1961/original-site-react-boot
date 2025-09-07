import { skillItems } from "assets/data/skillItems";
import { PageTitle } from "components/atoms/PageTitle";
import {CardList2} from "components/organisms/CardList2";
import Header from "../components/PortfolioHeader.jsx";

export const Skill = () => {
  return (
    <>
    <Header />
      <PageTitle>Skill</PageTitle>
      <CardList2
        cardList={skillItems}
        isSkillLevel={true}
        isUsedTech={false}
        isIcon={false}
        flexwrap="wrap"
      />
    </>
  );
};
export default Skill
