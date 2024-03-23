import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createIssueSchema } from "../../zodSchemas";

export const GET = async (request: NextRequest) => {
  const issues = await prisma.issue.findMany();
  return NextResponse.json(issues, { status: 200 });
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json({ newIssue }, { status: 201 });
};
