import { getPersonEditModel } from "@/lib/store/personModel";

const PersonEdit = (props: { id: string }) => {
    const model = getPersonEditModel(props.id).useModel();

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
                    style={{ width: "100%" }}
                    value={model.name}
                    onChange={(e) => {
                        model.name = e.target.value;
                    }}
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
                    style={{ width: "100%" }}
                    value={model.age}
                    onChange={(e) => (model.age = parseInt(e.target.value))}
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
                    style={{ width: "100%" }}
                    value={model.phone ?? ""}
                    onChange={(e) => (model.name = e.target.value)}
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
                    style={{ width: "100%" }}
                    value={model.email ?? ""}
                    onChange={(e) => (model.email = e.target.value)}
                />
            </div>
        </div>
    );
};
export default PersonEdit;
