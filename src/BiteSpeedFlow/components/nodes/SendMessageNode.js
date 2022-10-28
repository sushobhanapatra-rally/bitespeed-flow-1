import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';
import useStore from '../../store';
import './SendMessageNode.css';

const handleStyle = { left: 10 };

export function SendMessageNode({ id, data }) {
    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
    }, []);
    const nodes = useStore((s) => s.nodes);
    const getIsSourceOccupied = (nodeId) => nodes.find((node) => node.id === nodeId)?.data.isSourceOccupied;
    const isValidConnection = (connection) => { console.log(getIsSourceOccupied(connection.source)); return !getIsSourceOccupied(connection.source); }

    return (
        <>
            <Handle type="target" position={Position.Left} />
            <div className="custom-node">
                <div className="custom-node-head">
                    {data.bIcon && (
                        <i className={`bi ${data.bIcon} custom-node-head-icon`}></i>
                    )}
                    <p className="custom-node-head-title">Send Message</p>
                </div>
                <div className="custom-node-body">
                    <p
                        style={data.style}
                        className="custom-node-body-text"
                    >
                        {data.message}
                    </p>

                </div>
            </div>
            <Handle type="source" position={Position.Right} id="a" isValidConnection={isValidConnection} />
        </>
    );
}