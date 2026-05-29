"use client";
import "@/app/global.css";
import PersonFetch from "@/services/PersonService";
import TrashIcon from "@/icons/TrashIcon";
import EditIcon from "@/icons/EditIcon";
import RefreshIcon from "@/icons/RefreshIcon";
import CheckIcon from "@/icons/CheckIcon";
import { useEffect, useState } from "react";
import { PersonModel } from "@/prisma/models";

const PersonPage = () => {
    const [people, setPeople] = useState<
        (Partial<PersonModel> & {
            revenue?: number;
            expense?: number;
            balance?: number;
        })[]
    >([{ id: " - ", name: " - " }]);
    const [selected, setSelected] = useState<string[]>([]);
    const [checked, setChecked] = useState<Set<string>>(new Set());

    const refresh = () => {
        PersonFetch.getAll().then((res) => {
            console.log(res);
            setPeople(res);
        });
    };

    useEffect(() => {
        refresh();
    }, []);

    const checkBox = (id: string) => {
        // const box = document.querySelector(`.checkbox#check${id}`);
        // const icon = document.querySelector(`.checkbox>#check${id}`);
        // const path = document.querySelector(`.checkbox>#check${id}>path`);
        // const button = document.querySelectorAll(`#delete-selected,#uncheck`);
        // icon.style.transformOrigin = "center";
        // box.style.transition = "background-color 0.3s ease-in-out";
        // icon.style.transition = "all 0.3s ease-in-out";
        // path.style.transition = "all 0.3s ease-in-out";
        // if (
        //     box.style.backgroundColor === "white" ||
        //     box.style.backgroundColor === ""
        // ) {
        //     box.style.backgroundColor = "black";
        //     path.setAttribute("stroke", "white");
        //     icon.style.rotate = "0deg";
        //     if (this.state.selected.length === 0) {
        //         button.forEach((x) => {
        //             x.style.scale = "1";
        //             x.style.opacity = "1";
        //         });
        //     }
        //     this.state.selected.push(id);
        //     return;
        // }
        // box.style.backgroundColor = "white";
        // path.setAttribute("stroke", "black");
        // icon.style.rotate = "45deg";
        // this.state.selected.splice(this.state.selected.indexOf(id), 1);
        // if (this.state.selected.length === 0) {
        //     button.forEach((x) => {
        //         x.style.scale = "0";
        //         x.style.opacity = "0";
        //     });
        // }
    };

    const uncheckAll = () => {
        // while (this.state.selected.length > 0) {
        //     this.checkBox(this.state.selected[0]);
        // }
    };

    const openAddPerson = () => {
        // const detailMenu = document.querySelector(".container :nth-child(1)");
        // const addMenu = document.querySelectorAll(".container")[1];
        // const container = document.querySelector(".container");
        // if (container.style.flexGrow === "0") {
        //     return;
        // }
        // container.style.height = "0px";
        // container.style.flexGrow = "0";
        // setTimeout(() => {
        //     detailMenu.style.opacity = "0";
        // }, 300);
        // setTimeout(() => {
        //     addMenu.style.height = "100%";
        //     addMenu.style.padding = "0px";
        //     addMenu.style.opacity = "1";
        // }, 400);
    };

    const closeAddPerson = () => {
        // const addMenu = document.getElementsByClassName("container")[1];
        // const container = document.querySelector(".container");
        // const detailMenu = document.querySelector(".container :nth-child(1)");
        // if (addMenu.style.height === "0px") {
        //     return;
        // }
        // addMenu.style.height = "0px";
        // addMenu.style.padding = "0px 0px";
        // setTimeout(() => {
        //     addMenu.style.opacity = "0";
        // }, 300);
        // setTimeout(() => {
        //     detailMenu.style.opacity = "1";
        //     container.style.flexGrow = "1";
        //     container.style.height = "100%";
        //     this.refresh();
        // }, 400);
    };

    const openEdit = (id: string) => {
        // const info = document.getElementById(id);
        // const edit = document.querySelector(`#edit${id}`);
        // if (info.style.height === "0px") {
        //     return;
        // }
        // info.style.height = "0px";
        // info.style.padding = "0px";
        // info.style.opacity = "0";
        // setTimeout(() => {
        //     edit.style.height = `${edit.scrollHeight}px`;
        //     edit.style.padding = "10px";
        // }, 500);
    };

    const closeEdit = (id: string) => {
        // const info = document.getElementById(id);
        // const edit = document.querySelector(`#edit${id}`);
        // if (edit.style.height === "0px") {
        //     return;
        // }
        // edit.style.height = "0px";
        // edit.style.padding = "0px";
        // setTimeout(() => {
        //     info.style.height = `${info.scrollHeight}px`;
        //     info.style.padding = "10px";
        //     info.style.opacity = "1";
        // }, 500);
    };

    const toggleDetails = (id: string) => {
        // const info = document.getElementById(id);
        // const edit = document.querySelector(`#edit${id}`);
        // const controls = document.querySelector(`#a${id}`);
        // const check = document.querySelector(`.checkbox#check${id}`);
        // if (info.style.height === "0px" && edit.style.height === "0px") {
        //     check.style.opacity = "0";
        //     check.style.scale = "0";
        //     check.style.width = "0px";
        //     info.style.height = `${info.scrollHeight}px`;
        //     info.style.padding = "10px";
        //     info.style.opacity = "1";
        //     controls.style.transform = "scale(1)";
        //     controls.style.opacity = "1";
        //     controls.style.width = "fit-content";
        //     return;
        // }
        // info.style.height = "0px";
        // info.style.padding = "0px 10px";
        // edit.style.height = "0px";
        // edit.style.padding = "0px";
        // controls.style.transform = "scale(0)";
        // controls.style.opacity = "0";
        // controls.style.width = "0px";
        // check.style.opacity = "1";
        // check.style.scale = "1";
        // check.style.width = "fit-content";
    };

    const openDeleteView = (id: string) => {
        // const elem = document.querySelector(`#row-content${id}`);
        // const controls = document.querySelector(`#delete-options${id}`);
        // this.toggleDetails(id);
        // controls.style.transform = "scale(1)";
        // controls.style.padding = "10px";
        // controls.style.opacity = "1";
        // elem.style.opacity = "0";
        // elem.style.height = "0px";
        // elem.style.padding = "0px";
        // elem.style.overflow = "hidden";
    };

    const closeDeleteView = (id: string) => {
        // const elem = document.querySelector(`#row-content${id}`);
        // const controls = document.querySelector(`#delete-options${id}`);
        // if (elem.style.height !== "0px") {
        //     return;
        // }
        // this.toggleDetails(id);
        // controls.style.opacity = "0";
        // controls.style.transform = "scale(0)";
        // controls.style.padding = "0px";
        // elem.style.opacity = "1";
        // elem.style.height = `${elem.scrollHeight}px`;
        // setTimeout(() => {
        //     elem.style.height = "auto";
        // }, 500);
    };
    return (
        <div className="main-container">
            <h1>Hello</h1>
            <h3>This is the home page</h3>
            <div className="actions">
                <div style={{ display: "flex" }}>
                    <button
                        onClick={(e) => {
                            refresh();
                        }}
                        style={{ display: "flex", alignItems: "center" }}
                    >
                        <RefreshIcon size="20px" color="white"></RefreshIcon>
                    </button>
                    <button
                        id="add-person"
                        style={{ margin: "0 10px" }}
                        onClick={() => openAddPerson()}
                    >
                        Add Person
                    </button>
                    <button
                        id="delete-selected"
                        onClick={() => {
                            PersonFetch.delete(selected).then(() => {
                                refresh();
                                setSelected([]);
                            });
                        }}
                    >
                        Delete
                    </button>
                </div>
                <button
                    id="uncheck"
                    style={{
                        backgroundColor: "white",
                        border: "solid 1px black",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "36px",
                    }}
                    onClick={() => {
                        uncheckAll();
                    }}
                >
                    <CheckIcon size="20px" stroke="black"></CheckIcon>
                </button>
            </div>
            <div
                className="container"
                style={{ height: "100%", transition: "all 0.3s ease-out" }}
            >
                <div
                    style={{
                        transition: "all 0.4s ease",
                        opacity: "1",
                    }}
                >
                    {/* ITEM ROW ---------------------------------- */}
                    {people.map((item) => (
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
                                    gridColumn: "1 / 1",
                                    gridRow: "1 / 1",
                                }}
                                /*TOGGLE DETAIL VIEW -------------------------------------*/
                                onClick={(e) => {
                                    toggleDetails(item.id!);
                                }}
                            >
                                {/*ITEM ROW INNER CONTENT --------------------------------*/}
                                <div
                                    style={{
                                        display: "flex",
                                        width: "100%",
                                    }}
                                >
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
                                </div>

                                {/*ITEM ROW CHECKBOX --------------------------------*/}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        checkBox(item.id!);
                                    }}
                                    className="checkbox"
                                    id={"check" + item.id}
                                >
                                    <CheckIcon
                                        size="20px"
                                        stroke="black"
                                        id={"check" + item.id}
                                    ></CheckIcon>
                                </button>

                                {/*ITEM ROW CONTROLS --------------------------------------*/}
                                <div
                                    className="item-controls"
                                    id={"a" + item.id}
                                >
                                    <div
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openDeleteView(item.id!);
                                        }}
                                    >
                                        <TrashIcon size="20" color="white" />
                                    </div>
                                    <div
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openEdit(item.id!);
                                        }}
                                    >
                                        <EditIcon size="20" color="white" />
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
                                    <div className="detail-row">
                                        {/* DETAIL ROWS --------------------------------- */}
                                        <p>Revenue: {item.revenue}</p>
                                    </div>
                                    <div className="detail-row">
                                        {/* DETAIL ROWS --------------------------------- */}
                                        <p>Expenses: {item.expense}</p>
                                    </div>
                                    <div className="detail-row">
                                        {/* DETAIL ROWS --------------------------------- */}
                                        <p>Balance: {item.balance}</p>
                                    </div>
                                </div>

                                {/*EDIT ITEM CONTAINER --------------------------------- */}
                                <div
                                    style={{
                                        height: "0px",
                                        padding: "0px",
                                        transition: "all 0.5s",
                                        overflow: "hidden",
                                    }}
                                    id={"edit" + item.id}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "10px",
                                        }}
                                    >
                                        {/*EDIT INPUT ROWS ----------------------------------------------------*/}
                                        <div
                                            style={{
                                                display: "flex",
                                                gap: "10px",
                                            }}
                                        >
                                            <p className="cell title-label input-label">
                                                Name
                                            </p>
                                            <input
                                                type="text"
                                                id={"e-name" + item.id}
                                                style={{ width: "100%" }}
                                            />
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                gap: "10px",
                                            }}
                                        >
                                            <p className="cell title-label input-label">
                                                Age
                                            </p>
                                            <input
                                                type="number"
                                                id={"e-age" + item.id}
                                                style={{ width: "100%" }}
                                            />
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                gap: "10px",
                                            }}
                                        >
                                            <p className="cell title-label input-label">
                                                Phone
                                            </p>
                                            <input
                                                type="number"
                                                id={"e-phone" + item.id}
                                                style={{ width: "100%" }}
                                            />
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                gap: "10px",
                                            }}
                                        >
                                            <p className="cell title-label input-label">
                                                Email
                                            </p>
                                            <input
                                                type="text"
                                                id={"e-email" + item.id}
                                                style={{ width: "100%" }}
                                            />
                                        </div>

                                        {/*EDIT CONTROLS -----------------------------------------------------*/}
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "end",
                                                alignItems: "center",
                                                gap: "10px",
                                            }}
                                        >
                                            <button
                                                onClick={(e) => {
                                                    closeEdit(item.id!);
                                                }}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    // var age =
                                                    //     document.querySelector(
                                                    //         "#e-age" + item.id,
                                                    //     ).value;
                                                    // var name =
                                                    //     document.querySelector(
                                                    //         "#e-name" + item.id,
                                                    //     ).value;
                                                    // var email =
                                                    //     document.querySelector(
                                                    //         "#e-email" +
                                                    //             item.id,
                                                    //     ).value;
                                                    // var phone =
                                                    //     document.querySelector(
                                                    //         "#e-phone" +
                                                    //             item.id,
                                                    //     ).value;
                                                    // PersonFetch.put({
                                                    //     id: item.id,
                                                    //     age:
                                                    //         age === ""
                                                    //             ? null
                                                    //             : parseInt(age),
                                                    //     name:
                                                    //         name === ""
                                                    //             ? null
                                                    //             : name,
                                                    //     email:
                                                    //         email === ""
                                                    //             ? null
                                                    //             : email,
                                                    //     phone:
                                                    //         phone === ""
                                                    //             ? null
                                                    //             : phone,
                                                    // }).then((data) => {
                                                    //     this.closeEdit(item.id);
                                                    //     this.refresh();
                                                    // });
                                                }}
                                            >
                                                Done
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*DELETE OPTIONS --------------------------------------*/}
                            <div
                                style={{
                                    gridColumn: "1 / 1",
                                    gridRow: "1 / 1",
                                }}
                            >
                                <div
                                    id={"delete-options" + item.id}
                                    style={{
                                        padding: "0px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        transform: "scale(0)",
                                        transition: "all 0.5s ease",
                                    }}
                                >
                                    <button
                                        style={{
                                            marginRight: "10px",
                                        }}
                                        onClick={() => {
                                            PersonFetch.delete([item.id!]).then(
                                                (res) => {
                                                    refresh();
                                                },
                                            );
                                        }}
                                    >
                                        Yes
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            closeDeleteView(item.id!);
                                        }}
                                    >
                                        No
                                    </button>
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
                    height: "0px",
                    opacity: "0",
                    gap: "10px",
                    flexGrow: "0",
                    marginTop: "-50px",
                    transition: "all 0.4s ease",
                }}
            >
                {/*INPUT ROW -----------------------------------------------*/}
                <div style={{ display: "flex", gap: "10px" }}>
                    <p className="cell title-label input-label">Age</p>
                    <input type="number" name="age" />
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                    <p className="cell title-label input-label">Name</p>
                    <input type="text" name="name" />
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                    <p className="cell title-label input-label">Phone</p>
                    <input type="number" name="phone" />
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                    <p className="cell title-label input-label">Email</p>
                    <input type="text" name="email" />
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
                            closeAddPerson();
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            // var age =
                            //     document.querySelector("input[name=age]").value;
                            // var name =
                            //     document.querySelector(
                            //         "input[name=name]",
                            //     ).value;
                            // var email =
                            //     document.querySelector(
                            //         "input[name=email]",
                            //     ).value;
                            // var phone =
                            //     document.querySelector(
                            //         "input[name=phone]",
                            //     ).value;
                            // if (age === "" || name === "") {
                            //     window.alert("Age and Name are required");
                            //     return;
                            // }
                            // PersonFetch.post({
                            //     age: parseFloat(
                            //         document.querySelector("input[name=age]")
                            //             .value,
                            //     ),
                            //     name: document.querySelector("input[name=name]")
                            //         .value,
                            //     email: email === "" ? null : email,
                            //     phone: phone === "" ? null : phone,
                            // }).then(() => this.refresh());
                            // this.closeAddPerson();
                        }}
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PersonPage;
