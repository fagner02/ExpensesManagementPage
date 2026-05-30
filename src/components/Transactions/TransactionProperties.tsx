import { TransactionModel } from "@/prisma/models";

const TransactionProperties = ({
    item,
}: {
    item: Partial<TransactionModel>;
}) => {
    return (
        <div style={{ display: "contents" }}>
            <div className="row-right">
                <div className="property">
                    <h6>Type:</h6>
                    <p> {item.transactionType}</p>
                </div>
                <div className="property">
                    <h6>Value:</h6>
                    <p> {item.value}</p>
                </div>
                <div className="property">
                    <h6>PersonId:</h6>
                    <p> {item.personId}</p>
                </div>
            </div>
        </div>
    );
};

export default TransactionProperties;
