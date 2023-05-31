import { useState, useContext, useEffect } from "react";
import { ExpenseContext } from './ExpenseProvider';
import { v4 as uuidv4 } from 'uuid';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import styles from './ExpenseForm.module.css';
import Select from 'react-select';
import WestIcon from '@mui/icons-material/West';
import CheckIcon from '@mui/icons-material/Check';

export const ExpenseForm = ({ viewForm, setViewForm }) => {
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
    const [selected, setSelected] = useState(null);
    const [cost, setCost] = useState("");
    const [description, setDescription] = useState("");

    const updateExpenseItems = (e) => {
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
                    <AddCircleOutlineIcon fontSize="small" />Add New
                </button>
            </div>
        )
    }

    return (
        <div>
            <div className={selected ? `${styles.formWrapperExpanded} ${styles.formWrapper}` : styles.formWrapper}>
                <form className={styles.menuWrapper} onSubmit={updateExpenseItems} >
                    <div className={styles.inputsWrapper}>
                        <div className={styles.firstRow}>
                            <div className={styles.requiredInputs}>
                                <Select classNames={{
                                    control: () => styles.control,
                                    placeholder: () => styles.searchPlaceholder,
                                    singleValue: () => styles.singleValue,
                                    menuList: () => styles.menuList,
                                    searchControl: () => styles.searchControl,
                                    input: () => styles.input
                                }} value={selected} onChange={setSelected} className={styles.selectWrapper} options={options} />
                                <div className={styles.currencyWrap}>
                                    <span className={styles.currencyCode}>£</span>
                                    <input
                                        className={styles.currentWrapInput}
                                        required="required" type="currency-field" placeholder="" value={cost} onChange={(event) => setCost(event.target.value)} />
                                </div>
                            </div>
                            <input maxLength="100" type="text" placeholder="Description (optional)" value={description} onChange={(event) => setDescription(event.target.value)} className={!selected ? styles.desWrapper : `${styles.desWrapper} ${styles.desWrapperExpanded}`} />
                        </div>
                        {!editingItem && selected ? <button disabled={!cost || !selected} className={styles.buttonDoneStyle} type="submit">Done</button> : null}
                    </div>
                </form>
            </div>
            <div className={styles.bottomButtonWrapper}>
                <button className={styles.beforeBottomStyle}><WestIcon sx={{ fontSize: 15 }} />Back</button>
                {
                    editingItem ?
                        <button onClick={updateExpenseItems} className={styles.beforeUpdateStyle}>Update<CheckIcon sx={{ fontSize: 15 }} /></button> : null
                }

            </div>
        </div >
    )
};
