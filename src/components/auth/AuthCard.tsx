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
            <div className="mb-4 h-14 w-14 rounded-xl bg-primary flex items-center justify-center text-primary-foreground text-xl font-bold">
                C
            </div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    {title}
                </h1>

                {subtitle && (
                    <p className="mt-2 text-muted-foreground">
                        {subtitle}
                    </p>
                )}
            </div>

            {children}
        </div>
    );
}