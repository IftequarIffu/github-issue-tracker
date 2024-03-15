import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { z } from 'zod'

const updateIssueSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1).max(255)
})


// Because URL parameters are strings by default
export const GET = async(request:NextRequest, { params }: { params: {issueId: string}}) => {

    const issue = await prisma.issue.findUnique({
        where: {
            id: Number(params.issueId),
        }
    })

    return NextResponse.json(issue)
}

export const PUT = async(request: NextRequest, { params }: { params: {issueId: string}}) => {

    const body =  await request.json()
    const validation = updateIssueSchema.safeParse(body)
    if(!validation.success){
        NextResponse.json(validation.error.errors, { status: 400 })
    }
    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.issueId)
        }
    })

    if(!issue){
        return NextResponse.json({error: "Invalid Issue"}, {status: 404})
    }

    const updatedIssue = await prisma.issue.update({
        where: {
            id: issue.id
        },
        data: {
            title: body.title,
            description: body.description
        }
    })

    return NextResponse.json(updatedIssue, {status: 200})
}

export const DELETE = async(request: NextRequest, { params }: { params: {issueId: string}}) => {

    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.issueId)
        }
    })

    if(!issue){
        return NextResponse.json({error: "Invalid Issue"}, {status: 404})
    }

    const deletedIssue = await prisma.issue.delete({
        where: {
            id: issue.id
        }
    })

    return NextResponse.json({}, {status: 200})
}