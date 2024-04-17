import { ConnectionsProvider } from '@/providers/connections-provider'
import EditorCanvas from './_components/editor-canvas'
import EditorProvider from '@/providers/editor-provider'
import React from 'react'

type Props = {}

const EditorPage = (props: Props) => {
    return (
        <div className="h-full">
            <EditorProvider>
                <ConnectionsProvider>
                    <EditorCanvas />
                </ConnectionsProvider>
            </EditorProvider>
        </div>
    )
}

export default EditorPage
