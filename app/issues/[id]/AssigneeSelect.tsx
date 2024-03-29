'use client';
import React, { useEffect, useState } from 'react'
import { Select } from '@radix-ui/themes'
import axios from 'axios';
import { User } from '@prisma/client';

const AssigneeSelect = () => {

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
    



  return (
    <Select.Root>
        <Select.Trigger placeholder='Assign...'/>
        <Select.Content>
            <Select.Group>
                <Select.Label>
                    Suggestions
                </Select.Label>
                {
                        users?.map((user) => (
                            <Select.Item value='1' key={user.id}>{user.name}</Select.Item>
                        ))
                }
            </Select.Group>
        </Select.Content>
    </Select.Root>
  )
}

export default AssigneeSelect