import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = { left: 10 };

export function SendMessageNode({ data }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div>
        <label >Send Message</label>
        <br></br>
        <label>{data.message}</label>
      </div>
      <Handle type="source" position={Position.Right} id="a" />
    </>
  );
}