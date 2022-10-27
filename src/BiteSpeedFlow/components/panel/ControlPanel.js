import React from 'react';
import { node_types } from '../../constants/node_types';
import useStore from '../../store';

export default ({ nodeId, message }) => {
    const setNodeMessage = useStore((s) => s.setNodeMessage);

  return (
    <aside>
      <div className="updatenode__controls">
        <label>label for node - {nodeId}:</label>
        <input value={message} onChange={(evt) => {setNodeMessage(nodeId, evt.target.value)}} />
      </div>
    </aside>
  );
};