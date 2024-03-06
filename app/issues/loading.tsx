import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import {Skeleton} from "../components";

import React from 'react'

const issues = [1, 2, 3]

const loading = () => {
  return (
    <div>
    <div className="mb-5">
    <Button>
      <Link href="/issues/new">New Issue</Link>
    </Button>
  </div>

  <Table.Root variant="surface">
    <Table.Header>
      <Table.Row>
        <Table.ColumnHeaderCell><Skeleton/></Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell className="hidden md:table-cell">
        <Skeleton/>
        </Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell className="hidden md:table-cell">
        <Skeleton/>
        </Table.ColumnHeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {issues.map((issue) => (
        <Table.Row key={issue}>
          <Table.Cell>
          <Skeleton/>
            <div className="block md:hidden"><Skeleton/></div>
          </Table.Cell>
          <Table.Cell className="hidden md:table-cell">
          <Skeleton/>
          </Table.Cell>
          <Table.Cell className="hidden md:table-cell">
          <Skeleton/>
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table.Root>
</div>
  )
}

export default loading