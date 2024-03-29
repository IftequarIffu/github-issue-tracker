import React, { FC } from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import {  Grid, Box, Flex } from "@radix-ui/themes";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/authOptions";

interface Props {
  params: {
    id: string;
  };
}

const IssueDetailPage: FC<Props> = async ({ params: { id } }) => {

  const session = await getServerSession(authOptions)


  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!issue) {
    notFound();
  }
  return (
    <Grid columns={{initial: "1", sm: "5"}} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        {
          session && <Flex direction="column" gap="4">
                      <EditIssueButton issueId={issue.id} />
                      <DeleteIssueButton issueId={issue.id}/>
                    </Flex>
        }
        
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
