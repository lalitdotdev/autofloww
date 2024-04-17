import React from 'react'
import SkewedInfiniteScroll from '@/components/global/SkewedInfiniteScroll'

const DashboardPage = () => {
    return (
        <div className="flex flex-col gap-4 relative">
            <h1 className="text-4xl sticky top-0 z-[10] p-6 bg-background/50 backdrop-blur-lg flex items-center border-b">
                Dashboard
            </h1>
            <section
                className='bg-background/50 p-8 rounded-lg shadow-md sticky top-16 z-10 '
            >
                <h2 className="text-2xl font-semibold p-2">Target $10000 MRR</h2>


                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="bg-card rounded-lg p-6 shadow-md">
                        <h2 className="text-xl font-semibold">Total Users</h2>
                        <p className="text-4xl font-bold mt-2">1,000</p>
                    </div>
                    <div className="bg-card rounded-lg p-6 shadow-md">
                        <h2 className="text-xl font-semibold">Total Revenue</h2>
                        <p className="text-4xl font-bold mt-2">$10,000</p>
                    </div>
                    <div className="bg-card rounded-lg p-6 shadow-md">
                        <h2 className="text-xl font-semibold">Total Orders</h2>
                        <p className="text-4xl font-bold mt-2">100</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default DashboardPage
