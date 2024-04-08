'use client'

import { Card, CardDescription } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { CardContainer } from '@/components/global/3d-card'
import axios from 'axios'
import { getGoogleListener } from '../../../_actions/workflow-connections'
import { toast } from 'sonner'

type Props = {}

const GoogleDriveFiles = (props: Props) => {
    const [loading, setLoading] = useState(false)
    const [isListening, setIsListening] = useState(false)


    // for listening to google drive files changes and create listener for that change
    const reqGoogle = async () => {
        setLoading(true)
        const response = await axios.get('/api/drive-activity')
        if (response) {
            toast.message(response.data)
            setLoading(false)
            setIsListening(true)
        }
        setIsListening(false)
    }

    const onListener = async () => {
        const listener = await getGoogleListener()
        if (listener?.googleResourceId !== null) {
            setIsListening(true)
        }
    }

    useEffect(() => {
        onListener()
    }, [])

    return (
        <div className="flex flex-col gap-3 pb-6">
            Google Drive Files
        </div>
    )
}

export default GoogleDriveFiles
