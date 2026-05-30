"use client";
import "@/style/global.css";
import PersonService from "@/lib/services/PersonService";
import RefreshIcon from "@/components/icons/RefreshIcon";
import { useEffect, useState } from "react";
import { PersonModel } from "@/prisma/models";
import ItemRow from "@/components/ItemRow";
import PersonProperties from "@/components/People/PersonProperties";
import PersonEdit from "@/components/People/PersonEdit";
import PersonDetails from "@/components/People/PersonDetails";
import { getPersonEditModel, personModel } from "@/lib/store/personModel";
import AddDialog from "../AddDialog";
import PersonAdd from "./PersonAdd";

const PeoplePage = () => {
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

    const [showAdd, setShowAdd] = useState(false);

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
                        disabled={showAdd}
                        id="add-person"
                        style={{
                            margin: "0 10px",
                            opacity: showAdd ? "0.8" : "",
                        }}
                        onClick={() => setShowAdd(true)}
                    >
                        Add Person
                    </button>
                </div>
            </div>
            <div
                className="container"
                style={{
                    height: showAdd ? "0" : "100%",
                    transform: showAdd ? "translateY(10%)" : "translateY(0)",
                    opacity: showAdd ? "0" : "1",
                    transition: "all 0.3s ease-out",
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
                        details={<PersonDetails item={item}></PersonDetails>}
                        properties={
                            <PersonProperties item={item}></PersonProperties>
                        }
                    ></ItemRow>
                ))}
            </div>
            {/* ADD ITEM CONTAINER ------------------------------------- */}
            <AddDialog
                show={showAdd}
                save={() => {
                    PersonService.post(personModel);
                }}
                closeAdd={() => {
                    setShowAdd(false);
                }}
            >
                <PersonAdd></PersonAdd>
            </AddDialog>
        </div>
    );
};

export default PeoplePage;
