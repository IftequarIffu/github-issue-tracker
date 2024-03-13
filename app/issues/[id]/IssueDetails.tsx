import React from 'react'
import { Heading, Flex, Text, Card } from '@radix-ui/themes'
import ReactMarkdown from 'react-markdown'
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { Issue } from '@prisma/client';


const IssueDetails = ({issue}: {issue: Issue}) => {
  return (
    <>
    <Heading>{issue.title}</Heading>
        <Flex className="space-x-3 my-3">
            <IssueStatusBadge status={issue.status} />
            <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="mt-4 prose max-w-full">
            <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
    </>
  )
}

export default IssueDetails