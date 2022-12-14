import create from 'zustand';
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';

import initialNodes from './constants/nodes';
import initialEdges from './constants/edges';


// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onEdgesDelete: (nodes) => {
    set({
      nodes: get().nodes.map((node) => {
        if (nodes.includes(node.id)) {
          // it's important to create a new object here, to inform React Flow about the changes
          node.data = { ...node.data, isSourceOccupied: false, isTargetOccupied: node.data.isTargetOccupied-1 };
        }
        return node;
      }),
    });
  },
  onConnect: (connection) => {
    set({
      edges: addEdge(connection, get().edges),
      nodes: get().nodes.map((node) => {
        if (node.id === connection.source) {
          // it's important to create a new object here, to inform React Flow about the changes
          node.data = { ...node.data, isSourceOccupied: true };
        }
        if (node.id === connection.target) {
          // it's important to create a new object here, to inform React Flow about the changes
          node.data = { ...node.data, isTargetOccupied: node.data.isTargetOccupied + 1 };
        }
        return node;
      }),
    });
  },
  addNode: (new_node) => {
    set({
      nodes: get().nodes.concat(new_node),
    });
  },
  setNodeMessage: (nodeId, message) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          // it's important to create a new object here, to inform React Flow about the changes
          node.data = { ...node.data, message };
        }
        return node;
      }),
    });
  }
}));

export default useStore;