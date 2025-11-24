"use client"
import Box from "./box";
import { useEffect, useState } from "react";
import CopyImg from "./copyImg";

import { COLORS_ARR } from "../constants/colors";
import type { gameStates } from "../../types/gameStages";

export default function Boxes() {

    const [gameState, setGameState] = useState("start");
    const [colors, setColors] = useState(['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500']); //starting game with default colors.
    const [rightPick, setRightPick] = useState([0, "bg-red-500"] as [number, string]);
    const [Timer, setTimer] = useState(3);
    const [score, setScore] = useState(0);
    const [showSummary, setShowSummary] = useState(false);


    function randomFourColors() {
        return COLORS_ARR.sort(() => Math.random() - 0.5).slice(0, 4);

    }


    useEffect(() => {

        if (gameState === "start") {
            // do nothing
        } else if (gameState === "read") {
            setColors(randomFourColors());


            setTimer(3)
            const interval = setInterval(() => {
                setTimer(prev => {
                    if (prev === 1) {
                        clearInterval(interval);
                        setGameState("choose");
                        return 0;
                    }
                    return prev - 1
                });



            }, 1000)
           
        } else if (gameState === "choose") {
            let rightSel = Math.floor(Math.random() * 4)

            setRightPick([rightSel, colors[rightSel]]);
         
            setColors(Array(4).fill("bg-gray-600"))









            
        }




    }, [gameState]);



    function setUserAns(ans: number) {
        if (gameState === "choose") {
            if (ans === rightPick[0]) {
                // alert("success");
                setScore(prev => prev + 1);
                setGameState("resultCorrect");
                setTimeout(() => {
                    setGameState("read");
                }, 1000);
            } else {
                // alert("Failed. restarting game.");

                setGameState("resultWrong");
            }

        }

    }

    return (<div>
        <div className="flex gap-2">
            {score > 0 && <h1 className="font-mono m-1.5">Score: {score}</h1>}

        </div>
        <div className="relative">
            {/* Blurred grid */}



            <div className={`grid grid-cols-2 gap-2 ${gameState === "start" ? "blur-sm pointer-events-none" : "cursor-default"} ${gameState === "choose" && "cursor-pointer"}`}>
                <Box id={0} bgcolor={colors[0]} onClick={gameState === "choose" ? setUserAns : () => { }} />
                <Box id={1} bgcolor={colors[1]} onClick={gameState === "choose" ? setUserAns : () => { }} />
                <Box id={2} bgcolor={colors[2]} onClick={gameState === "choose" ? setUserAns : () => { }} />
                <Box id={3} bgcolor={colors[3]} onClick={gameState === "choose" ? setUserAns : () => { }} />
            </div>



            {gameState === "read" && <span className="absolute top-1/2 left-1/2 font-mono border rounded-full w-[25px] h-[25px] items-center flex justify-center -translate-x-1/2 -translate-y-1/2">{Timer}</span>}


            <button
                className={` ${gameState === "start" ? "" : "hidden"} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 px-2.5 py-2.5 text-xl font-mono rounded-xl border-2 text-white bg-white/10 backdrop-blur-md border-white/20 shadow-lg hover:bg-white/20 transition`}
                onClick={() => { setGameState("read") }}>Start Game</button>

            {gameState === "choose" && <div className="mt-5 flex items-center gap-4"> <h1 className="font-mono text-2xl">where was the</h1> <div className={` ${rightPick[1]} h-[50px] w-[50px] rounded-sm`}></div></div>}


            {gameState === "resultCorrect" && <div className="mt-5 bg-green-500 p-2 rounded-sm">Correct Answer! Moving to next.</div>}

            {gameState === "resultWrong" && <div className="mt-5  p-1.5 rounded-sm   ">
                <h1 className="font-mono text-1xl bg-red-800 p-1 rounded-sm p-2 mb-2">Wrong Answer! Game Over.</h1>
                <div className="gap-2 flex">
                    <button onClick={() => { setScore(0); setGameState("read"); }} className="px-2 py-2 text-sm font-mono rounded-md border text-white bg-white/10 backdrop-blur-md border-white/20 shadow-lg hover:bg-white/20 transition">Restart</button>

                    <button onClick={() => { setShowSummary(true); }} className="px-2 py-2 text-sm font-mono rounded-md border text-white bg-white/10 backdrop-blur-md border-white/20 shadow-lg hover:bg-white/20 transition">Game Summary</button>
                </div>
            </div>}


        </div>

        {/* CopyImg */}
        {showSummary && <CopyImg score={score} onClose={() => setShowSummary(false)} />}
    </div>

    )
}