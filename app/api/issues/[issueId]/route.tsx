import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { z } from 'zod'

interface Props {
    params: {
        issueId: number
    }
}

const updateIssueSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1).max(255)
})



export const GET = async(request:NextRequest, { params }: Props) => {

    const issue = await prisma.issue.findUnique({
        where: {
            id: Number(params.issueId),
        }
    })

    return NextResponse.json(issue)
}

export const PUT = async(request: NextRequest, { params }: Props) => {

    const body =  await request.json()
    const validation = updateIssueSchema.safeParse(body)
    if(!validation.success){
        NextResponse.json(validation.error.errors, { status: 400 })
    }
    const issue = await prisma.issue.update({
        where: {
            id: Number(params.issueId)
        },
        data: {
            title: body.title,
            description: body.description
        }
    })

    return NextResponse.json(issue, {status: 200})
}