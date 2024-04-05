'use client'
import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import React from 'react'

const statuses: {label: string, value?: Status}[] = [
    {label: "All"},
    {label: "Open", value: "OPEN"},
    {label: "Closed", value: 'CLOSED'},
    {label: "In_Progress", value: 'IN_PROGRESS'}
]

const IssueStatusFilter = () => {

    const router = useRouter()

  return (
    <Select.Root onValueChange={(status) => {
        const query = status!=="null" ? `?status=${status}` : ""
        router.push("/issues"+query)
    }}>
        <Select.Trigger placeholder='Filter by status...'></Select.Trigger>
        <Select.Content color='violet'>
            {
                statuses.map((status) => (
                    <Select.Item key={status.value} value={status.value || "null"}>
                        {status.label}
                    </Select.Item>
                ))
            }
        </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter