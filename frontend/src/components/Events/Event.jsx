import {useEffect, useState } from "react";
import Card from "../Card/Card";
import axios from "axios";

function Event() {
    const [totalEvent, setTotalblog] = useState([]);

    async function loadingAllblogs() {
        try {
            const response = await axios.get('http://localhost:8000/');
            const events = response.data.events;
            setTotalblog(events);
            console.log(events);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        loadingAllblogs();
    },[]);
    
    return (
        <>
            <div className="p-5 grid grid-cols-4">
            {
                totalEvent.map((event) => {
                    return <Card key={event._id} imgURL={event.coverImgURL} id={event._id} title={event.title} like={event.like} report={event.report} />
                })     
            }
            </div>
        </>
    );
}

export default Event;
