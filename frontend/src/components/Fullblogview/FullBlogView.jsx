import React, { useContext, useEffect, useState } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { UserContext } from "../../Context/userContext";
import Commentcomp from "../Comment/Commentcomp";
import axios from "axios";
import { AiOutlineLike } from "react-icons/ai";
import { MdOutlineBugReport } from "react-icons/md";
import { MdBugReport } from "react-icons/md";

function FullBlogView() {
    const blogcontext = useContext(UserContext);
    const [blog, setBlog] = useState(null);
    const [comment, setComment] = useState(null);
    const [commenttmsg, setCommentmsg] = useState("");
    
    const fetchData = async () => {
        try {
            const result = await axios.get("http://localhost:8000/event/" + blogcontext.bloginfo);
            // console.log("result : ",result);
            setBlog(result.data.blog);
            // console.log("blog info",blog);
            if (JSON.stringify(result.data.comments) !== JSON.stringify(comment)) {
                setComment(result.data.comments);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {

        // call the function
        fetchData();
    }, []);

    //Comment function

    function onchangeHandler(e) {
        setCommentmsg([e.target.name] = e.target.value);
    }

    async function clickHandler(e) {
        e.preventDefault();
        // console.log(commenttmsg);
        const userinfo = {
            "content": commenttmsg,
            "user_id": blogcontext.user._id,
        }
        // console.log(userinfo);
        axios.post("http://localhost:8000/event/comment/" + blog._id , userinfo)
            .then((res) => {
                // console.log(res);
                fetchData();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleLike() {
        axios.put("http://localhost:8000/event/like/" + blog._id)
            .then((result) => {
                fetchData();
            })
            .catch((err) => {
                console.log(err);
            })
    }
    
    function handleDislike() {
        axios.put("http://localhost:8000/event/dislike/" + blog._id)
            .then((result) => {
                fetchData();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleReport() {
        axios.put("http://localhost:8000/event/report/" + blog._id)
            .then((result) => {
                fetchData();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <>
            <div className="px-10 py-5">
                <div>
                    <p className="text-3xl font-semibold">{blog ? blog.title:"title"}</p>
                </div>
                <div className="mt-5">
                    <img
                        src={blog ? blog.coverImgURL: "https://imgs.search.brave.com/t4AHxPlgrAcFoPfqEHO5U2w3OFZsFCNHBTzlPPSrL_4/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9kMWNz/YXJrejhvYmU5dS5j/bG91ZGZyb250Lm5l/dC9wb3N0ZXJwcmV2/aWV3cy91cGNvbWlu/Zy1ldmVudHMtc2No/ZWR1bGUtdmlkZW8t/ZGVzaWduLXRlbXBs/YXRlLTc3NGU0YTU2/ZDYxNDRhZjc2NTM2/MmU4OGMxYmFjMWZk/LmpwZz90cz0xNjk4/MDMxOTI4"}
                        className="w-2/5 rounded-lg"
                    ></img>
                </div>
                <div className="flex mt-4">
                    <div className="flex gap-3 py-1">
                    <AiOutlineLike className=" cursor-pointer" onClick={handleLike} />
                    </div>
                    <p className="mx-2">{blog && blog.like}</p>
                    <div className="py-1 ml-4">
                        { blog && blog.report <= 5 ?
                            <MdOutlineBugReport className="cursor-pointer" onClick={handleReport}/>
                            :
                            <MdBugReport />
                        }
                    </div>
                    <p className="mx-2">{blog && blog.report}</p>
                </div>
                <div className="mt-5">
                    <pre className=" font-medium overflow-hidden">
                        {blog? blog.body : "body"}
                    </pre>
                </div>

                {/* Author Detail */}
                <div className="mt-5">
                    <div className="max-w-sm flex items-center rounded-md space-x-3">
                        <div>
                            <img
                                className="w-14 h-14 rounded-lg"
                                src="https://imgs.search.brave.com/RSH2MPgnMPPQdCsrXCAsD8-7SLJmwYriB7gIttwKSLg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMTIvQXZh/dGFyLVByb2ZpbGUt/UE5HLVBob3Rvcy5w/bmc"
                                alt="not found">    
                            </img>
                        </div>
                        <div>
                            <div className="text-medium font-medium text-black">
                                Organized
                                <p className=" text-slate-500">By {'Fitpage User'}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Comment Section */}  
                <div className="mt-5">
                    <div>
                        <form onSubmit={clickHandler} method="post">
                            <Input
                                type="text"
                                onChange={onchangeHandler} 
                                name="content"
                                placeholder="Review Here"
                                /> 
                            <div className="w-24">
                                <Button type="submit" value="Review" />
                            </div>
                        </form>
                    </div>
                    <div className="mt-5">
                        {comment ?
                            comment.map((info) => {
                                return <Commentcomp key={info.eventId} user={info.createdBy.email.split("@")[0]} msg={info.content} />
                            })
                            :
                                ""
                        }
                    </div>
                </div>

            </div>
        </>
    )
}

export default FullBlogView;