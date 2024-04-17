'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import UploadProfileButton from './upload-picture-btn'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Props = {
    userImage: string | null
    onDelete?: any
    onUpload: any
}

const ProfilePicture = ({ userImage, onDelete, onUpload }: Props) => {
    const router = useRouter()

    const onRemoveProfileImage = async () => {
        const response = await onDelete()
        if (response) {
            router.refresh()
        }
    }

    return (
        <div className="flex flex-col">
            <p className="text-lg text-white"> Profile Picture</p>
            <div className="flex h-[30vh] flex-col items-center justify-center">
                {userImage ? (
                    <>
                        <div className="sm:m-0 relative shadow-lg rounded-full overflow-hidden h-[86px] w-[86px] md:h-[180px] md:w-[180px] flex justify-center items-center">
                            {/* check if user has image then show image else show upload button */}

                            <Image
                                src={userImage}

                                alt=""
                                className="rounded-full object-cover border-4 border-[#2F006B]"
                                fill
                            />

                        </div>
                        <Button
                            onClick={onRemoveProfileImage}
                            className="bg-transparent text-white/70 hover:bg-transparent hover:text-white"
                        >
                            <X /> Remove Logo
                        </Button>
                    </>
                ) : (
                    <UploadProfileButton onUpload={onUpload} />
                )}
            </div>
        </div>
    )
}

export default ProfilePicture
