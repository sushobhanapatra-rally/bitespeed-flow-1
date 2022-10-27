import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';
import useStore from '../../store';

const handleStyle = { left: 10 };

export function SendMessageNode({ id, data }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);
  const nodes = useStore((s) => s.nodes);
  const getIsSourceOccupied = (nodeId) => nodes.find((node) => node.id === nodeId)?.data.isSourceOccupied;
  const isValidConnection = (connection) => {console.log(getIsSourceOccupied(connection.source)); return !getIsSourceOccupied(connection.source);}

  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div>
        <label >Send Message</label>
        <br></br>
        <label>{data.message}</label>
      </div>
      <Handle type="source" position={Position.Right} id="a" isValidConnection={isValidConnection}/>
    </>
  );
}