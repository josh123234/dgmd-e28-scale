import {useEffect, useState} from "react";
import {useBudgetItems} from "./budget_items_hook";

function BudgetScenarios() {
    const [currMoney, setCurrMoney] = useState('')
    const [addItem, resetBudget, GenerateList, getItems] = useBudgetItems()
    const [endGame, setEndGame] = useState(false)
    const [moneyRemaining, setMoneyRemaining] = useState(getItems().savings)
    const [message, setMessage] = useState('Define your spending strategy by adding expenses.')

    var categoryArray = ["Food", "Rent", "Activities", "Shopping"]
    // [...categoryArray, other])

    const [currCategory, setCurrCategory] = useState("Food")

    function MakeSelectors({categories}) {
        function constructElement(cat, i) {
            return <option key={i}>{cat}</option>
        }
        return (
            <>
                <select value={currCategory} onChange={(e) => setCurrCategory(e.target.value)}>
                    {categories.map(constructElement)}
                </select>
            </>
        )
    }

    function submitExpenseForm(e) {
        e.preventDefault();
        if (!currMoney) {
            setMessage("Enter an amount!");
        } else {
            let newMessage = addItem(currMoney, currCategory);
            setMessage(newMessage);
            setCurrMoney('');
        }
    }

    useEffect(() => {
        let newSavings = getItems().savings;
        setMoneyRemaining(newSavings);
        if (newSavings == 0) {
            setEndGame(true);
            let losermessage = "Out of money."
            setMessage(losermessage);
        }
    }, [message])

    function Message() {
        return <div>{message}</div>
    }

    function restart() {
        resetBudget()
        setEndGame(false)
        setMoneyRemaining(getItems().savings)
        setMessage("Reset budget!")
    }

    function ResetButton() {
        return <button className={endGame ? '' : 'noShow'} onClick={() => restart()}>Reset Budget</button>
    }

    return (
        <div className="wrapper">
            <h1>Budget</h1>
            <div className="wrapper">
                <hr/>
                <div>Monthly income: {getItems().income} USD</div>
                <div>Monthly expenses: {getItems().total} USD</div>
                <div>Monthly savings: {moneyRemaining} USD</div>
                <hr/>
            </div>
            <div className="wrapper">
                <Message/>
                <form className={!endGame ? '' : 'noShow'}>
                    <div>Update budget (add new or edit existing category totals):</div>
                    <input
                        type="number"
                        name="new-budget-item"
                        value={currMoney}
                        placeholder="$ amount"
                        onChange={(e) => setCurrMoney(e.target.value)}
                    />
                    &nbsp;&nbsp;
                    <MakeSelectors categories={categoryArray}></MakeSelectors>
                    <br/>
                    <button onClick={(e) => submitExpenseForm(e)}>Update</button>
                </form>
                <hr/>
            </div>
            <div className="wrapper">
                <h3>Monthly Expenses by Category</h3>
                <GenerateList/>
                <ResetButton/>
            </div>
        </div>
    );
}

export default BudgetScenarios;