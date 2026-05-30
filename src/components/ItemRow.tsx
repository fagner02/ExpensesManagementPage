import React, { useRef, useState } from "react";
import TrashIcon from "@/components/icons/TrashIcon";
import EditIcon from "@/components/icons/EditIcon";
import EditModel from "./EditDialog";
import DeleteDialog from "./DeleteDialog";
import { ItemRowProvider } from "./ItemRowContext";
import { getPersonEditModel, personModel } from "@/lib/store/personModel";
import { useHeight } from "@/lib/store/store";

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

    const detailsContainer = useRef<HTMLDivElement>(null);
    const rowRef = useRef<HTMLDivElement>(null);
    const detailsHeight = useHeight(
        () => detailsContainer.current?.scrollHeight ?? 0,
    );

    return (
        <ItemRowProvider
            deleteCallback={deleteCallback}
            updateCallback={updateCallback}
        >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div className="row">
                    {/* ITEM ROW CONTENT ------------------------------*/}
                    <div
                        ref={rowRef}
                        style={{
                            gridArea: "unit",
                            zIndex: 1,
                            height: "fit-content",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                cursor: "pointer",
                                transition: "all 0.4s ease",
                                flexWrap: "wrap-reverse",
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
                                <hr style={{ margin: "0" }}></hr>
                                <div
                                    onClick={(e) => {
                                        e.stopPropagation();
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
                            style={{
                                height: showDetails
                                    ? `${detailsHeight.value}px`
                                    : "0px",
                                opacity: showDetails ? "1" : "0",
                                overflow: "hidden",
                                transition: "all 0.4s ease",
                            }}
                        >
                            <div
                                ref={detailsContainer}
                                style={{
                                    padding: "10px",
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "10px",
                                }}
                            >
                                {details}
                            </div>
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
