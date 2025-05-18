import {useEffect, useState} from "react"

export const useSettings = () => {

    var defaultSettingsObj = {income: 1000}
    const [settings, setSettings] = useState(initializeSettings);
    const [income, setIncome] = useState(defaultSettingsObj.income);
    const [settingsMessage, setSettingsMessage] = useState("Do not forget to save your settings.");


    const incomeBox =
        <>
            <input type ='text' name='income' value={income} onChange={(e)=> setIncome(e.target.value)} />&nbsp; USD
        </>

    function initializeSettings() {
        let storedSettingsStr = localStorage.getItem('settings');
        if (!storedSettingsStr) {
            var defaultSettingsStr = JSON.stringify(defaultSettingsObj)
            localStorage.setItem("settings", defaultSettingsStr);
            return defaultSettingsObj
        } else {
            let storedSettingsObj = JSON.parse(storedSettingsStr);
            return storedSettingsObj
        }
    }

    function saveSettings() {
        console.log("saving", income)
        let storedSettingsStr = localStorage.getItem("settings");
        let storedSettingsObj = JSON.parse(storedSettingsStr);
        storedSettingsObj.income = income;
        setSettings(storedSettingsObj);
    }

    useEffect(() => {
        let updatedSettings = JSON.stringify(settings);
        localStorage.setItem("settings", updatedSettings);
        setSettingsMessage("Settings Saved!" )
    }, [settings])

    useEffect(() => {
        setSettingsMessage("Don't forget to save after changing!" )
    }, [income])



    return [settings, incomeBox, saveSettings, settingsMessage];
}
