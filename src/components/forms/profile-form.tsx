"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

import { Button } from "../ui/button";
import { EditUserProfileSchema } from "@/lib/types"
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form"
import { useState } from "react";
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod';

type ProfileFormProps = {
    user: any,
    onUpdate?: any
}

const ProfileForm = ({ user, onUpdate }: ProfileFormProps) => {
    const [isLoading, setIsLoading] = useState(false)


    const form = useForm<z.infer<typeof EditUserProfileSchema>>({
        mode: 'onChange',
        resolver: zodResolver(EditUserProfileSchema),
        defaultValues: {
            name: user.name,
            email: user.email,
        },
    })


    const handleSubmit = async (
        values: z.infer<typeof EditUserProfileSchema>
    ) => {
        setIsLoading(true)
        await onUpdate(values.name)
        setIsLoading(false)
    }




    return (
        <Form {...form}>
            <form
                className="flex flex-col gap-6"
                onSubmit={form.handleSubmit(handleSubmit)}
            >
                <FormField
                    disabled={isLoading}
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg">User full name</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Name"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className="self-start hover:bg-[#2F006B] hover:text-white "
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving
                        </>
                    ) : (
                        'Save User Settings'
                    )}
                </Button>
            </form>
        </Form>

    )
}

export default ProfileForm
