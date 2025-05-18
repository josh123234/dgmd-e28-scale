import "./budget-app.css"
import { BrowserRouter as Router } from 'react-router-dom';
import {Nav} from "./nav";
import {MyRouteApp} from "./routes"

function App() {

    return (
        <Router basename="/dgmd-e28-scale/assignments/final-project-josh123234/budget-app">
            <Nav />
            <MyRouteApp />
        </Router>
    )
}

export default App