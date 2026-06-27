'use client'

import Card from '@/components/ui/card'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { useMutation } from '@tanstack/react-query'
import { login } from '@/services/auth'
import Link from 'next/link'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

interface IProps {
  callbackUrl: string
}

export default function LoginForm({ callbackUrl }: IProps) {
  const router = useRouter()
  const [isRedirecting, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: 'user@example.com', password: 'secret123' },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (res: any) => {
      if (!res.ok) return toast.error(res.message ?? 'Invalid credentials')
      startTransition(() => {
        router.push(callbackUrl)
        router.refresh()
      })
    },
    onError: () => toast.error('Something went wrong'),
  })

  return (
    <Card className="flex flex-col gap-2 m-4 w-full p-6">
      <h1 className="text-3xl">
        System <span className="text-accent">Login</span>
      </h1>
      <p className="text-muted pb-5">
        Fill the form below with your credentials to access the system.
      </p>
      <hr className="opacity-10 pt-5" />
      <form
        onSubmit={handleSubmit((data: any) => mutate(data))}
        className="w-full flex flex-col gap-4"
      >
        <div className="flex flex-col">
          <label>Email</label>
          <input
            {...register('email')}
            type="email"
            placeholder="you@company.com"
            className="border p-4 border-gray-100/20 rounded-sm"
          />
          {errors.email && <span className="text-xs text-warn">{errors.email.message}</span>}
        </div>

        <div className="flex flex-col">
          <label>Password</label>
          <input
            {...register('password')}
            type="password"
            className="border p-4 border-gray-100/20 rounded-sm"
          />
          {errors.password && <span className="text-xs text-warn">{errors.password.message}</span>}
        </div>

        <button
          type="submit"
          disabled={isPending || isRedirecting}
          className="border p-4 border-gray-100/20 rounded-sm bg-accent text-white my-4"
        >
          {isPending ? 'Signing in…' : isRedirecting ? 'Redirecting…' : 'Sign in'}
        </button>
      </form>

      <div className="flex justify-between text-sm text-muted">
        <Link href="/auth/register" className="text-accent">
          Create account
        </Link>
        <Link href="/auth/forgot-password" className="text-accent">
          Forgot password?
        </Link>
      </div>
    </Card>
  )
}
