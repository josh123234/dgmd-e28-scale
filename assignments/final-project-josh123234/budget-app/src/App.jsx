import "./budget-app.css"
import { BrowserRouter as Router } from 'react-router-dom';
import {Nav} from "./nav";
import {MyRouteApp} from "./routes"

function App() {

    return (
        <Router>
            <Nav />
            <MyRouteApp />
        </Router>
    )
}

export default App