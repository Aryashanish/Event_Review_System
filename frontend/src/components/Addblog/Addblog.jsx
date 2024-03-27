import React, { useContext, useState} from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { UserContext } from "../../Context/userContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Addblog() {
    const navigate = useNavigate();
    const userInfo = useContext(UserContext);
    const [eventInfo, seteventInfo] = useState({});

    function clickHandler(e) {
        seteventInfo((lastvalue) => {
          return {
              ...lastvalue,
            [e.target.name]: e.target.value,
          };
        });
    }

    function postedBlog(e) {
        e.preventDefault();
        seteventInfo((lastvalue) => {
            return {
                ...lastvalue,
                "user_id": userInfo.user._id,
            };
        });
        
        console.log(eventInfo);
        axios.post('http://localhost:8000/event', eventInfo)
            .then((res) => {
                console.log("Successfull post", res.data.msg);
                navigate('/event');
            })
            .catch((err) => {
                console.log("Error ", err);
            })

    };



    return (
        <>
            <div className="grid place-content-center mt-5 p-6">
                <h1 className="text-center font-semibold text-2xl text-orange-700">Post New Blog</h1>
                <form className="mt-4" onSubmit={postedBlog}>
                    <div>
                        <label>Event Template</label>
                        <Input
                            type="text"
                            placeholder="Enter Event Thumbnail URL"
                            name="imgurl"
                            onChange={clickHandler}
                        />
                    </div>
                    <div>
                        <label className="">Title</label>
                        <Input
                            type="text"
                            placeholder="Enter Event Title"
                            name="title"
                            onChange={clickHandler}
                    />
                    </div>
                    <div>
                        <label className="">Description</label>
                        <br></br>
                        <textarea
                            name="body" rows="4" cols="70"
                            className="border-2 border-slate-200 rounded-lg shadow-md"
                            onChange={clickHandler}
                        ></textarea>
                    </div>
                    <div>
                        <Button value="Post"></Button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Addblog;