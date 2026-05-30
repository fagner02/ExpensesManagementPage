"use client";
import "@/app/global.css";
import PersonService from "@/services/PersonService";
import TrashIcon from "@/icons/TrashIcon";
import EditIcon from "@/icons/EditIcon";
import RefreshIcon from "@/icons/RefreshIcon";
import CheckIcon from "@/icons/CheckIcon";
import { useEffect, useState } from "react";
import { PersonModel } from "@/prisma/models";
import ItemRow from "@/components/ItemRow";
import PersonProperties from "@/components/Person/PersonProperties";
import PersonEdit from "@/components/Person/PersonEdit";
import PersonDetails from "@/components/Person/PersonDetails";
import { getPersonEditModel, personModel } from "@/store/personModel";

const PersonPage = () => {
    const [people, setPeople] = useState<
        (Partial<PersonModel> & {
            revenue?: number;
            expense?: number;
            balance?: number;
        })[]
    >([{ id: " - ", name: " - " }]);

    const refresh = () => {
        PersonService.getAll().then((res) => {
            setPeople(res);
        });
    };

    useEffect(() => {
        refresh();
    }, []);

    const openAddPerson = () => {};

    const closeAddPerson = () => {};

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
                </div>
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
                        <ItemRow
                            key={item.id}
                            deleteCallback={() => {}}
                            updateCallback={async () => {
                                await PersonService.put(
                                    getPersonEditModel(item.id!).model,
                                );
                                refresh();
                            }}
                            item={item}
                            editForm={<PersonEdit id={item.id!}></PersonEdit>}
                            details={
                                <PersonDetails item={item}></PersonDetails>
                            }
                            properties={
                                <PersonProperties
                                    item={item}
                                ></PersonProperties>
                            }
                        ></ItemRow>
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
