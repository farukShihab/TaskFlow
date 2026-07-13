interface AuthDividerProps {
  text?: string;
}

export default function AuthDivider({
  text = "Or continue with",
}: AuthDividerProps) {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
      </div>

      <div className="relative flex justify-center text-sm">
        <span className="bg-card px-3 text-muted-foreground">
          {text}
        </span>
      </div>
    </div>
  );
}