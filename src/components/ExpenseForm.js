import { useState, useContext, useEffect } from "react";
import { ExpenseContext } from './ExpenseProvider';
import { v4 as uuidv4 } from 'uuid';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import styles from './ExpenseForm.module.css';

export const ExpenseForm = () => {
    const options = [
        { value: "Groceries", label: "Groceries" },
        { value: "Shopping", label: "Shopping" },
        { value: "Restaurants", label: "Restaurants" },
        { value: "Transport", label: "Transport" },
        { value: "Travel", label: "Travel" },
        { value: "Entertainment", label: "Entertainment" },
        { value: "Utilities", label: "Utilities" },
        { value: "Health", label: "Health" },
        { value: "Services", label: "Services" },
        { value: "Transfers", label: "Transfers" },
        { value: "Cash", label: "Cash" },
        { value: "General", label: "General" },
        { value: "Insurance", label: "Insurance" },
        { value: "Refund", label: "Refund" },
        { value: "Allowance", label: "Allowance" },
        { value: "Savings", label: "Savings" },
    ];

    const { items, setItems, editingItem, setEditingItem } = useContext(ExpenseContext)
    const [selected, setSelected] = useState(options[0].value);
    const [cost, setCost] = useState("");
    const [description, setDescription] = useState("")
    const [viewForm, setViewForm] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault();

        if (editingItem) {
            const newItems = [...items]
            const existingEditingItem = newItems.findIndex(i => i.id === editingItem.id)

            newItems[existingEditingItem].selected = selected
            newItems[existingEditingItem].cost = cost
            newItems[existingEditingItem].description = description

            setItems(newItems)
            setEditingItem(null)
        } else {
            setItems([...items, {
                id: uuidv4(),
                selected,
                cost,
                description
            }])
        }

        setSelected("");
        setCost("");
        setDescription("");
        setViewForm(false);
    }

    useEffect(() => {
        if (editingItem) {
            setSelected(editingItem.selected)
            setCost(editingItem.cost)
            setDescription(editingItem.description)
        }
    }, [editingItem])

    if (!viewForm) {
        return (
            <div className={styles.buttonWrapper}>
                <button type="button" className={styles.buttonStyle} onClick={() => setViewForm(!viewForm)}>
                    <AddCircleOutlineIcon />Add New
                </button>
            </div>
        )
    }

    return (
        <div>
            <div className={styles.formWrapper}>
                <form onSubmit={onSubmit} >
                    <div className={styles.menuWrapper}>
                        <div className={styles.inputsWrapper}>
                            <div className={styles.firstRow}>
                                <select value={selected} onChange={(event) => {
                                    setSelected(event.target.value)
                                }} className={styles.selectWrapper}>
                                    {options.map((option) => (<option key={option.value} value={option.value}>{option.label}</option>))}
                                </select>
                                <div className={styles.currencyWrap}>
                                    <span className={styles.currencyCode}>£</span>
                                    <input classname={styles.currentWrapInput} required="required" type="currency-field" placeholder="amount" value={cost} onChange={(event) => setCost(event.target.value)} />
                                </div>

                            </div>

                            <input required="required" type="text" placeholder="Description(optional)" value={description} onChange={(event) => setDescription(event.target.value)} className={styles.desWrapper} />
                        </div>


                        <button className={styles.buttonStyle} type="submit">Done</button>
                    </div>
                </form>
            </div>
            <div className={styles.bottomButtonWrapper}>
                <button className={styles.beforeBottomStyle}>Before</button>
                <button className={styles.beforeUpdateStyle}>Update</button>
            </div>
        </div>
    )
};
