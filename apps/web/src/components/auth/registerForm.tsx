'use client'

import Card from '@/components/ui/card'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { useMutation } from '@tanstack/react-query'
import { register } from '@/services/auth'
import Link from 'next/link'

const registerSchema = z
  .object({
    username: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export default function RegisterForm() {
  const router = useRouter()
  const [isRedirecting, startTransition] = useTransition()

  const {
    register: field,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) })

  const { mutate, isPending } = useMutation({
    mutationFn: register,
    onSuccess: (res) => {
      if (!res.ok) return toast.error(res.message ?? 'Registration failed')
      toast.success('Check your email to confirm your account')
      startTransition(() => router.push('/auth/signin'))
    },
    onError: () => toast.error('Something went wrong'),
  })

  return (
    <Card className="flex flex-col gap-2 m-4 w-full p-6">
      <h1 className="text-3xl">
        Create <span className="text-accent">Account</span>
      </h1>
      <p className="text-muted pb-5">Fill the form below to create your account.</p>
      <hr className="opacity-10 pt-5" />
      <form
        onSubmit={handleSubmit(({ confirmPassword: _, ...data }: any) => mutate(data))}
        className="w-full flex flex-col gap-4"
      >
        <div className="flex flex-col">
          <label>Username</label>
          <input
            {...field('username')}
            type="text"
            placeholder="johndoe"
            className="border p-4 border-gray-100/20 rounded-sm"
          />
          {errors.username && <span className="text-xs text-warn">{errors.username.message}</span>}
        </div>

        <div className="flex flex-col">
          <label>Email</label>
          <input
            {...field('email')}
            type="email"
            placeholder="you@company.com"
            className="border p-4 border-gray-100/20 rounded-sm"
          />
          {errors.email && <span className="text-xs text-warn">{errors.email.message}</span>}
        </div>

        <div className="flex flex-col">
          <label>Password</label>
          <input
            {...field('password')}
            type="password"
            className="border p-4 border-gray-100/20 rounded-sm"
          />
          {errors.password && <span className="text-xs text-warn">{errors.password.message}</span>}
        </div>

        <div className="flex flex-col">
          <label>Confirm Password</label>
          <input
            {...field('confirmPassword')}
            type="password"
            className="border p-4 border-gray-100/20 rounded-sm"
          />
          {errors.confirmPassword && (
            <span className="text-xs text-warn">{errors.confirmPassword.message}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending || isRedirecting}
          className="border p-4 border-gray-100/20 rounded-sm bg-accent text-white my-4"
        >
          {isPending ? 'Creating account…' : isRedirecting ? 'Redirecting…' : 'Create account'}
        </button>
      </form>

      <p className="text-sm text-center text-muted">
        Already have an account?{' '}
        <Link href="/auth/signin" className="text-accent">
          Sign in
        </Link>
      </p>
    </Card>
  )
}
