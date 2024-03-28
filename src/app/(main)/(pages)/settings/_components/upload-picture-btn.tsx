'use client'

import * as LR from '@uploadcare/blocks'

import React, { useEffect, useRef } from 'react'

import { useRouter } from 'next/navigation'

type Props = {
    onUpload: (e: string) => any
}

LR.registerBlocks(LR)

const UploadProfileButton = ({ onUpload }: Props) => {
    const router = useRouter()
    const ctxProviderRef = useRef<
        typeof LR.UploadCtxProvider.prototype & LR.UploadCtxProvider
    >(null)

    useEffect(() => {
        const handleUpload = async (e: any) => {
            const file = await onUpload(e.detail.cdnUrl)
            if (file) {
                router.refresh()
            }
        }

        const ctxProvider = ctxProviderRef.current;
        if (!ctxProvider) return;
        //Provider: listening to "file-upload-success" event and calling handleUpload
        ctxProviderRef.current.addEventListener('file-upload-success', handleUpload)
    }, [])

    return (
        <div>
            <lr-config
                ctx-name="my-uploader"
                pubkey="93648719a44c364440f5"
            />

            <lr-file-uploader-regular
                ctx-name="my-uploader"
                css-src={`https://cdn.jsdelivr.net/npm/@uploadcare/blocks@0.35.2/web/lr-file-uploader-regular.min.css`}
            />

            <lr-upload-ctx-provider
                ctx-name="my-uploader"
                ref={ctxProviderRef}
            />
        </div>
    )
}

export default UploadProfileButton
