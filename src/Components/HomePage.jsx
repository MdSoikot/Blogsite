import React from 'react';
import { useState, useEffect } from 'react';
import MoonLoader from "react-spinners/MoonLoader";
import '../index.css';
import axios from 'axios';


export default function HomePage() {
    const override = `
  display: block;
  margin: 0 auto;
  margin-top:200px;
`;
    const [fetchData, setFetchData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        axios
            .get("http://127.0.0.1:8000/api/retriveData")
            .then(response => {
                setFetchData(response.data)
                setLoading(false)
            })
            .catch(error => console.log(error))
    }, []);


    const dateFormat = (d) => new Date(d).toLocaleString('en-us', { weekday: "long", month: "long", year: 'numeric', day: 'numeric' })
    // const filterPost = item => {return item.replace(/(<([^>]+)>)/ig, '')}

    console.log('%c $render homepage', 'background:gray;padding:3px;border-radius:5px;color:white')

    return (


        <div className="HomePage">
            <div className="Sidebar">
            </div>

            <div className="Main-content">
                <div className="Heading">
                    <h2>All Post List</h2>

                </div>
                {loading ? <div>
                    <MoonLoader
                        css={override}
                        size={50}
                        margin={'auto'}
                        color={"#36D7B7"}
                        loading={loading}
                    />
                </div> : ""}
                {fetchData.length>0?fetchData.map((item) => (

                    <div className="test">
                        <div className="Title">

                            <h4 key={item.id}>{item.title}</h4>

                        </div>
                        <div className="Sub-Title">
                            <p>{
                                dateFormat(item.created_at)


                            }</p>
                        </div>
                        <div className="Post-image">
                            <img alt="imgage not found" key={item.id} src={"http://127.0.0.1:8000/uploads/" + item.post_image} />
                        </div>
                        <div className="Post-content">
                            {item.post}

                        </div>
                    </div>
                )):"No post available"}

            </div>

            <div className="Right-sidebar">

            </div>

        </div>

    )
}
