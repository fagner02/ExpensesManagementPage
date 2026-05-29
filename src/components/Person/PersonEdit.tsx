const PersonEdit = (props: { id: string }) => {
    return (
        <div style={{ display: "contents" }}>
            <div
                style={{
                    display: "flex",
                    gap: "10px",
                }}
            >
                <p className="cell title-label input-label">Name</p>
                <input
                    type="text"
                    id={"e-name" + props.id}
                    style={{ width: "100%" }}
                />
            </div>
            <div
                style={{
                    display: "flex",
                    gap: "10px",
                }}
            >
                <p className="cell title-label input-label">Age</p>
                <input
                    type="number"
                    id={"e-age" + props.id}
                    style={{ width: "100%" }}
                />
            </div>
            <div
                style={{
                    display: "flex",
                    gap: "10px",
                }}
            >
                <p className="cell title-label input-label">Phone</p>
                <input
                    type="number"
                    id={"e-phone" + props.id}
                    style={{ width: "100%" }}
                />
            </div>
            <div
                style={{
                    display: "flex",
                    gap: "10px",
                }}
            >
                <p className="cell title-label input-label">Email</p>
                <input
                    type="text"
                    id={"e-email" + props.id}
                    style={{ width: "100%" }}
                />
            </div>
        </div>
    );
};
export default PersonEdit;
