import { EditUserProfileSchema } from "@/lib/types"
import { useForm } from "react-hook-form"
import { useState } from "react";
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod';

type ProfileFormProps = {
    user: any,
    onUpdate?: any
}

const ProfileForm = ({ user, onUpdate }: ProfileFormProps) => {
    const [loading, setLoading] = useState(false)


    const form = useForm<z.infer<typeof EditUserProfileSchema>>({
        mode: 'onChange',
        resolver: zodResolver(EditUserProfileSchema),
        defaultValues: {
            name: user.name,
            email: user.email,
        },
    })

    return (
        <div>
        </div>
    )
}

export default ProfileForm
