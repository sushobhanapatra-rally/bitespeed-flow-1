import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import ReactFlow, { ReactFlowProvider, Controls, Background, applyEdgeChanges, applyNodeChanges, addEdge } from 'reactflow';
import { SendMessageNode } from './nodes';
import 'reactflow/dist/style.css';
import useStore from '../store';
import { node_types } from '../constants/node_types';
import NodePanel from './panel/NodePanel';
import ControlPanel from './panel/ControlPanel';
import './Flow.css';

let id = 1;
const getId = () => `${id++}`;

function Flow() {
    const [isNodesPanel, setIsNodesPanel] = useState([true, null]);

    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    
    const [validation, setValidation] = useState(null);

    const reactFlowWrapper = useRef(null);

    const nodeTypes = useMemo(() => ({ [node_types.SEND_MESSAGE]: SendMessageNode }), []);

    const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore();

    const addNode = useStore((s) => s.addNode);
    const onEdgesDelete = useStore((s) => s.onEdgesDelete);


    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const type = event.dataTransfer.getData('application/reactflow');

            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
                return;
            }

            const position = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });
            const newNode = {
                id: getId(),
                type,
                position,
                data: { label: `${type} node`, isSourceOccupied: false, isTargetOccupied: 0 },
            };
            console.log(newNode);
            addNode(newNode);
        },
        [reactFlowInstance]
    );

    const onNodeClick = useCallback((event, node) => {
        console.log(node.id);
        setIsNodesPanel([false, node]);

    }, []);

    const onPaneClick = useCallback((event) => {
        setIsNodesPanel([true, null]);
    }, []);

    const onEdgesDeleteEvent = useCallback((event) => {
        onEdgesDelete(event.map((event) => event.source));
    }, []);

    const isValidFlow = () => { const filterNodes = nodes.filter((node) => node.data.isTargetOccupied < 1); return filterNodes.length <= 1; }
    const onClickSave = (e) => { isValidFlow() ? setValidation(true) : setValidation(false); }

    return (
        <>
            <div className="saveBar">
                { validation === true && <div className="Successmessage"> Successfully Saved </div> }
                { validation === false && <div className="Failuremessage"> Cannot save a flow </div> }
                <button className="save" onClick={onClickSave}>
                    Save
                </button>
            </div>
            <div className="dndflow">
                <ReactFlowProvider>
                    <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                        <ReactFlow
                            nodeTypes={nodeTypes}
                            nodes={nodes}
                            edges={edges}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            onEdgesDelete={onEdgesDeleteEvent}
                            onNodeClick={onNodeClick}
                            onConnect={onConnect}
                            onInit={setReactFlowInstance}
                            onDrop={onDrop}
                            onDragOver={onDragOver}
                            onPaneClick={onPaneClick}
                            fitView
                        >
                            <Controls />
                        </ReactFlow>
                    </div>
                    {isNodesPanel[0] ? <NodePanel /> : <ControlPanel nodeId={isNodesPanel[1]?.id} message={isNodesPanel[1]?.message} />}
                </ReactFlowProvider>
            </div>
        </>
    );
}

export default Flow;