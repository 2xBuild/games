interface BoxProps {
    id: number;
    bgcolor: string;
    onClick?: (id: number) => void
}

export default function Box({ id, bgcolor , onClick=() => {}}: BoxProps) {
    return (
        <div
            className={`h-[150px] w-[150px] m-[1.5px] border rounded-lg dark:border-gray-800 ${bgcolor}`} onClick={() => onClick(id)}>
    
       
            { /*basically an empty div.*/}
        </div>
    );
}


//submitAns(id)