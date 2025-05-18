import {useState} from "react"

export const useGoal = () => {
    const [goal, setGoal] = useState("My Goal");
    const gbox =
        <>
            <input type ='text' name='goal' onChange={(e)=> setGoal(e.target.value)} />
        </>
    return [goal, gbox];
}
