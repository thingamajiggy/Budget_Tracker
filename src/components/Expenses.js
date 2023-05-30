import { useContext } from "react"
import { ExpenseContext } from "./ExpenseProvider"
import styles from "./Expenses.module.css"
import DeleteIcon from '@mui/icons-material/Delete';

export const Expenses = () => {
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
                        <div className={styles.itemAlignment}>
                            <div className={styles.firstBox}>{item.description}</div>
                            <div className={styles.secondBox}>{item.selected}</div>
                            <div className={styles.thirdBox}>£{item.cost}</div>
                        </div>
                        <div className={styles.buttonWrapper}>
                            <button type="button" onClick={() => handleDeleteClick(item)}><DeleteIcon /></button>
                            <button type="button" onClick={() => setEditingItem(item)}>edit</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}