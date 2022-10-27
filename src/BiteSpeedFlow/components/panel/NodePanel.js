import React from 'react';
import { node_types } from '../../constants/node_types'

export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="description">You can drag these nodes to the pane on the left.</div>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, node_types.SEND_MESSAGE)} draggable>
        Send Message
      </div>
    </aside>
  );
};