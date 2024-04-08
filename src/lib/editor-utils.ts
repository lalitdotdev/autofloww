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

export const onNotionContent = (
  nodeConnection: ConnectionProviderProps,
  event: React.ChangeEvent<HTMLInputElement>,
) => {
  nodeConnection.setNotionNode((prev: any) => ({
    ...prev,
    content: event.target.value,
  }));
};

export const onContentChange = (
  nodeConnection: ConnectionProviderProps,
  nodeType: string,
  event: React.ChangeEvent<HTMLInputElement>,
) => {
  if (nodeType === 'Slack') {
    onSlackContent(nodeConnection, event);
  } else if (nodeType === 'Discord') {
    onDiscordContent(nodeConnection, event);
  } else if (nodeType === 'Notion') {
    onNotionContent(nodeConnection, event);
  }
};

export const onAddTemplateSlack = (nodeConnection: ConnectionProviderProps, template: string) => {
  nodeConnection.setSlackNode((prev: any) => ({
    ...prev,
    content: `${prev.content} ${template}`,
  }));
};

export const onAddTemplateDiscord = (nodeConnection: ConnectionProviderProps, template: string) => {
  nodeConnection.setDiscordNode((prev: any) => ({
    ...prev,
    content: `${prev.content} ${template}`,
  }));
};
