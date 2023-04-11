import React, { useState, useEffect} from 'react'
import "./Designer.css"
import DesignModules from './DesignModules'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import ReactFlowSection from './ReactFlowSection'

const Designer = (props) => {

    const [detail, setDetail] = useState([]);
    const location = useLocation()

    useEffect(() => {
        axios.get('https://64307b10d4518cfb0e50e555.mockapi.io/modules?page=1&limit=5')
            .then(response => setDetail(response.data))
            .catch(error => console.log(error));
    }, []);



  return (
    <>
        <div className='designer_body'>
            <div className='designer_heading'><span>Workflow Name: {location.state.value}</span></div>
            {detail.length !=0 ?
            <div className='lowerDesign_body'>
                <div className='lowerDesign_left'>
                    <h3 className='moduleHead'>
                        Modules
                    </h3>
                    {detail.map((value)=>{
                        return (
                            <div>
                        <DesignModules 
                            key={value.id}
                            name={value.name}
                            input={value.input_type}
                            output={value.output_type} 
                        />
                        </div>
                        )
                    })}
                    
                </div>
                <div className='lowerDesign_right'>
                    <ReactFlowSection />
                </div>
            </div>
            : <h1 className='loading_page'>Loading...</h1>}
        </div>
    </>
  )
}

export default Designer