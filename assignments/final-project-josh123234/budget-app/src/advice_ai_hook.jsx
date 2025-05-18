// import { GoogleGenAI } from "@google/genai";
import {useState} from "react"
import {useBudgetItems} from "./budget_items_hook.jsx";


export const useAI = () => {
    const [addItem, resetBudget, GenerateList, getItems] = useBudgetItems()
    var retrievedBudgetItems = JSON.stringify(getItems())
    const [advice, setAdvice] = useState("AI advice will go here.");
    const apiKey = "AIzaSyA0gElNUH3U61dhKjup80nnM64yt1O14Zc"
    // const ai = new GoogleGenAI({ apiKey: "AIzaSyA0gElNUH3U61dhKjup80nnM64yt1O14Zc" });


    function pingGemini(goal) {
        const prompt = "Analyze the following budget data, then give me a strategic recommendation that is less than 3 sentences (add some humor). Budget is: " + retrievedBudgetItems + " Goal is: " + goal;
        console.log("create XMLHttpRequest");
        var req = new XMLHttpRequest();
        const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key="+apiKey
        console.log("open API endpoint");
        req.open("POST", url, true);
        req.setRequestHeader("Content-Type", "application/json");
        req.onreadystatechange = function() {
            if(req.readyState == 4) {

                let response = req.responseText;
                console.log("Response: " + response);
                let respObj = JSON.parse(response);
                let advice = respObj.candidates[0].content.parts[0].text
                setAdvice(advice);
            }
        };

        const d = JSON.stringify({
            "contents": [{
                "parts": [
                    {"text": prompt}
                ]
            }]
        })
        console.log("sending request");
        req.send(d);
    }

    /*
    // If we had installed the @google/genai npm package, then we could have used the following simplified approach:

    async function pingGemini(goal) {
        const prompt = "Analyze the following budget data, then give me a strategic recommendation that is less than 3 sentences (add some humor). Budget is: " + retrievedBudgetItems + " Goal is: " + goal

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt
        });
        setAdvice(response.text);
    }
    */

    function AdviceButton(params) {
        return (
            <>
                <button onClick={() => pingGemini(params.goal)}>Get Advice</button>
            </>
        )
    }
    return [advice, pingGemini, AdviceButton];

}


