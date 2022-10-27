import React from 'react';
import { node_types } from '../../constants/node_types';
import useStore from '../../store';


export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };
  const nodes = useStore((s) => s.nodes);
  const isValidFlow = () => { const filterNodes = nodes.filter((node) => node.data.isTargetOccupied < 1); return filterNodes.length <= 1;}
  const onClickSave = (e) => { isValidFlow() ? console.log('valid'): console.log("invalid");}


  return (
    <aside>
      <button onClick={onClickSave}>
        Save
      </button>
      <div className="description">You can drag these nodes to the pane on the left.</div>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, node_types.SEND_MESSAGE)} draggable>
        Send Messagea
      </div>
    </aside>
  );
};