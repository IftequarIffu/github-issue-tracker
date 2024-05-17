import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/authOptions";
import { createIssueSchema, patchIssueSchema } from "@/app/zodSchemas";
import { Issue } from "@prisma/client";

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

    const session = await getServerSession(authOptions)

    if(!session){
        return NextResponse.json({}, { status: 401 })
    }

    const body =  await request.json()
    const validation = patchIssueSchema.safeParse(body)
    if(!validation.success){
        return NextResponse.json(validation.error.errors, { status: 400 })
    }

    const {title, description, assignedToUserId}: Issue = body
    if(assignedToUserId){
        const user = await prisma.user.findUnique({
            where: {
                id: assignedToUserId
            }
        })

        if(!user){
            return NextResponse.json({error: "Invalid User"}, { status: 400 })
        }
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
            title,
            description,
            assignedToUserId
        }
    })

    return NextResponse.json(updatedIssue, {status: 200})
}

export const DELETE = async(request: NextRequest, { params }: { params: {issueId: string}}) => {

    const session = await getServerSession(authOptions)

    if(!session){
        return NextResponse.json({}, { status: 401 })
    }

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