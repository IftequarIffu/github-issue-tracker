import React, { FC } from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import ReactMarkdown from 'react-markdown'

interface Props {
  params: {
    id: string;
  };
}

const IssueDetailPage: FC<Props> = async ({ params: { id } }) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!issue) {
    notFound();
  }
  return (
    <div className="prose">
      <Heading>{issue.title}</Heading>
        <Flex className="space-x-3 my-3">
            <IssueStatusBadge status={issue.status} />
            <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="mt-5">
            <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
    </div>
  );
};

export default IssueDetailPage;
