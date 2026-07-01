'use client'

import AuthCard from '@/components/auth/authCard'
import Button from '@/components/ui/button'
import Field from '@/components/ui/field'
import Input from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { useMutation } from '@tanstack/react-query'
import { loginAction } from '@/features/auth/login'
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
    mutationFn: loginAction,
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
    <AuthCard
      eyebrow="Auth · Sign in"
      title={
        <>
          System <span>Login</span>
        </>
      }
      subtitle="Fill the form below with your credentials to access the system."
    >
      <form
        onSubmit={handleSubmit((data: any) => mutate(data))}
        className="w-full flex flex-col gap-8"
      >
        <Field label="Email" error={errors.email?.message}>
          <Input {...register('email')} type="email" placeholder="you@company.com" />
        </Field>

        <Field label="Password" error={errors.password?.message}>
          <Input {...register('password')} type="password" placeholder="••••••••" />
        </Field>

        <Button type="submit" disabled={isPending || isRedirecting} className="my-4">
          {isPending ? 'Signing in…' : isRedirecting ? 'Redirecting…' : 'Sign in'}
        </Button>
      </form>

      <div className="flex justify-between text-sm">
        <Link href="/auth/register" className="text-accent hover:underline">
          Create account
        </Link>
        <Link href="/auth/forgot-password" className="text-accent hover:underline">
          Forgot password?
        </Link>
      </div>
    </AuthCard>
  )
}
