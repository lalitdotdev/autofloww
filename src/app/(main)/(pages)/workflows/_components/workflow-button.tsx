'use client'

import { Button } from '@/components/ui/button'
import CustomModal from '@/components/global/custom-modal'
import { Plus } from 'lucide-react'
import React from 'react'
import Workflowform from '@/components/forms/workflow-form'
import { useModal } from '@/providers/modal-provider'

type Props = {}

const WorkflowButton = (props: Props) => {
    const { setOpen, setClose } = useModal()


    const handleClick = () => {
        setOpen(
            <CustomModal
                title="Create a Workflow Automation"
                subheading="Workflows are a powerfull that help you automate tasks."
            >

                <Workflowform />
            </CustomModal>
        )
    }

    return (
        <Button
            size={'icon'}
            {...(true
                ? {
                    onClick: handleClick,
                }
                : {
                    disabled: true,
                })}
        >
            <Plus />
        </Button>
    )
}

export default WorkflowButton
