import {Link} from "react-router-dom";

export function Nav() {
    return (
        <div className="navbar">
            <span>Budgeting Application</span>
            <ul className="navlinks">
                <li><Link to="/">Budget</Link></li>
                <li><Link to="/goal">Get Advice</Link></li>
                <li><Link to="/settings">Settings</Link></li>
            </ul>
        </div>
    );
}