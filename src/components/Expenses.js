import { useContext } from "react"
import { ExpenseContext } from "./ExpenseProvider"
import styles from "./Expenses.module.css"
import DeleteIcon from '@mui/icons-material/Delete';

export const Expenses = ({ setViewForm }) => {
    const { items, setItems, setEditingItem } = useContext(ExpenseContext)

    const handleDeleteClick = (item) => {
        const newItems = items.filter((i) => i.id !== item.id);
        setItems(newItems);
    };

    return (
        <div>
            {items.map((item, i) => {
                return (
                    <div key={item.id} className={styles.itemWrapper}>
                        <button aria-label="Edit" onClick={() => {
                            setEditingItem(item)
                            setViewForm(true)
                        }} className={styles.itemAlignment}>
                            <div className={styles.firstBox}>{item.description}</div>
                            <div className={styles.secondBox}>{item.selected.label}</div>
                            <div className={styles.thirdBox}>£{item.cost}</div>
                        </button>
                        <div className={styles.buttonWrapper}>
                            <button type="button" onClick={() => handleDeleteClick(item)} className={styles.deleteWrapper}><DeleteIcon /></button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}