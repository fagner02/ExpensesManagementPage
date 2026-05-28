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

    const refresh = () => {
        TransactionFetch.getAll().then((res) => {
            console.log(res);
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

    const toggleDetails = (id: string) => {
        // const info = document.getElementById(id);
        // if (info.style.height === "0px") {
        //     info.style.height = `${info.scrollHeight}px`;
        //     info.style.padding = "10px";
        //     info.style.opacity = "1";
        //     return;
        // }
        // info.style.height = "0px";
        // info.style.padding = "0px 10px";
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
                                    toggleDetails(item.id!);
                                }}
                            >
                                {/*ITEM ROW INNER CONTENT --------------------------------*/}
                                <div style={{ display: "flex", width: "100%" }}>
                                    <p className="cell title-label" style={{}}>
                                        {item.id}
                                        <sup
                                            style={{
                                                fontSize: "12px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            id
                                        </sup>
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
                                        padding: "0px",
                                        height: "0px",
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
                                old.transactionType = e.target
                                    .value! as keyof typeof TransactionType;
                                return old;
                            })
                        }
                    >
                        <option value="REVENUE">Revenue</option>
                        <option value="EXPENSE">Expense</option>
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
                                old.value = parseFloat(e.target.value!);
                                return old;
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
                                old.description = e.target.value;
                                return old;
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
                                old.personId = e.target.value!;
                                return old;
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
                            if (model.value === undefined) return;

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
