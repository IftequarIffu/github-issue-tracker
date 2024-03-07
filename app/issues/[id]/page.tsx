import React, { FC } from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Card, Flex, Heading, Text, Grid, Button, Box } from "@radix-ui/themes";
import {Pencil2Icon} from '@radix-ui/react-icons'
import Link from "next/link";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

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
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <EditIssueButton issueId={issue.id} />
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
