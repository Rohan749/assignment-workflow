import React from 'react'
import "./DesignModules.css"



const DesignModules = (props) => {

    const onDragStart = (event, nodeType) => {
    const data = { id: props.id, name: props.name, input: props.input, output: props.output}
    event.dataTransfer.setData('application/reactflow', JSON.stringify(data));
    event.dataTransfer.effectAllowed = 'move';
  };


  return (
    <>
        <div className='designModules_body'  onDragStart={(event) => onDragStart(event, 'default')} draggable>
            <div className='module_section smaller'> <span>{props.input}</span>  </div>
            <div className='module_section name'> <span>{props.name}</span> </div>
            <div className='module_section smaller'> <span>{props.output}</span> </div>
        </div>
    </>
  )
}

export default DesignModules