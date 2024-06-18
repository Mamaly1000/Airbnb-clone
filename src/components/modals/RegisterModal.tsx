"use client";
import useRegisterModal from "@/hooks/useAuthModal";
import React, { useState } from "react";
import Modal from "./Modal";
import http from "@/services/http";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Heading from "../form/Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../inputs/Button";
import axios from "axios";
import useLoginModal from "@/hooks/useLoginModal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";
const RegisterModal = () => {
  const router = useRouter();
  const { mutate } = useUser();
  const { isOpen, onClose } = useRegisterModal();
  const loginModal = useLoginModal();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const isLoading = isSubmitting;

  const submitHandler: SubmitHandler<FieldValues> = (data) => {
    axios
      .post("/api/register", data)
      .then((res) => {
        onClose();
        loginModal.onOpen();
        toast.success("wellcome to Airbnb " + res.data.name);
        loginModal.onClose();
        router.refresh();
        mutate();
      })
      .catch((err) => {
        toast.error("failed to register");
        console.log(err);
      });
  };
  const handleModal = (val: boolean) => {
    if (!val) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onChange={handleModal}
      disable={isLoading}
      body={
        <div className="flex flex-col gap-4">
          <Heading title="wellcome to airbnb" subtitle="Create an account!" />
          <Input
            errors={errors}
            id="name"
            label="your name"
            register={register}
            disabled={isLoading}
            required
          />
          <Input
            errors={errors}
            id="email"
            label="your email"
            register={register}
            disabled={isLoading}
            required
          />
          <Input
            errors={errors}
            id="password"
            label="your password"
            register={register}
            disabled={isLoading}
            required
          />
        </div>
      }
      header={{
        title: "Join us!",
      }}
      footer={{
        primary: {
          label: "register",
          onClick: handleSubmit(submitHandler),
        },
        secondary: {
          label: "any way",
          onClick: onClose,
        },
        AdditionalActions: (
          <div className="min-w-full flex flex-col gap-3 justify-start items-start">
            {/* <Button
              label="countinue with google"
              onClick={() => {
                signIn("google");
              }}
              Icon={FcGoogle}
              outline
            />{" "}
            <hr />
            <Button
              label="countinue with github"
              onClick={() => {
                signIn("github").then(() => router.refresh());
              }}
              Icon={AiFillGithub}
              outline
            />
            <hr /> */}
            <div className="min-w-full text-neutral-500 text-center font-light">
              <div className="min-w-full flex flex-wrap items-center justify-center gap-3 capitalize">
                <div>already have an account?</div>
                <div
                  onClick={() => {
                    onClose();
                    loginModal.onOpen();
                  }}
                  className="text-neutral-800 cursor-pointer hover:underline transition-all"
                >
                  Log in
                </div>
              </div>
            </div>
          </div>
        ),
      }}
    />
  );
};

export default RegisterModal;
