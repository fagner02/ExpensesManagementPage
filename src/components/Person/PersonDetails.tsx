const PersonDetails = ({
    item,
}: {
    item: unknown & { revenue?: number; expense?: number; balance?: number };
}) => {
    return (
        <div style={{ display: "contents" }}>
            <div className="detail-row">
                <p>Revenue: {item.revenue}</p>
            </div>
            <div className="detail-row">
                <p>Expenses: {item.expense}</p>
            </div>
            <div className="detail-row">
                <p>Balance: {item.balance}</p>
            </div>
        </div>
    );
};

export default PersonDetails;
