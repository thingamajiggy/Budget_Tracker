import { useState } from "react";
import { ExpenseForm } from "./ExpenseForm"
import { Expenses } from "./Expenses"
import styles from './Header.module.css';

export const Header = () => {
    const [viewForm, setViewForm] = useState(false);

    return (
        <div className={styles.mainWrapper}>
            <h1 className={styles.title}>Further expense costs based on your industry</h1>
            <div className={styles.descWrapper}>
                <p>Please provide us with as many of your expenses as possible. These can be anything from equipment costs to maketing budgests.</p>
                <p>If you make a loss, this can be carried forward - click on the <strong>help</strong> icon form more information. If your expenses are under £1,000, we will apply a £1,000 trading allowance instead.</p>
            </div>
            <Expenses setViewForm={setViewForm} />
            <ExpenseForm viewForm={viewForm} setViewForm={setViewForm} />
        </div>
    )
}