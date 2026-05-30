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
import ItemList from "../ItemList";
import { usePagination } from "@/lib/store/pagination";
import PageOptions from "../PageOptions";

const PeoplePage = () => {
    const [people, setPeople] = useState<
        (Partial<PersonModel> & {
            revenue?: number;
            expense?: number;
            balance?: number;
        })[]
    >([{ id: " - ", name: " - " }]);

    const [loading, setLoading] = useState(true);

    const [totalElems, setTotalElems] = useState(0);
    const pagination = usePagination();

    const refresh = () => {
        setLoading(true);
        PersonService.getAll(pagination).then((res) => {
            setPeople(res.people);
            setLoading(false);
            setTotalElems(res.totalCount);
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
            <ItemList loading={loading} show={showAdd}>
                {/* ITEM ROW ---------------------------------- */}
                {people.map((item) => (
                    <ItemRow
                        key={item.id}
                        deleteCallback={async () => {
                            await PersonService.delete(item.id!);
                            refresh();
                        }}
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
            </ItemList>
            {/* ADD ITEM CONTAINER ------------------------------------- */}
            <AddDialog
                show={showAdd}
                save={async () => {
                    await PersonService.post(personModel);
                    refresh();
                }}
                closeAdd={() => {
                    setShowAdd(false);
                }}
            >
                <PersonAdd></PersonAdd>
            </AddDialog>
            <PageOptions
                pagination={pagination}
                refresh={refresh}
                totalElems={totalElems}
            ></PageOptions>
        </div>
    );
};

export default PeoplePage;
