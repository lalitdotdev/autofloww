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

    const onStoreSlackContent = useCallback(async () => {
        const response = await postMessageToSlack(
            nodeConnection.slackNode.slackAccessToken,
            channels!,
            nodeConnection.slackNode.content
        )
        if (response.message == 'Success') {
            toast.success('Message sent successfully')
            nodeConnection.setSlackNode((prev: any) => ({
                ...prev,
                content: '',
            }))
            setChannels!([])
        } else {
            toast.error(response.message)
        }
    }, [nodeConnection.slackNode, channels])


    const onCreateLocalNodeTemplate = useCallback(async () => {
        if (currentService === 'Discord') {
            const response = await onCreateNodeTemplate(
                nodeConnection.discordNode.content,
                currentService,
                pathname.split('/').pop()!
            )

            if (response) {
                toast.message(response)
            }
        }
        if (currentService === 'Slack') {
            const response = await onCreateNodeTemplate(
                nodeConnection.slackNode.content,
                currentService,
                pathname.split('/').pop()!,
                channels,
                nodeConnection.slackNode.slackAccessToken
            )

            if (response) {
                toast.message(response)
            }
        }


        if (currentService === 'Notion') {
            const response = await onCreateNodeTemplate(
                JSON.stringify(nodeConnection.notionNode.content),
                currentService,
                pathname.split('/').pop()!,
                [],
                nodeConnection.notionNode.accessToken,
                nodeConnection.notionNode.databaseId
            )

            if (response) {
                toast.message(response)
            }
        }
    }, [nodeConnection, channels])



    return (
        <div>
            Action Button
        </div>
    )

}

export default ActionButton
