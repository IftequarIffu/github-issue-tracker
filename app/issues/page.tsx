
import prisma from "@/prisma/client";
import { Button, Table, Flex } from "@radix-ui/themes";
import { IssueStatusBadge, Link } from "@/app/components";
import IssueStatusFilter from "./_components/IssueStatusFilter";
import { Status } from "@prisma/client";

interface Props {
  searchParams: { status: Status }
}

const IssuesPage = async ({ searchParams }: Props) => {

  const statuses = Object.values(Status)
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined

  const issues = await prisma.issue.findMany({
    where: {
      status
    }
  });

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
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
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
    </div>
  );
};

// URLs with parameters are rendered dynamically(at run-time) by the server. But, no the URLs with no parameters.
// This is for dynamic rendering(This page will not be cached)(server-side)
// We don't want this page to be cached as new issues are created constantly and
// we want to render this page freshly all the time.
// You can use either of the following lines(Both mean the same thing)
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default IssuesPage;
