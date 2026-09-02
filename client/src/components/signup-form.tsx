"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const RegisterBody = z
  .object({
    name: z.string().trim().min(2, "Tên phải có ít nhất 2 ký tự").max(256),
    email: z.string().email("Email không hợp lệ"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự").max(100),
    confirmPassword: z
      .string()
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .max(100),
  })
  .strict()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Mật khẩu không khớp",
        path: ["confirmPassword"],
      });
    }
  });

type RegisterBodyType = z.infer<typeof RegisterBody>;

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterBodyType) => {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    ).then((res) => res.json());
    console.log(result);
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle className="text-center font-semibold text-xl">
          Đăng ký
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* Name */}
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                {...register("name")}
              />
              {errors.name && (
                <FieldDescription className="text-destructive">
                  {errors.name.message}
                </FieldDescription>
              )}
            </Field>

            {/* Email */}
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email")}
              />
              {errors.email && (
                <FieldDescription className="text-destructive">
                  {errors.email.message}
                </FieldDescription>
              )}
            </Field>

            {/* Password */}
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" type="password" {...register("password")} />
              {errors.password && (
                <FieldDescription className="text-destructive">
                  {errors.password.message}
                </FieldDescription>
              )}
            </Field>

            {/* Confirm Password */}
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input
                id="confirm-password"
                type="password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <FieldDescription className="text-destructive">
                  {errors.confirmPassword.message}
                </FieldDescription>
              )}
            </Field>

            <Field>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Đang xử lý..." : "Đăng ký"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
