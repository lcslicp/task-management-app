import React from "react";

 const CardSkeletonUI = () => {
    return (
        <>
        <div className="rounded-2xl h-[120%] w-full p-32 mb-3 bg-cardwhite animate-pulse">
            &nbsp;
        </div>
        <div className="rounded-2xl h-48 w-full p-32 mb-3 bg-cardwhite animate-pulse">
            &nbsp;
        </div>
        <div className="rounded-2xl h-80 w-full p-32 mb-3 bg-cardwhite animate-pulse">
            &nbsp;
        </div>
        <div className="rounded-2xl h-20 w-full p-32 mb-3 bg-cardwhite animate-pulse">
            &nbsp;
        </div>
        </>
    )
 }

 export default CardSkeletonUI