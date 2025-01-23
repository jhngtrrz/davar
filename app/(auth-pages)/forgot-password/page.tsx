import { forgotPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";

export default async function ForgotPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <>
      <div className="flex w-full justify-center p-8">
        <div className="w-full max-w-sm">
          <Card>
            <form className="flex-1 flex flex-col min-w-64 p-4">
              <h1 className="text-2xl font-medium">Restablecer contraseña</h1>
              <p className="text-sm text-secondary-foreground">
                ¿Ya tienes una cuenta?{" "}
                <Link className="text-primary underline" href="/sign-in">
                  Inicia sesión
                </Link>
              </p>
              <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input name="email" placeholder="tu@ejemplo.com" required />
                <SubmitButton formAction={forgotPasswordAction}>
                  Restablecer contraseña
                </SubmitButton>
                <FormMessage message={searchParams} />
              </div>
            </form>
          </Card>
          <div className="mt-4">
            <SmtpMessage />
          </div>
        </div>
      </div>
    </>
  );
}
