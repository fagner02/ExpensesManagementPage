import React, { useEffect, useRef, useState } from "react";
import CheckIcon from "@/icons/CheckIcon";
import TrashIcon from "@/icons/TrashIcon";
import EditIcon from "@/icons/EditIcon";
import EditModel from "./EditDialog";
import DeleteDialog from "./DeleteDialog";
import { ItemRowProvider } from "./ItemRowContext";
import { getPersonEditModel, personModel } from "@/store/personModel";

const ItemRow = ({
    item,
    properties,
    details,
    editForm,
    deleteCallback,
    updateCallback,
}: {
    item: unknown & { id?: string };
    properties: React.ReactNode;
    details: React.ReactNode;
    editForm: React.ReactNode;
    deleteCallback: () => void;
    updateCallback: () => void;
}) => {
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [detailsHeight, setDetailsHeight] = useState(0);
    const detailsContainer = useRef<HTMLDivElement>(null);
    const rowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setDetailsHeight(detailsContainer.current?.scrollHeight ?? 0);
    }, []);

    return (
        <ItemRowProvider
            deleteCallback={deleteCallback}
            updateCallback={updateCallback}
        >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div ref={rowRef} className="row">
                    {/* ITEM ROW CONTENT ------------------------------*/}
                    <div
                        style={{
                            gridArea: "unit",
                            zIndex: 1,
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                cursor: "pointer",
                                transition: "all 0.4s ease",
                            }}
                            /*TOGGLE DETAIL VIEW -------------------------------------*/
                            onClick={() => {
                                setShowDetails(!showDetails);
                            }}
                        >
                            {/*ITEM ROW INNER CONTENT --------------------------------*/}
                            <div
                                style={{
                                    display: "flex",
                                    width: "100%",
                                }}
                            >
                                <p className="cell title-label">
                                    ID:
                                    {item.id}
                                </p>
                                <div className="row-right">{properties}</div>
                            </div>
                            {/*ITEM ROW CONTROLS --------------------------------------*/}
                            <div className="item-controls">
                                <div
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowDelete(true);
                                    }}
                                >
                                    <TrashIcon size="15" color="white" />
                                </div>
                                <hr></hr>
                                <div
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        console.log(Object.keys(personModel));
                                        Object.assign(
                                            getPersonEditModel(item.id!).model,
                                            Object.fromEntries(
                                                Object.entries(item).filter(
                                                    (x) =>
                                                        Object.keys(
                                                            personModel,
                                                        ).includes(x[0]),
                                                ),
                                            ),
                                        );
                                        setShowEdit(true);
                                    }}
                                >
                                    <EditIcon size="15" color="white" />
                                </div>
                            </div>
                        </div>
                        {/* ITEM DETAILS CONTAINER --------------------------------- */}
                        <div
                            ref={detailsContainer}
                            style={{
                                padding: showDetails ? "10px" : "0px",
                                height: showDetails
                                    ? `${detailsHeight}px`
                                    : "0px",
                                opacity: showDetails ? "1" : "0",
                                overflow: "hidden",
                                transition: "all 0.4s ease",
                            }}
                        >
                            {details}
                        </div>
                    </div>
                    {/*DELETE OPTIONS --------------------------------------*/}
                    <DeleteDialog
                        rowRef={rowRef}
                        show={showDelete}
                        closeDelete={() => {
                            setShowDelete(false);
                        }}
                        deleteCallback={deleteCallback}
                    ></DeleteDialog>
                    {/*EDIT ITEM CONTAINER --------------------------------- */}
                    <EditModel
                        rowRef={rowRef}
                        show={showEdit}
                        closeEdit={() => {
                            setShowEdit(false);
                        }}
                    >
                        {editForm}
                    </EditModel>
                </div>
                <div className="checkbox"></div>
            </div>
        </ItemRowProvider>
    );
};

export default ItemRow;
