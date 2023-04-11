import React from 'react'
import "./WorkFlowItems.css"
import { Link } from 'react-router-dom';

const WorkFlowItems = (props) => {


  const dateTimeString = props.created;
  const date = new Date(dateTimeString).toISOString().slice(0, 10);

  return (
    <>
    <Link to='/Designer' state={{ value: props.name }}>
      <div className='items_body'>
        <div className='items_details'>
          <div className='items_value item_name'>{props.name}</div>
          <div className='items_value item_type'>{props.input_type}</div>
          <div className='items_value item_created'>{date}</div>
        </div>
      </div>
      </Link>
    </>
  )
}

export default WorkFlowItems