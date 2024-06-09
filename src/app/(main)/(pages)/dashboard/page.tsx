import { Settings, Waypoints, Workflow } from 'lucide-react'

import Link from 'next/link'
import React from 'react'
import SkewedInfiniteScroll from '@/components/global/SkewedInfiniteScroll'
import { currentUser } from '@clerk/nextjs/server'

const DashboardPage = async () => {
    const user = await currentUser()
    return (
        <div className="flex flex-col gap-4 relative">
            <h1 className="text-4xl sticky top-0 z-[10] p-6 bg-background/50 backdrop-blur-lg flex items-center border-b">
                Dashboard
            </h1>
            <div className="flex flex-col gap-4 p-6">
                <h2 className="text-2xl">Welcome to the dashboard
                    <span className="text-primary ml-1">{user?.firstName}</span>
                </h2>
                <p className="text-gray-600">
                    Here you can manage your connections, workflows, and more.
                </p>
                <div className="flex flex-col md:flex-row gap-10">
                    <div className='flex items-center gap-4' >
                        <Waypoints size={32} />

                        <Link href="/connections" className="bg-muted-foreground px-4 py-2 rounded-md text-white dark:text-black w-60" type='button'>
                            Manage Connections
                        </Link>
                    </div>

                    <div className='flex items-center gap-4' >
                        <Workflow size={32} />

                        <Link href="/workflows" className="bg-muted-foreground px-4 py-2 rounded-md text-white dark:text-black w-60" type='button'>
                            Manage Workflows
                        </Link>
                    </div>

                    <div className='flex items-center gap-4' >
                        <Settings size={32} />

                        <Link href="/settings" className="bg-muted-foreground px-4 py-2 rounded-md text-white dark:text-black w-60" type='button'>
                            Manage Settings
                        </Link>
                    </div>



                </div>


            </div>

            <div className='flex gap-4 p-6 w-full'>  <SkewedInfiniteScroll /></div>

        </div>





    )
}

export default DashboardPage
