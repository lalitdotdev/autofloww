'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface ModalProviderProps {
    children: React.ReactNode
}

export type ModalData = {}

type ModalContextType = {
    data: ModalData
    isOpen: boolean
    setOpen: (modal: React.ReactNode, fetchData?: () => Promise<any>) => void
    setClose: () => void
}


// ModalContext: A React context is created to manage modal state and actions throughout the component tree. This context is used to open and close modals and pass data to them. The context is created with a default value of an empty object, false for isOpen, and functions to open and close modals. The context is then exported to be used in other components. The ModalProvider component is created to wrap the entire application and provide the context to all components. The ModalProvider component uses the useState hook to manage the isOpen state and the data state. The setOpen function is created to open a modal and set the data for the modal. The setClose function is created to close the modal and reset the data. The ModalProvider component uses the useEffect hook to set the isMounted state to true when the component is mounted. The ModalProvider component returns the ModalContext.Provider with the value of the data, setOpen, setClose, and isOpen states. The ModalProvider component also renders the children and the showingModal component. The useModal hook is created to use the ModalContext in other components. The useModal hook returns the context if it exists, otherwise it throws an error. The useModal hook is then exported to be used in other components.



export const ModalContext = createContext<ModalContextType>({
    data: {},
    isOpen: false,
    setOpen: (modal: React.ReactNode, fetchData?: () => Promise<any>) => { },
    setClose: () => { },
})

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [data, setData] = useState<ModalData>({})
    const [showingModal, setShowingModal] = useState<React.ReactNode>(null)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const setOpen = async (
        modal: React.ReactNode,
        fetchData?: () => Promise<any>
    ) => {
        if (modal) {
            if (fetchData) {
                setData({ ...data, ...(await fetchData()) } || {})
            }
            setShowingModal(modal)
            setIsOpen(true)
        }
    }

    const setClose = () => {
        setIsOpen(false)
        setData({})
    }

    if (!isMounted) return null

    return (
        <ModalContext.Provider value={{ data, setOpen, setClose, isOpen }}>
            {children}
            {showingModal}
        </ModalContext.Provider>
    )
}

export const useModal = () => {
    const context = useContext(ModalContext)
    if (!context) {
        throw new Error('useModal must be used within the modal provider')
    }
    return context
}

export default ModalProvider



