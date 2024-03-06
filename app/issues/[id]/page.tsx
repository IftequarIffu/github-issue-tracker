import React, { FC } from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Card, Flex, Heading, Text, Grid, Button, Box } from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import ReactMarkdown from 'react-markdown'
import {Pencil2Icon} from '@radix-ui/react-icons'
import Link from "next/link";

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
    <Grid columns={{initial: "1", md: "2"}} gap="5">
      <Box>
      <Heading>{issue.title}</Heading>
        <Flex className="space-x-3 my-3">
            <IssueStatusBadge status={issue.status} />
            <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="mt-5">
            <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Button>
          <Pencil2Icon />
          <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
          
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
