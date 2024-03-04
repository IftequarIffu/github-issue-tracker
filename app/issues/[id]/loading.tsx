import React, { FC } from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import ReactMarkdown from 'react-markdown'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const loading: FC = async () => {

  return (
    <div className="prose">
      <Heading><Skeleton /></Heading>
        <Skeleton />
        <Card className="mt-5">
            <Skeleton />
        </Card>
    </div>
  );
};

export default loading;
