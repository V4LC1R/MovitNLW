import { createContext ,ReactNode, useContext, useEffect, useState} from "react";
import { ChallengesContext } from "./ChallengesContext";

let countDownTimeout : NodeJS.Timeout;

interface CountDownData{
    minutes:number,
    seconds:number,
    hasFinished:boolean,
    isActive:boolean,
    startCountDown:()=>void,
    resetCountDown:()=>void
}

interface CountDownProviderProps{
    children:ReactNode;
}

export const CountDownContext = createContext({} as CountDownData)

export function CountDownProvider({children}:CountDownProviderProps){

    const {startNewChallenge} = useContext(ChallengesContext);

    const [time, setTime]=useState(25*60);
    const [isActive,setIsActive]=useState(false);
    const [hasFinished,setHasFinished]=useState(false);

    const minutes = Math.floor(time/60)
    const seconds = time % 60

    function startCountDown(){
        setIsActive(true)
    }

    function resetCountDown(){
        clearTimeout(countDownTimeout)
        setIsActive(false)
        setTime(0.05*60)
        setHasFinished(false);
    }

    useEffect(()=>{
        if(isActive && time > 0){
            countDownTimeout = setTimeout(()=>{
                setTime(time-1);
            },1000)
        }else if(isActive && time === 0){
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
            
        }
    },[isActive,time])

    return(
       < CountDownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountDown,
            resetCountDown
       }}>
        {children}
       </CountDownContext.Provider>
    );
}