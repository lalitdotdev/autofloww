'use client'

import React, { useState } from 'react'

import axios from 'axios'
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


    return (
        <div className="flex flex-col gap-3 pb-6">
            Google Drive Files
        </div>
    )
}

export default GoogleDriveFiles
