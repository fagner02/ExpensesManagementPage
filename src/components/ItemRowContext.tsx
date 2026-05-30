import { createContext, ReactNode, useContext } from "react";

export type ItemRowContext = {
    updateCallback: Function;
    deleteCallback: Function;
};
const ItemRowContext = createContext<ItemRowContext | null>(null);

export const ItemRowProvider = (
    props: ItemRowContext & {
        children: ReactNode;
    },
) => {
    return (
        <ItemRowContext.Provider
            value={{
                updateCallback: props.updateCallback,
                deleteCallback: props.deleteCallback,
            }}
        >
            {props.children}
        </ItemRowContext.Provider>
    );
};

export const useItemRowContext = () => {
    return useContext(ItemRowContext);
};
