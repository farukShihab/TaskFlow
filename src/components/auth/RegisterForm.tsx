"use client";

import Link from "next/link";

import AuthCard from "./AuthCard";
import PasswordInput from "./PasswordInput";
import AuthDivider from "./AuthDivider";
import SocialLogin from "./SocialLogin";

import { Button } from "@/components/design/forms/Button";
import { Input } from "@/components/design/forms/Input";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { AuthService } from "@/services/auth.service";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  registerSchema,
  type RegisterFormData,
} from "@/lib/validation/auth";



export default function RegisterForm() {

  const router = useRouter();

  const [error, setError] = useState("");

  const onSubmit = async (values: RegisterFormData) => {
    setError("");

    try {
      await AuthService.register({
        username: values.username,
        email: values.email,
        password: values.password,
      });

      router.push("/login");
    } catch (error: any) {
      setError(
        error?.response?.data?.detail ??
        error?.response?.data?.message ??
        "Registration failed."
      );
    }
  };

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  return (
    <AuthCard
      title="Create an account"
      subtitle="Join to start managing tasks"
    >
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >

        <div className="space-y-2">
          <label
            htmlFor="username"
            className="text-sm font-medium"
          >
            Username
          </label>

          <Input
            id="username"
            placeholder="johndoe"
            {...form.register("username")}
          />

          {form.formState.errors.username && (
            <p className="text-sm text-red-500">
              {form.formState.errors.username.message}
            </p>
          )}
        </div>
        
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-medium"
          >
            Email
          </label>

          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            {...form.register("email")}
          />

          {form.formState.errors.email && (
            <p className="text-sm text-red-500">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="password"
            className="text-sm font-medium"
          >
            Password
          </label>

          <PasswordInput
            id="password"
            placeholder="Create a password"
            {...form.register("password")}
          />

          {form.formState.errors.password && (
            <p className="text-sm text-red-500">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="confirmPassword"
            className="text-sm font-medium"
          >
            Confirm Password
          </label>

          <PasswordInput
            id="confirmPassword"
            placeholder="Confirm your password"
            {...form.register("confirmPassword")}
          />

          {form.formState.errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {form.formState.errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting
          ? "Creating Account..."
          : "Create Account"}
        </Button>
      </form>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-primary hover:underline"
        >
          Sign In
        </Link>
      </div>
    </AuthCard>
  );
}