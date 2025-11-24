'use client'
import { Button } from "@/components/ui/button"
import {
  Card, CardContent, CardDescription, CardFooter,
  CardHeader, CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export default function CombinedLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin() {
    setLoading(true);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
      method: "POST",
      body: JSON.stringify({ email, password })
    });


    const data = await res.json();

    if (data.success) {
      toast.success("Logged in!");
      router.push("/");
    } else {
      toast.error(data.message || "Something went wrong");
    }

    setLoading(false);
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <Card className="w-2/3 lg:w-1/3 mx-auto">
        <CardHeader>
          <CardTitle>User Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-1 w-full">
            <Label htmlFor="user-email">Email</Label>
            <Input id="user-email" value={email} type="email" placeholder="user@example.com"
              onChange={e => setEmail(e.target.value)} />
          </div>

          <div className="space-y-1 w-full">
            <Label htmlFor="user-password">Password</Label>
            <Input id="user-password" value={password} type="password"
              placeholder="enter password.." onChange={e => setPassword(e.target.value)} />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col">
          <Button className="w-full" onClick={handleLogin} disabled={loading}>Login</Button>
          <p className="flex w-full items-center">
            Don't have an Account?
            <Button variant="link" onClick={() => router.push("/signup")}>Register</Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
