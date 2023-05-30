import { createContext, useState } from "react";

export const ExpenseContext = createContext({});

export const ExpenseProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const [editingItem, setEditingItem] = useState(null);
    const [viewItems, setViewItems] = useState(false);

    return (
        <ExpenseContext.Provider value={{
            items,
            setItems,
            editingItem,
            setEditingItem,
            viewItems,
            setViewItems,
        }}>
            {children}
        </ExpenseContext.Provider>
    )
}