'use client'

import React from 'react'

type BillingProviderProps = {
    credits: string
    tier: string
    setCredits: React.Dispatch<React.SetStateAction<string>>
    setTier: React.Dispatch<React.SetStateAction<string>>
}

const initialValues: BillingProviderProps = {
    credits: '',
    setCredits: () => undefined,
    tier: '',
    setTier: () => undefined,
}

type WithChildProps = {
    children: React.ReactNode
}

const context = React.createContext(initialValues)
const { Provider } = context

