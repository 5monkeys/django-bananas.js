import React from "react";
import { PurchaseDetail } from "../../types/purchase";
import { ReceiptCard } from "../../components/ReceiptCard";
import Content from "../../../../containers/Content";

interface PurchaseDetailPageProps {
  data: PurchaseDetail;
}

const PurchaseDetailPage: React.FC<PurchaseDetailPageProps> = (
  { data },
) => {
  return (
    <>
      <Content>
        {data?.receipts.map((receipt, i) => (
          <ReceiptCard key={i} receipt={receipt} />
        ))}
      </Content>
    </>
  );
};

export default PurchaseDetailPage;
