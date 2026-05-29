import { PersonModel } from "@/prisma/models";

const PersonProperties = ({ item }: { item: Partial<PersonModel> }) => {
    return (
        <div style={{ display: "contents" }}>
            <div className="property">
                <h6>Name:</h6>
                <p> {item.name}</p>
            </div>
            <div className="property">
                <h6>Age:</h6>
                <p> {item.age}</p>
            </div>
            <div className="property">
                <h6>Phone:</h6>
                <p> {item.phone ?? "-"}</p>
            </div>
            <div className="property">
                <h6>Email:</h6>
                <p> {item.email ?? "-"}</p>
            </div>
        </div>
    );
};
export default PersonProperties;
