import { usePersonModel } from "@/lib/store/personModel";

const PersonAdd = () => {
    const model = usePersonModel();

    return (
        <div style={{ display: "contents" }}>
            <div style={{ display: "flex", gap: "10px" }}>
                <p className="cell title-label input-label">Age</p>
                <input
                    type="number"
                    name="age"
                    value={model.age}
                    onChange={(e) => {
                        model.age = parseInt(e.target.value);
                    }}
                />
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
                <p className="cell title-label input-label">Name</p>
                <input
                    type="text"
                    name="name"
                    value={model.name}
                    onChange={(e) => {
                        model.name = e.target.value;
                    }}
                />
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
                <p className="cell title-label input-label">Phone</p>
                <input
                    type="number"
                    name="phone"
                    value={model.phone ?? ""}
                    onChange={(e) => {
                        model.phone = e.target.value;
                    }}
                />
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
                <p className="cell title-label input-label">Email</p>
                <input
                    type="text"
                    name="email"
                    value={model.email ?? ""}
                    onChange={(e) => {
                        model.email = e.target.value;
                    }}
                />
            </div>
        </div>
    );
};

export default PersonAdd;
