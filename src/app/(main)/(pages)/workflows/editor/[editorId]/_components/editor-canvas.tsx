'use client'

import 'reactflow/dist/style.css'

import { EditorCanvasCardType, EditorNodeType } from '@/lib/types'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import ReactFlow, {
    Background,
    Connection,
    Controls,
    Edge,
    EdgeChange,
    MiniMap,
    NodeChange,
    ReactFlowInstance,
    addEdge,
} from 'reactflow'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from '@/components/ui/resizable'

import { EditorCanvasDefaultCardTypes } from '@/lib/constant'
import EditorCanvasSidebar from './editor-canvas-sidebar'
import FlowInstance from './flow-instance'
import { toast } from 'sonner'
import { useEditor } from '@/providers/editor-provider'
import { v4 } from 'uuid'

type Props = {}

const initialNodes: EditorNodeType[] = []

const initialEdges: { id: string; source: string; target: string }[] = []

const EditorCanvas = (props: Props) => {
    const { dispatch, state } = useEditor()
    const [nodes, setNodes] = useState(initialNodes)
    const [edges, setEdges] = useState(initialEdges)
    const [isWorkFlowLoading, setIsWorkFlowLoading] = useState<boolean>(false)
    const [reactFlowInstance, setReactFlowInstance] =
        useState<ReactFlowInstance>()


    const onDragOver = useCallback((event: any) => {
        event.preventDefault()
        event.dataTransfer.dropEffect = 'move'
    }, [])

    const onNodesChange = useCallback(
        (changes: NodeChange[]) => {
            //@ts-ignore
            setNodes((nds) => applyNodeChanges(changes, nds))
        },
        [setNodes]
    )


    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) =>
            //@ts-ignore
            setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
    )

    const onConnect = useCallback(
        (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
        []
    )
    const onDrop = useCallback(
        (event: any) => {
            event.preventDefault()

            const type: EditorCanvasCardType['type'] = event.dataTransfer.getData(
                'application/reactflow'
            )

            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
                return
            }

            const triggerAlreadyExists = state.editor.elements.find(
                (node) => node.type === 'Trigger'
            )

            if (type === 'Trigger' && triggerAlreadyExists) {
                toast('Only one trigger can be added to automations at the moment')
                return
            }

            // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
            // and you don't need to subtract the reactFlowBounds.left/top anymore
            // details: https://reactflow.dev/whats-new/2023-11-10
            if (!reactFlowInstance) return
            const position = reactFlowInstance.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            })

            const newNode = {
                id: v4(),
                type,
                position,
                data: {
                    title: type,
                    description: EditorCanvasDefaultCardTypes[type].description,
                    completed: false,
                    current: false,
                    metadata: {},
                    type: type,
                },
            }
            //@ts-ignore
            setNodes((nds) => nds.concat(newNode))
        },
        [reactFlowInstance, state]
    )







    return (
        <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={70}>
                <div className="flex h-full items-center justify-center">
                    <div
                        style={{ width: '100%', height: '100%', paddingBottom: '70px' }}
                        className="relative"
                    >


                        <ReactFlow
                            className="w-[300px]"
                            // onDrop={onDrop}
                            onDragOver={onDragOver}
                            nodes={state.editor.elements}
                            // onNodesChange={onNodesChange}
                            edges={edges}
                            // onEdgesChange={onEdgesChange}
                            // onConnect={onConnect}
                            onInit={setReactFlowInstance}
                            fitView
                        // onClick={handleClickCanvas}
                        // nodeTypes={nodeTypes}
                        >

                        </ReactFlow>


                    </div>
                </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel
                defaultSize={40}
                className="relative sm:block"
            >

                <div>
                    EditorcanvasSidebar here!!
                </div>

            </ResizablePanel>
        </ResizablePanelGroup>
    )
}

export default EditorCanvas

