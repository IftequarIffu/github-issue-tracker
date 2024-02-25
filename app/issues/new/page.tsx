"use client";
import React, { useState } from "react";
import { TextField, Callout, Button } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from 'axios'
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const { register, control, handleSubmit } = useForm<IssueForm>()
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
      <Controller name="description" control={control} render={({field}) => <SimpleMDE placeholder="Description" {...field} />} />
      <Button>Submit New Issue</Button>
    </form>
    </div>
  );
};

export default NewIssuePage;
