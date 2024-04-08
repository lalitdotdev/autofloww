import { ConnectionProviderProps } from '@/providers/connections-provider';
import { EditorCanvasCardType } from './types';

// Setting the data in the event dataTransfer object to the nodeType and setting the effectAllowed to move the node around the canvas so that it can be dragged and dropped to the canvas from the sidebar area of the editor canvas sidebar component.
export const onDragStart = (event: any, nodeType: EditorCanvasCardType['type']) => {
  event.dataTransfer.setData('application/reactflow', nodeType);
  event.dataTransfer.effectAllowed = 'move';
};

export const onSlackContent = (nodeConnection: ConnectionProviderProps, event: React.ChangeEvent<HTMLInputElement>) => {
  nodeConnection.setSlackNode((prev: any) => ({
    ...prev,
    content: event.target.value,
  }));
};

export const onDiscordContent = (
  nodeConnection: ConnectionProviderProps,
  event: React.ChangeEvent<HTMLInputElement>,
) => {
  nodeConnection.setDiscordNode((prev: any) => ({
    ...prev,
    content: event.target.value,
  }));
};
