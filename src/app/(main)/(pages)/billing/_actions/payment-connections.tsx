'use server'

import { currentUser } from '@clerk/nextjs'
import { db } from '@/lib/db'

export const fetchUserPaymentInfo = async () => {
    const user = await currentUser()

    if (user) {
        const connection = await db.user.findFirst({
            where: {
                clerkId: user.id,
            },
            select: {
                tier: true,
                credits: true,
            },
        })

        if (user) {
            return connection
        }
    }
}
