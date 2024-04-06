import React from 'react'
import Workflow from './workflow'

type Props = {}

const Workflows = async (props: Props) => {

    return (
        <div className="relative flex flex-col gap-4">
            <section className="flex flex-col m-2">
                <Workflow
                    name="Test"
                    description="This is a test workflow"
                    id="123"
                    publish={true}

                />
            </section>
        </div>
    )
}

export default Workflows
