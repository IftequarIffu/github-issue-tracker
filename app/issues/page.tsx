
import prisma from "@/prisma/client";
import { Button, Table, Flex } from "@radix-ui/themes";
import { IssueStatusBadge, Link } from "@/app/components";
import IssueStatusFilter from "./_components/IssueStatusFilter";
import { Issue, Status } from "@prisma/client";
import NextLink from 'next/link'
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "../components/Pagination";
import { Metadata } from "next";

interface Props {
  searchParams: { status: Status, orderBy: keyof Issue, page: string  }
}

const IssuesPage = async ({ searchParams }: Props) => {


  const columns: { label: string, value: keyof Issue, className?: "hidden md:table-cell" }[] = [
    {label: "Issue", value: "title"},
    {label: "Status", value: "status", className: "hidden md:table-cell"},
    {label: "Created", value: "createdAt", className: "hidden md:table-cell"}
  ]


  const statuses = Object.values(Status)
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined

  const orderBy = columns.map(column => column.value).includes(searchParams.orderBy) ? { [searchParams.orderBy]: 'asc'} : undefined


  const page = parseInt(searchParams.page) || 1
  const pageSize = 10


  const issues = await prisma.issue.findMany({
    where: {
      status: status
    },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize
  });

  const issueCount = await prisma.issue.count({
    where: {
      status: status
    }
  })

  return (
    <div>
      <Flex mb="5" justify="between">
        <IssueStatusFilter />
        <Link href="/issues/new">
          <Button className="text-white">New Issue</Button>
        </Link>
      </Flex>

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {
              columns.map((column) => (
                <Table.ColumnHeaderCell key={column.value} className={column.className}> 
                  <NextLink href={{
                    query: {...searchParams, orderBy: column.value}
                  }}>{column.label}</NextLink>
                  {column.value === searchParams.orderBy && <ArrowUpIcon className="inline"/>}
                </Table.ColumnHeaderCell>
              ))
            }
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination pageSize={pageSize} currentPage={page} itemCount={issueCount}/>
    </div>
  );
};

// URLs with parameters are rendered dynamically(at run-time) by the server. But, not the URLs with no parameters.
// This is for dynamic rendering(This page will not be cached)(server-side)
// We don't want this page to be cached as new issues are created constantly and
// we want to render this page freshly all the time.
// You can use either of the following lines(Both mean the same thing)
export const dynamic = "force-dynamic";
export const revalidate = 0;


export const metadata: Metadata = {
  title: 'Issue Tracker - Issue List',
  description: 'View all project issues'
}


export default IssuesPage;
