import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  useReactFlow
} from 'reactflow';
import 'reactflow/dist/base.css';
import "./ReactFlowSection.css"


const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'input node' },
    position: { x: 0, y: 5 },
    style: {
      fontSize: '10px',
      color: 'rgb(67, 67, 67)',
      borderRadius: '3px',
      padding: '4px',
      width: '8rem',
      textAlign: 'center',
      backgroundColor: `rgb(231, 231, 255)`,
      border: '1px solid rgb(231, 231, 231)'
    }
  },
];

const initialEdges = [];

let id = -5;
const getId = () => `dndnode_${id++}`;

const ReactFlowSection = () => {

  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const getNodes = useReactFlow()


  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);


  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';

  }, []);

  const nodeStyle = {
    border: '1px solid red',
    width: '10rem',
    backgroundColor: 'rgb(231, 231, 255',
    borderRadius: '3px'

  }

  const connectedStyle = {
    border: '1px solid black',
    width: '10rem',
    backgroundColor: 'rgb(231, 231, 255',
    borderRadius: '3px'

  }

  useEffect(() => {

    edges.forEach(edge => {
      const srcNode = nodes.find(node => node.id === edge.target)
      srcNode.style = connectedStyle 
    })

  },[edges])


  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const data = JSON.parse(event.dataTransfer.getData('application/reactflow'))


      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: getId(),
        type: 'default',
        position,
        style: nodeStyle,
        data: {
          label:
            <div className='dragged_body'>
              <div className='dragg _output'>{data.input}</div>
              <div className='dragg _name'>{data.name}</div>
              <div className='dragg _input'>{data.output}</div>
            </div>
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  return (
    <div className="dndflow">
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
          Background
        >
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
};

export default ReactFlowSection;