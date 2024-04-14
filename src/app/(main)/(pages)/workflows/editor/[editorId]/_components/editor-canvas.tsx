'use client'

import 'reactflow/dist/style.css'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import ReactFlow, {
    Background,
    Controls,
    EdgeChange,
    MiniMap,
    NodeChange,
    ReactFlowInstance,
} from 'reactflow'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from '@/components/ui/resizable'

import EditorCanvasSidebar from './editor-canvas-sidebar'
import { EditorNodeType } from '@/lib/types'
import FlowInstance from './flow-instance'
import { useEditor } from '@/providers/editor-provider'

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
