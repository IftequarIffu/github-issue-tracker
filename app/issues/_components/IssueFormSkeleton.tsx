import React from 'react'
import { Heading, Card } from '@radix-ui/themes'
import {Skeleton} from '@/app/components'

const IssueFormSkeleton = () => {
  return (
    <div className="prose">
      <Heading><Skeleton height="2rem" /></Heading>
        <Card className="mt-5" >
            <Skeleton height="20rem"/>
        </Card>
    </div>
  )
}

export default IssueFormSkeleton