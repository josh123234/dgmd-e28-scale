import { useState, useEffect } from "react"
import {useSettings} from "./settings_hook";


export const useBudgetItems = () => {
    const [settings] = useSettings();
    var initialBudget = {items: {}, total: 0, income: settings.income, savings: settings.income}
    const [budgetItems, setBudgetItems] = useState(initialize)

    function resetBudget() {
        var dataStr = JSON.stringify(initialBudget)
        localStorage.setItem("budget", dataStr);
        setBudgetItems(initialBudget);
        return initialBudget
    }

    function initialize() {
        let storedBudget = localStorage.getItem('budget');
        if (!storedBudget) {
            var dataStr = JSON.stringify(initialBudget)
            localStorage.setItem("budget", dataStr);
            return initialBudget
        } else {
            let newBudgetObject = JSON.parse(storedBudget);
            return newBudgetObject
        }
    }

    function addItem(money, category) {
        let storedBudget = localStorage.getItem('budget');
        let storedBudgetObject = JSON.parse(storedBudget);
        storedBudgetObject.items[category] = money;
        storedBudgetObject.total = calcTotal(storedBudgetObject.items);
        storedBudgetObject.savings = storedBudgetObject.income - storedBudgetObject.total;
        if (storedBudgetObject.savings >= 0) {
            setBudgetItems(storedBudgetObject);
            let returnMessage = "Set " + category + " to $" + money + "!"
            return returnMessage
        } else {
            return "Insufficient income!"
        }

        function calcTotal(itemsObject) {
            let catArr = Object.keys(itemsObject);

            let valueArr = catArr.map((cat) => parseInt(itemsObject[cat]))
            let totalExpenses = 0
            for (let i=0; i<valueArr.length; i++) {
                totalExpenses = totalExpenses + valueArr[i]
            }
            return totalExpenses;
        }
    }

    function getItems() {
        let storedBudget = localStorage.getItem('budget');
        let storedBudgetObject = JSON.parse(storedBudget);

        return storedBudgetObject
    }

    function GenerateList() {
        let catArr = []
        if (budgetItems.items) {
            catArr = Object.keys(budgetItems.items);
        }

        function constructListItems(cat, i) {
            return <li key={i}>{cat}: ${budgetItems.items[cat]} USD</li>
        }

        return (
            <>
                <ul>
                    {catArr.map(constructListItems)}
                </ul>
                <div>Total: {budgetItems.total} USD</div>
            </>
        )
    }

    useEffect(() => {
        let updatedBudget = JSON.stringify(budgetItems);
        localStorage.setItem("budget", updatedBudget);
    }, [budgetItems])


    return [addItem, resetBudget, GenerateList, getItems]
}