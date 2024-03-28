'use client'

import { Book, Headphones, Search, User2 } from 'lucide-react'
import React, { useEffect } from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'

import { Input } from '@/components/ui/input'
import { UserButton } from '@clerk/nextjs'

type Props = {}

const InfoBar = (props: Props) => {
    return (
        <div className="flex flex-row justify-end gap-6 items-center px-4 py-4 w-full dark:bg-black ">
            <span className="flex items-center gap-2 font-bold">
                <p className="text-sm font-light text-gray-300">Credits</p>
                {true ? (
                    <span>Unlimited</span>
                ) : (
                    <span>
                        <span>0</span>

                    </span>
                )}
            </span>
            <span className="flex items-center rounded-full bg-muted px-4">
                <Search />
                <Input
                    placeholder="Quick Search"
                    className="border-none bg-transparent rounded-full "
                />
            </span>
            <TooltipProvider>
                <Tooltip delayDuration={0}>
                    <TooltipTrigger>
                        <Headphones />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Contact Support</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip delayDuration={0}>
                    <TooltipTrigger>
                        <Book />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Guide</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <UserButton />
        </div>
    )
}

export default InfoBar
