'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSignup(e: FormEvent) {
    e.preventDefault();

    const user = { email, password };
    setLoading(true);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/signup`, {
      method: "POST",
      body: JSON.stringify(user)
    });

    const data = await res.json();

    if (data.success) {
      toast.success(data.message);
      router.push("/");
    } else {
      toast.error(data.message);
    }
    setLoading(false);
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <Card className="w-2/3 md:w-1/3">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Enter your credentials to create your account.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="user-email">Email</Label>
            <Input id="user-email" value={email} type="email" placeholder="user@example.com"
              onChange={e => setEmail(e.target.value)} />
          </div>

          <div className="space-y-1">
            <Label htmlFor="user-password">Password</Label>
            <Input id="user-password" value={password} type="password"
              onChange={e => setPassword(e.target.value)} />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col">
          <Button className="w-full" onClick={handleSignup} disabled={loading}>Register</Button>
          <p className="flex w-full items-center">
            Already have an Account?
            <Button variant="link" onClick={() => router.push("/login")}>Login</Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
