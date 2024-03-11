"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Modal from "./Modal";
import useUser from "@/hooks/useUser";
import Input from "../inputs/Input"; 
import { useProfileModal } from "@/hooks/useProfileModal";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useProfileImage from "@/hooks/useProfileImage";

const profileSchema = z.object({
  name: z.string().optional(),
  email: z
    .string({
      required_error: "name is required",
    })
    .email(),
  image: z.string().optional(),
});

const EditprofileModal = () => {
  const router = useRouter();

  const { isOpen, onClose } = useProfileModal();
  const { user, mutate } = useUser();
  const { mutate: profilepicMutate } = useProfileImage(user?.id);

  const [isLoading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      image: "",
      email: "",
    },
  });

  const onSubmit = form.handleSubmit(
    async (values: z.infer<typeof profileSchema>) => {
      if (user) {
        try {
          setLoading(true);
          await axios.post("/api/edit", values).then((res) => {
            toast.success(res.data.message);
            mutate();
            profilepicMutate();
            router.refresh();
            onClose();
            form.reset();
          });
        } catch (error) {
          console.log(error);
          toast.error("something went wrong!");
        } finally {
          setLoading(false);
        }
      }
    }
  );

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || "",
        email: user.email || "",
        image: user.image || "",
      });
    }
  }, [user, form]);

  return (
    <Modal
      isOpen={isOpen}
      onChange={(val) => {
        if (!val) {
          onClose();
        }
      }}
      body={
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className=" flex flex-col items-start justify-start gap-8 "
        >
          <Input
            errors={form.formState.errors}
            id="name"
            label="your name"
            register={form.register as any}
            disabled={isLoading}
            required
          />{" "}
          <Input
            errors={form.formState.errors}
            id="email"
            label="your email"
            register={form.register as any}
            disabled={isLoading}
            required
          />
         
        </form>
      }
      header={{
        title: "edit your profile",
        close: () => {
          onClose();
        },
      }}
      footer={{
        primary: {
          label: "update",
          onClick: () => {
            onSubmit();
          },
        },
      }}
      disable={isLoading}
    />
  );
};

export default EditprofileModal;
