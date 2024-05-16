import { Status } from '@prisma/client'
import React, { FC } from 'react'
import { Badge } from '@radix-ui/themes'

interface Props{
    status: Status
}

const IssueStatusBadge: FC<Props> = ({status}) => {
    if(status === 'CLOSED'){
        return <Badge color="green">{status}</Badge>
    }
    else if(status === 'OPEN'){
        return <Badge color="red">{status}</Badge>
    }
    else{
        return <Badge color="purple">{status}</Badge>
    }
}

export default IssueStatusBadge