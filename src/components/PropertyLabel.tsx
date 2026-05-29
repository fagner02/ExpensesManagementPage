const PropertyLabel = ({ name, value }: { name: string; value: string }) => {
    return (
        <div className="property">
            <h6>{name}:</h6>
            <p> {value}</p>
        </div>
    );
};

export default PropertyLabel;
