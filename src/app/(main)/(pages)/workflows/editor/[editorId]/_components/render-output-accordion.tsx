import { ConnectionProviderProps } from '@/providers/connections-provider'
import ContentBasedOnTitle from './content-based-on-title'
import { EditorState } from '@/providers/editor-provider'
import React from 'react'
import { useFlowwStore } from '@/store'

type Props = {
    state: EditorState
    nodeConnection: ConnectionProviderProps
}

const RenderOutputAccordion = ({ state, nodeConnection }: Props) => {
    const {
        googleFile,
        setGoogleFile,
        selectedSlackChannels,
        setSelectedSlackChannels,
    } = useFlowwStore()
    return (
        <ContentBasedOnTitle
            nodeConnection={nodeConnection}
            newState={state}
            file={googleFile}
            setFile={setGoogleFile}
            selectedSlackChannels={selectedSlackChannels}
            setSelectedSlackChannels={setSelectedSlackChannels}
        />
    )
}

export default RenderOutputAccordion
