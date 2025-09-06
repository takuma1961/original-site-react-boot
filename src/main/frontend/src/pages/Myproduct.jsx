import React from "react";

import { productItems } from "assets/data/productItems";//作成済み20250905
import { PageTitle } from "components/atoms/PageTitle";//作成済み20250905
import { CardList } from "components/organisms/CardList";//作成済み20250905
import Header from "../components/PortfolioHeader.jsx";

const MyProduct = () => {
  return (
    <>
    <Header />
      <PageTitle>PRODUCT</PageTitle>
      <CardList
        cardList={productItems}
        isSkillLevel={false}
        isUsedTech={true}
        isIcon={true}
        flexwrap="wrap-reverse"
        titleTechImg="使用した技術"
      />
    </>
  );
};
export default MyProduct;
