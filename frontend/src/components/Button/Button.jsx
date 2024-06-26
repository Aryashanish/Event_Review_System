import React from "react";

function Button(props){
    return (
        <div className="w-full">
            <button className="bg-blue-500 p-1 rounded-md text-xl cursor-pointer hover:bg-sky-400 font-semibold mt-3 w-full" type="submit">{props.value}</button>
        </div>
    )
}

export default Button;