'use client';
import React, { useEffect, useState } from 'react'
import { Select } from '@radix-ui/themes'
import axios from 'axios';
import { User, Issue } from '@prisma/client';
import toast, {Toaster} from 'react-hot-toast'

const AssigneeSelect = ({ issue }: { issue: Issue }) => {

    const [users, setUsers] = useState<User[] | null>(null)

    useEffect(() => {

        const getUsers = async() => {

            try {
                const response = await axios.get<User[]>("/api/users")
                const users = response.data
                setUsers(users)
            } catch (error) {
                console.log(error)
            }
        }
    
        getUsers()

    }, [])

    const assignIssues = async (userId: string) => {
        try {
            await axios.put(`/api/issues/${issue.id}`, { assignedToUserId: userId !== "null" ? userId : null})
            toast.success("Changes made successfully")
        } catch (error) {
            toast.error("Changes couldn't be saved")
        }
    }
    

  return (
    <>
    <Toaster />
    <Select.Root defaultValue={issue.assignedToUserId || "null"} onValueChange={assignIssues}>
        <Select.Trigger placeholder='Assign...'/>
        <Select.Content>
            <Select.Group>
                <Select.Label>
                    Suggestions
                </Select.Label>
                <Select.Item value="null"> 
                    Unassigned
                </Select.Item>
                {
                        users?.map((user) => (
                            <Select.Item value={user.id} key={user.id}>{user.name}</Select.Item>
                        ))
                }
            </Select.Group>
        </Select.Content>
    </Select.Root>
    </>
  )
}

export default AssigneeSelect