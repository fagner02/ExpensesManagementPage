import { TransactionModel } from "@/prisma/models";

const TransactionDetails = ({ item }: { item: Partial<TransactionModel> }) => {
    return (
        <div style={{ display: "contents" }}>
            <div className="detail-row">
                <p>Description: {item.description}</p>
            </div>
        </div>
    );
};

export default TransactionDetails;
