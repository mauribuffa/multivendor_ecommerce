"use client";

import { CategoryFormSchema } from "@/lib/schemas";
import { Category } from "@prisma/client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
interface CategoryDetailsProps {
  data?: Category;
}

export const CategoryDetails = ({ data }: CategoryDetailsProps) => {
  const form = useForm<z.infer<typeof CategoryFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: {
      name: data?.name,
      image: data?.image ? [{ url: data.image }] : [],
      url: data?.url,
      featured: data?.featured,
    },
  });

  //TODO: Check if this is needed
  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name,
        image: data.image ? [{ url: data.image }] : [],
        url: data.url,
        featured: data.featured,
      });
    }
  }, [data, form]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof CategoryFormSchema>) => {
    console.log(values);
  };

  return <AlertDialog>
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Category Information</CardTitle>
      </CardHeader>
    </Card>
  </AlertDialog>
};
