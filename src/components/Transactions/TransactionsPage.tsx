"use client";
import "@/style/global.css";
import { useEffect, useState } from "react";
import TransactionService from "@/lib/services/TransactionService";
import RefreshIcon from "@/components/icons/RefreshIcon";
import type { TransactionModel } from "@/prisma/models";
import ItemRow from "../ItemRow";
import TransactionProperties from "./TransactionProperties";
import TransactionDetails from "./TransactionDetails";
import TransactionEdit from "./TransactionEdit";
import {
    getTransactionEditModel,
    transactionModel,
} from "@/lib/store/transactionModel";
import AddDialog from "../AddDialog";
import TransactionAdd from "./TransactionAdd";
import ItemList from "../ItemList";

const TransactionsPage = () => {
    const [transactions, setTransactions] = useState<
        Partial<TransactionModel>[]
    >([{ id: " - ", description: " - " }]);
    const [showAdd, setShowAdd] = useState(false);

    const refresh = () => {
        TransactionService.getAll().then((res) => {
            setTransactions(res);
        });
    };

    useEffect(() => {
        refresh();
    }, []);

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
                        onClick={() => setShowAdd(true)}
                    >
                        Add Transaction
                    </button>
                </div>
            </div>

            <ItemList show={showAdd}>
                {/* ITEM ROW ---------------------------------- */}
                {transactions.map((item) => (
                    <ItemRow
                        key={item.id}
                        deleteCallback={async () => {
                            await TransactionService.delete(item.id!);
                            refresh();
                        }}
                        updateCallback={async () => {
                            await TransactionService.put(
                                getTransactionEditModel(item.id!).model,
                            );
                            refresh();
                        }}
                        item={item}
                        editForm={
                            <TransactionEdit id={item.id!}></TransactionEdit>
                        }
                        properties={
                            <TransactionProperties
                                item={item}
                            ></TransactionProperties>
                        }
                        details={
                            <TransactionDetails
                                item={item}
                            ></TransactionDetails>
                        }
                    ></ItemRow>
                ))}
            </ItemList>
            {/* ADD ITEM CONTAINER ------------------------------------- */}
            <AddDialog
                show={showAdd}
                closeAdd={() => {
                    setShowAdd(false);
                }}
                save={async () => {
                    await TransactionService.post(transactionModel);
                    refresh();
                }}
            >
                <TransactionAdd></TransactionAdd>
            </AddDialog>
        </div>
    );
};

export default TransactionsPage;
