import { CheckCheck } from "lucide-react";

interface AuthCardProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}

export default function AuthCard({
    title,
    subtitle,
    children,
}: AuthCardProps) {
    return (
        <div className="w-full max-w-md rounded-2xl border bg-card p-8 shadow-lg">
            {/* Logo + brand */}
            <div className="mb-8 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600">
                    <CheckCheck className="h-5 w-5 text-white" />
                </div>
                <div className="hidden leading-tight sm:block">
                    <h1 className="text-base font-bold text-foreground">TaskFlow</h1>
                </div>
            </div>

            {/* Page title */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold">{title}</h1>

                {subtitle && (
                    <p className="mt-2 text-muted-foreground">{subtitle}</p>
                )}
            </div>

            {children}
        </div>
    );
}