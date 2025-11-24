import Boxes from "./boxes";
import CopyImage from "./copyImg";

export default function HeroPage(){
    return(
        <div className="flex flex-col items-center justify-center h-screen">
          
          <div className="m-2 p-2 ml-3 text-2xl"><h1 className="font-mono font-bold">Recall Color</h1>
            <p className="font-mono text-sm ">Test your color memory.</p>
    
            </div>  
    <div className=" flex ">
 <Boxes/>

         </div>
        </div>)
}