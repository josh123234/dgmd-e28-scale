import {Route, Routes} from "react-router-dom";
import {Goal} from "./advice_component.jsx";
import {Settings} from "./settings_component";
import BudgetScenarios from "./budget_component";


export function MyRouteApp() {
    return (
        <>
            <Routes>
                <Route path="/" element={<BudgetScenarios />} />
                <Route path="/goal" element={<Goal />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>
        </>
    )
}