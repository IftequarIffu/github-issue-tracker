"use client";
import React, { useState } from "react";
import { TextField, Callout, Button } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/zodSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { Issue } from "@prisma/client";

// Creates Type from the createIssueSchema of ZodSchema
type IssueFormType = z.infer<typeof createIssueSchema>;

//Disabled Server-side Rendering
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
    ssr: false
})


const IssueForm = ({issue}: {issue?: Issue}) => {

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
      } = useForm<IssueFormType>({
        resolver: zodResolver(createIssueSchema),
      });
      const router = useRouter();
    
      const [errorMessage, setError] = useState("");
      const [isSubmitting, setIsSubmitting] = useState(false)
    
      const onSubmit = handleSubmit(async (data) => {
        try {
          setIsSubmitting(true);
          if(issue){
            const response = await axios.put(`/api/issues/${issue.id}`, data);
          }
          else{
            const response = await axios.post("/api/issues", data);
          }
          router.push("/issues");

          // The below line is used to avoid client-side caching.
          // It refreshes the current route(sends another request to the server and fetches data)
          router.refresh()
        } catch (e) {
          setIsSubmitting(false)
          setError("Some unexpected error occured");
        }
      })


  return (
    <div className="max-w-xl space-y-3">
      {errorMessage !== "" && (
        <Callout.Root size="1" color="red" variant="surface">
          <Callout.Text>{errorMessage}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input defaultValue={issue?.title} placeholder="Title" {...register("title")} />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          defaultValue={issue?.description}
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button>{issue ? "Edit Issue": "Submit New Issue"}{' '} {isSubmitting && <Spinner />}</Button>
      </form>
    </div>
  )
}

export default IssueForm