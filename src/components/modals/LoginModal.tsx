import React, { useState } from "react";
import Modal from "./Modal";
import { signIn } from "next-auth/react";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useAuthModal";
import Heading from "../form/Heading";
import Input from "@/components/inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../inputs/Button";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const LoginModal = () => {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const submitHandler: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.ok) {
          toast.success("wellcome back");
          loginModal.onClose();
          router.refresh();
        } else if (callback?.error) {
          toast.error(callback?.error);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("something went wrong");
      })
      .finally(() => setLoading(false));
  };
  return (
    <Modal
      isOpen={loginModal.isOpen}
      onChange={(val) => {
        if (!val) {
          loginModal.onClose();
        }
      }}
      body={
        <div className="flex flex-col gap-4">
          <Heading title="wellcome back" subtitle="login to your account!" />

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
      disable={isLoading}
      footer={{
        primary: {
          label: "login",
          onClick: handleSubmit(submitHandler),
        },
        secondary: {
          label: "any way",
          onClick: () => {
            loginModal.onClose();
          },
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
                <div>Create an account?</div>
                <div
                  onClick={() => {
                    loginModal.onClose();
                    registerModal.onOpen();
                  }}
                  className="text-neutral-800 cursor-pointer hover:underline transition-all"
                >
                  Register
                </div>
              </div>
            </div>
          </div>
        ),
      }}
      header={{ title: "login to your account" }}
    />
  );
};

export default LoginModal;
