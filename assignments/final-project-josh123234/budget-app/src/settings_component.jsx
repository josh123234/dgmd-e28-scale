import {useSettings} from "./settings_hook";

export function Settings() {
    const [settings, incomeBox, saveSettings, settingsMessage] = useSettings();

    return (
        <div className="wrapper">
            <h1>Settings</h1>
            <div className="wrapper">
                <div>Monthly Income: {incomeBox}</div>
                <br/>
                <div>{settingsMessage}</div>
            </div>
            <button onClick={() => saveSettings()}>Save</button>
        </div>
    )
}