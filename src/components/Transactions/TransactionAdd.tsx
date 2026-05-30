import { useTransactionModel } from "@/lib/store/transactionModel";
import { TransactionType } from "@/prisma/enums";

const TransactionAdd = () => {
    const model = useTransactionModel();

    return (
        <div style={{ display: "contents" }}>
            <div style={{ display: "flex", gap: "10px" }}>
                <p className="cell title-label input-label">Type</p>
                <select
                    value={model.transactionType}
                    onChange={(e) => {
                        model.transactionType = e.target
                            .value as keyof typeof TransactionType;
                    }}
                >
                    <option value={""}>Select</option>
                    <option value={TransactionType.REVENUE}>Revenue</option>
                    <option value={TransactionType.EXPENSE}>Expense</option>
                </select>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
                <p className="cell title-label input-label">Value</p>
                <input
                    type="text"
                    name="value"
                    value={model.value}
                    onChange={(e) => {
                        model.value = parseFloat(e.target.value!);
                    }}
                />
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
                <p className="cell title-label input-label">Description</p>
                <input
                    type="text"
                    name="description"
                    value={model.description}
                    onChange={(e) => {
                        model.description = e.target.value;
                    }}
                />
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
                <p className="cell title-label input-label">PersonId</p>
                <input
                    type="number"
                    name="person-id"
                    value={model.personId}
                    onChange={(e) => {
                        model.personId = e.target.value!;
                    }}
                />
            </div>
        </div>
    );
};
export default TransactionAdd;
