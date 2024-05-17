import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createIssueSchema } from "../../zodSchemas";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/authOptions";

export const GET = async (request: NextRequest) => {
  const issues = await prisma.issue.findMany();
  return NextResponse.json(issues, { status: 200 });
};

export const POST = async (request: NextRequest) => {

  const session = await getServerSession(authOptions)

  if(!session){
    return NextResponse.json({}, { status: 401 })
  }

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
  console.log(newIssue)
  return NextResponse.json({ newIssue }, { status: 201 });
};
