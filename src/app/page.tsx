"use client";
import "./global.css";
import { useEffect, useRef, useState } from "react";
import PersonService from "@/services/PersonService";
import TransactionFetch from "../services/TransactionService";
import Link from "next/link";

const Home = () => {
    const [show, setShow] = useState(false);
    const [people, setPeople] = useState(0);
    const [transactions, setTransactions] = useState(0);
    const [balances, setBalances] = useState([0, 0, 0]);

    const hiddenContainer = useRef<HTMLDivElement>(null);
    const visibleContainer = useRef<HTMLDivElement>(null);
    const visibleContainerHeight = useState<number | null>(null);

    useEffect(() => {
        PersonService.getAll().then((data) => {
            setPeople(data.people.length);
            setBalances([
                data.totalBalance,
                data.totalRevenue,
                data.totalExpenses,
            ]);
        });
        TransactionFetch.getCount().then((data) => {
            setTransactions(data.count);
        });
        visibleContainerHeight[1](visibleContainer.current?.scrollHeight ?? 0);
    }, []);

    const setAnimation = async () => {
        setShow(true);
    };

    return (
        <div className="main-container">
            <h1>Home</h1>
            <h2>This is a test page</h2>
            <p>Here you can edit and access the test database</p>
            <div style={{ display: "flex" }}>
                <button
                    className="space-v"
                    onClick={() => {
                        setAnimation();
                    }}
                >
                    <b>try it</b>
                </button>
            </div>
            <div
                className="main"
                ref={visibleContainer}
                style={{
                    display: "flex",
                    overflow: show ? "hidden" : "",
                    transform: show ? "translate(0,-100%)" : "translate(0,0%)",
                    height: show ? "0" : `${visibleContainerHeight[0]}px`,
                    opacity: show ? "0" : "1",
                    transition:
                        "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                }}
            >
                <div
                    className="table-container"
                    style={{
                        width: "10vw",
                        background: "white",
                        zIndex: "1",
                    }}
                >
                    <div>
                        <p className="cell title-label full-w">database</p>
                    </div>
                    <div>
                        <div className="cell full-w">create</div>
                    </div>
                    <div>
                        <div
                            className="cell full-w"
                            style={{ display: "flex", justifyContent: "end" }}
                        >
                            <div style={{ margin: "0 10px" }}>update</div>
                            <div>delete</div>
                        </div>
                    </div>
                    <div>
                        <div className="cell full-w">retrieve</div>
                    </div>
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                }}
            >
                <div
                    ref={hiddenContainer}
                    style={{
                        display: "flex",
                        position: "relative",
                        flexWrap: "wrap",
                        gap: "10px",
                        height: "fit-content",
                        transform: show
                            ? "translate(0%,0%)"
                            : "translate(0%,100%)",
                        opacity: show ? "1" : "0",
                        transition: "all 0.4s 0.3s",
                    }}
                >
                    <div
                        style={{
                            width: "200px",
                            border: "solid 1px black",
                            borderRadius: "10px",
                            padding: "10px",
                            backgroundColor: "white",
                        }}
                    >
                        <div>People: {people}</div>
                        <div>Transactions: {transactions}</div>
                        <div
                            style={{
                                border: "solid 1px black",
                                borderRadius: "10px",
                                marginTop: "10px",
                            }}
                        >
                            <div className="cell">
                                Total Balance: {balances[0]}$
                            </div>
                            <div className="cell">Revenue: {balances[1]}$ </div>
                            <div className="cell">Expense: {balances[2]}$</div>
                        </div>
                    </div>
                    <div className="link-buttons">
                        <button>
                            <Link className="tab-link" href="/People">
                                People &gt;
                            </Link>
                        </button>
                        <button>
                            <Link className="tab-link" href="/Transactions">
                                Transactions &gt;
                            </Link>
                        </button>
                        <h3
                            style={{
                                transition: "all 0.5s 0.6s ease",
                                opacity: show ? "1" : "0",
                                zIndex: -1,
                                transform: show
                                    ? "translate(0%,0)"
                                    : "translate(-100%,0)",

                                margin: "0px",
                            }}
                        >
                            explore the pages <br />
                            and see what you can do
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
