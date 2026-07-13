"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import AuthCard from "./AuthCard";
import PasswordInput from "./PasswordInput";

import { Button } from "@/components/design/forms/Button";
import { Input } from "@/components/design/forms/Input";

import { AuthService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    loginSchema,
    type LoginFormData,
} from "@/lib/validation/auth";

export default function LoginForm() {
    const router = useRouter();
    const setUser = useAuthStore((state) => state.login);

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),

        defaultValues: {
            email: "",
            password: "",
        },
    });
    const [error, setError] = useState("");

    const onSubmit = async (values: LoginFormData) => {
        setError("");

        try {
            const { data } = await AuthService.login(values);

            setUser(
                data.user,
                data.access,
                data.refresh
            );

            router.push("/tasks");
        } catch (error: any) {
            setError(
                error?.response?.data?.detail ??
                "Invalid email or password."
            );
        }
    };
    return (
        <AuthCard
            title="Welcome back 👋"
            subtitle="Sign in to continue to your account."
        >
            <form
                className="space-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        Email
                    </label>

                    <Input
                        type="email"
                        placeholder="you@example.com"
                        {...form.register("email")}
                    />
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">
                            Password
                        </label>
                    </div>

                    <PasswordInput
                        placeholder="Enter your password"
                        {...form.register("password")}
                    />
                </div>

                {error && (
                    <p className="text-sm text-red-500">
                        {error}
                    </p>
                )}

                <Button
                    className="w-full"
                    type="submit"
                    disabled={form.formState.isSubmitting}
                >
                    {form.formState.isSubmitting
                        ? "Signing In..."
                        : "Sign In"}
                </Button>
            </form>

            <div className="mt-8 text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                    href="/register"
                    className="font-medium text-primary hover:underline"
                >
                    Sign up
                </Link>
            </div>
        </AuthCard>
    );
}