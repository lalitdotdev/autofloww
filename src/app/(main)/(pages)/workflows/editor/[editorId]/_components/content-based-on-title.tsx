import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import React, { useEffect } from 'react'

import { AccordionContent } from '@/components/ui/accordion'
import ActionButton from './action-button'
import { ConnectionProviderProps } from '@/providers/connections-provider'
import { EditorState } from '@/providers/editor-provider'
import GoogleDriveFiles from './google-drive-files'
import GoogleFileDetails from './google-file-details'
import { Input } from '@/components/ui/input'
import { nodeMapper } from '@/lib/types'
import { onContentChange } from '@/lib/editor-utils'
import { toast } from 'sonner'

export interface Option {
    value: string
    label: string
    disable?: boolean
    /** fixed option that can't be removed. */
    fixed?: boolean
    /** Group the options by providing key. */
    [key: string]: string | boolean | undefined
}
interface GroupOption {
    [key: string]: Option[]
}

type Props = {
    nodeConnection: ConnectionProviderProps
    newState: EditorState
    file: any
    setFile: (file: any) => void
    selectedSlackChannels: Option[]
    setSelectedSlackChannels: (value: Option[]) => void
}

const ContentBasedOnTitle = ({
    nodeConnection,
    newState,
    file,
    setFile,
    selectedSlackChannels,
    setSelectedSlackChannels,
}: Props) => {
    const { selectedNode } = newState.editor
    const title = selectedNode.data.title



    // @ts-ignore
    const nodeConnectionType: any = nodeConnection[nodeMapper[title]]
    if (!nodeConnectionType) return <p>Not connected</p>

    const isConnected =
        title === 'Google Drive'
            ? !nodeConnection.isLoading
            : !!nodeConnectionType[
            `${title === 'Slack'
                ? 'slackAccessToken'
                : title === 'Discord'
                    ? 'webhookURL'
                    : title === 'Notion'
                        ? 'accessToken'
                        : ''
            }`
            ]

    if (!isConnected) return <p>Not connected</p>

    return (
        <AccordionContent>
            <Card>
                {title === 'Discord' && (
                    <CardHeader>
                        <CardTitle>{nodeConnectionType.webhookName}</CardTitle>
                        <CardDescription>{nodeConnectionType.guildName}</CardDescription>
                    </CardHeader>
                )}
                <div className="flex flex-col gap-3 px-6 py-3 pb-20">
                    <p>{title === 'Notion' ? 'Values to be stored' : 'Message'}</p>

                </div>
            </Card>
        </AccordionContent>
    )
}

export default ContentBasedOnTitle
