"use client";
import React, { useState } from "react";
import { TextField, Callout, Button, Text } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from 'axios'
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/zodSchemas";
import {z} from 'zod'

// Creates Type from the ZodSchema
type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {
  const { register, control, handleSubmit, formState: {errors} } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  })
  const router = useRouter()

  const [errorMessage, setError] = useState("")

  return (

    <div className="max-w-xl space-y-3">
        {
            errorMessage!=="" &&  (<Callout.Root size="1" color="red" variant="surface">
            <Callout.Text>
              {errorMessage}
            </Callout.Text>
          </Callout.Root>)
        }
    <form className="space-y-3" onSubmit={handleSubmit(async(data) => {
        try {
            const response = await axios.post("/api/issues", data)
            router.push("/issues")
        } catch (e) {
            setError("Some unexpected error occured")
        }
        
    })}>
      <TextField.Root>
        <TextField.Input placeholder="Title" {...register("title")}/>
      </TextField.Root>
      {errors.title && <Text color="red" as="p" size="2">{errors.title.message}</Text>}
      <Controller name="description" control={control} render={({field}) => <SimpleMDE placeholder="Description" {...field} />} />
      {errors.description && <Text color="red" as="p" size="2">{errors.description.message}</Text>}
      <Button>Submit New Issue</Button>
    </form>
    </div>
  );
};

export default NewIssuePage;
