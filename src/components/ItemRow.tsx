import React, { useEffect, useRef, useState } from "react";
import CheckIcon from "@/icons/CheckIcon";
import TrashIcon from "@/icons/TrashIcon";
import EditIcon from "@/icons/EditIcon";
import EditModel from "./EditDialog";
import DeleteDialog from "./DeleteDialog";

const ItemRow = ({
    id,
    properties,
    details,
    editForm: editForm,
    ...props
}: {
    id: string;
    properties: React.ReactNode;
    details: React.ReactNode;
    editForm: React.ReactNode;
    toggleDetails: (id: string) => void;
    checkBox: (id: string) => void;
    closeDelete: (id: string) => void;
    openEdit: (id: string) => void;
    openDelete: (id: string) => void;
    delete: (id: string) => void;
    selected: boolean;
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
                                {id}
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
                            height: showDetails ? `${detailsHeight}px` : "0px",
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
                    deleteCallback={() => {}}
                ></DeleteDialog>
                {/*EDIT ITEM CONTAINER --------------------------------- */}
                <EditModel
                    rowRef={rowRef}
                    show={showEdit}
                    closeEdit={() => {
                        setShowEdit(false);
                    }}
                    save={() => {}}
                >
                    {editForm}
                </EditModel>
            </div>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    props.checkBox(id);
                }}
                className="checkbox"
            >
                <CheckIcon size="18px" stroke="black"></CheckIcon>
            </button>
        </div>
    );
};

export default ItemRow;
