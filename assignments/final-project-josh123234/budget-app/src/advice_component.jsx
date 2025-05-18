import {useGoal} from "./advice_goal_hook.jsx";
import {useAI} from "./advice_ai_hook.jsx";
import {useBudgetItems} from "./budget_items_hook";
import {useState} from "react";


export function Goal() {
    const [goal,gbox] = useGoal();
    const [addItem, resetBudget, GenerateList, getItems] = useBudgetItems()
    const [advice, pingGemini, AdviceButton] = useAI();

    return (
        <div className="wrapper">
            <h1>Goal</h1>
            <div className="wrapper">
                <div>Goal: {gbox}</div>
                <br/>
                <div>Budget: Set your budget <a href="/">here</a></div>
                <br/>
                <AdviceButton goal={goal}/>
            </div>

            <div className="wrapper">
            <hr/>
                {advice}
            </div>


        </div>


    )
}