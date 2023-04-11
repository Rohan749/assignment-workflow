import React, { useState, useEffect } from 'react'
import "./WorkFlowList.css"
import WorkFlowItems from './WorkFlowItems'
import axios from 'axios'


const WorkFlowList = () => {

    const [detail, setDetail] = useState([]);

    useEffect(() => {
        axios.get('https://64307b10d4518cfb0e50e555.mockapi.io/workflow')
            .then(response => setDetail(response.data))
            .catch(error => console.log(error));
    }, []);



  return (
    <>
    <div className='workflow_heading'>Workflows</div>
    {detail.length != 0 ?
    <div className='workflow_body'>
        <div>
        <div className='workflow_details'>
            <div className='workflow_value name'>Name</div>
            <div className='workflow_value inputtype'>Input Type</div>
            <div className='workflow_value date_created'>Created At</div>
        </div>

        {detail.map((val)=>{
            return <WorkFlowItems 
                key = {val.id}
                name = {val.name}
                created = {val.createdAt}
                input_type = {val.input_type}
            />
        })}
        </div>
    </div> : <h1 className='loading_page'>Loading...</h1>
    }
    </>
  )
}

export default WorkFlowList