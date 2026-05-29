"use client";
import "@/app/global.css";
import { useEffect, useState } from "react";
import TransactionFetch from "@/services/TransactionService";
import RefreshIcon from "@/icons/RefreshIcon";
import PersonFetch from "@/services/PersonService";
import type { PersonModel, TransactionModel } from "@/prisma/models";
import { TransactionType } from "@/prisma/enums";

const TransactionPage = () => {
    const [transactions, setTransactions] = useState<
        Partial<TransactionModel>[]
    >([{ id: " - ", description: " - " }]);
    const [openedAdd, setOpenedAdd] = useState(false);
    const [model, setModel] = useState<Partial<TransactionModel>>({});
    const [openedDetails, setOpenedDetails] = useState<Map<string, number>>(
        new Map(),
    );

    const refresh = () => {
        TransactionFetch.getAll().then((res) => {
            setTransactions(res);
        });
    };

    useEffect(() => {
        refresh();
    }, []);

    const openAddTransaction = () => {
        setOpenedAdd(true);
    };

    const closeAddTransaction = () => {
        setOpenedAdd(false);
    };

    const toggleDetails = (id: string, elem: HTMLElement) => {
        setOpenedDetails((prev) => {
            const newSet = new Map(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.set(id, elem.scrollHeight);
            }
            return newSet;
        });
    };

    return (
        <div className="main-container">
            <h1>Hello</h1>
            <h3>This is the home page</h3>
            <div className="actions">
                <div
                    style={{
                        display: "flex",
                        marginTop: "2px",
                        alignItems: "center",
                    }}
                >
                    <button
                        style={{ display: "flex", height: "33px" }}
                        onClick={(e) => {
                            refresh();
                        }}
                    >
                        <RefreshIcon size="20px" color="white"></RefreshIcon>
                    </button>
                    <button
                        id="add-transaction"
                        style={{ margin: "0 10px" }}
                        onClick={() => openAddTransaction()}
                    >
                        Add Transaction
                    </button>
                </div>
            </div>
            <div
                className="container"
                style={{
                    transition: "all 0.3s ease-out",
                    opacity: openedAdd ? "0" : "1",
                    height: openedAdd ? "0" : "100%",
                }}
            >
                <div
                    style={{
                        transition: "all 0.4s ease",
                        opacity: "1",
                    }}
                >
                    {/* ITEM ROW ---------------------------------- */}
                    {transactions.map((item) => (
                        <div
                            className="row"
                            id={"row" + item.id}
                            key={item.id}
                            style={{
                                display: "grid",
                                height: "auto",
                                gridTemplate: "1fr / 1fr",
                            }}
                        >
                            {/* ITEM ROW CONTENT ------------------------------*/}
                            <div
                                id={"row-content" + item.id}
                                style={{
                                    zIndex: "1",
                                    display: "flex",
                                    cursor: "pointer",
                                    transition: "all 0.4s ease",
                                    overflow: "hidden",
                                    gridColumn: "1 / 1",
                                    gridRow: "1 / 1",
                                }}
                                /*TOGGLE DETAIL VIEW -------------------------------------*/
                                onClick={(e) => {
                                    toggleDetails(
                                        item.id!,
                                        e.target as HTMLElement,
                                    );
                                }}
                            >
                                {/*ITEM ROW INNER CONTENT --------------------------------*/}
                                <div style={{ display: "flex", width: "100%" }}>
                                    <p className="cell title-label">
                                        <span
                                            style={{
                                                background: "white-smoke",
                                            }}
                                        >
                                            ID:
                                        </span>{" "}
                                        {item.id}
                                    </p>
                                    <div className="row-right">
                                        <div className="property">
                                            <h6>Type:</h6>
                                            <p> {item.transactionType}</p>
                                        </div>
                                        <div className="property">
                                            <h6>Value:</h6>
                                            <p> {item.value}</p>
                                        </div>
                                        <div className="property">
                                            <h6>PersonId:</h6>
                                            <p> {item.personId}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* ITEM DETAILS CONTAINER --------------------------------- */}
                            <div>
                                <div
                                    id={item.id}
                                    style={{
                                        padding: openedDetails.has(item.id!)
                                            ? "10px"
                                            : "0px",
                                        height: openedDetails.has(item.id!)
                                            ? `${openedDetails.get(item.id!)}px`
                                            : "0px",
                                        opacity: openedDetails.has(item.id!)
                                            ? "1"
                                            : "0",
                                        overflow: "hidden",
                                        transition: "all 0.4s ease",
                                    }}
                                >
                                    <div
                                        style={{
                                            border: "1px solid black",
                                            borderRadius: "5px",
                                        }}
                                    >
                                        {/* DETAIL ROWS --------------------------------- */}
                                        <p>Description: {item.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* ADD ITEM CONTAINER ------------------------------------- */}
            <div
                className="container"
                style={{
                    display: "flex",
                    borderRadius: "10px",
                    flexGrow: openedAdd ? "1" : "0",
                    height: openedAdd ? "100%" : "0px",
                    opacity: openedAdd ? "1" : "0",
                    gap: "10px",
                    marginTop: openedAdd ? "0" : "-50px",
                    transition: "all 0.4s ease",
                }}
            >
                {/*INPUT ROW -----------------------------------------------*/}
                <div style={{ display: "flex", gap: "10px" }}>
                    <p className="cell title-label input-label">Type</p>
                    <select
                        id="select-type"
                        value={model.transactionType}
                        onChange={(e) =>
                            setModel((old) => {
                                return {
                                    ...old,
                                    transactionType: e.target
                                        .value! as keyof typeof TransactionType,
                                };
                            })
                        }
                    >
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
                            setModel((old) => {
                                return {
                                    ...old,
                                    value: parseFloat(e.target.value!),
                                };
                            });
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
                            setModel((old) => {
                                return { ...old, description: e.target.value };
                            });
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
                            setModel((old) => {
                                return { ...old, personId: e.target.value! };
                            });
                        }}
                    />
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "10px",
                    }}
                >
                    <button
                        onClick={() => {
                            closeAddTransaction();
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={async () => {
                            if (
                                model.value === undefined ||
                                model.personId === undefined
                            )
                                return;

                            var person = (await PersonFetch.getById(
                                model.personId,
                            )) as PersonModel;

                            if (person === null) {
                                window.alert(
                                    "Person not found for id: " +
                                        model.personId,
                                );
                                return;
                            }

                            if (
                                person.age < 18 &&
                                model.transactionType ===
                                    TransactionType.REVENUE
                            ) {
                                window.alert(
                                    "Person is not old enough for revenue",
                                );
                                return;
                            }

                            if (isNaN(model.value) || model.personId === "") {
                                window.alert(
                                    "Value, PersonId and Type are required",
                                );
                                return;
                            }

                            TransactionFetch.post({
                                transactionType: model.transactionType!,
                                value: model.value!,
                                description: model.description!,
                                personId: model.personId!,
                            }).then(() => {
                                refresh();
                            });
                            // closeAddTransaction();
                        }}
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransactionPage;
