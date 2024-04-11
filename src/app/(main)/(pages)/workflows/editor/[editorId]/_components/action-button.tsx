import React, { useCallback } from 'react'

import { Button } from '@/components/ui/button'
import { ConnectionProviderProps } from '@/providers/connections-provider'
import { Option } from './content-based-on-title'
import { onCreateNewPageInDatabase } from '@/app/(main)/(pages)/connections/_actions/notion-connection'
import { onCreateNodeTemplate } from '../../../_actions/workflow-connections'
import { postContentToWebHook } from '@/app/(main)/(pages)/connections/_actions/discord-connection'
import { postMessageToSlack } from '@/app/(main)/(pages)/connections/_actions/slack-connection'
import { toast } from 'sonner'
import { usePathname } from 'next/navigation'

type Props = {
    currentService: string
    nodeConnection: ConnectionProviderProps
    channels?: Option[]
    setChannels?: (value: Option[]) => void
}

const ActionButton = ({
    currentService,
    nodeConnection,
    channels,
    setChannels,

}: Props) => {
    const pathname = usePathname();
    const onSendDiscordMessage = useCallback(async () => {
        const response = await postContentToWebHook(
            nodeConnection.discordNode.content,
            nodeConnection.discordNode.webhookURL
        )

        if (response.message == 'success') {
            nodeConnection.setDiscordNode((prev: any) => ({
                ...prev,
                content: '',
            }))
        }
    }, [nodeConnection.discordNode])
    const onStoreNotionContent = useCallback(async () => {
        console.log(
            nodeConnection.notionNode.databaseId,
            nodeConnection.notionNode.accessToken,
            nodeConnection.notionNode.content
        )
        const response = await onCreateNewPageInDatabase(
            nodeConnection.notionNode.databaseId,
            nodeConnection.notionNode.accessToken,
            nodeConnection.notionNode.content
        )
        if (response) {
            nodeConnection.setNotionNode((prev: any) => ({
                ...prev,
                content: '',
            }))
        }
    }, [nodeConnection.notionNode])




    return (
        <div>
            Action Button
        </div>
    )

}

export default ActionButton
