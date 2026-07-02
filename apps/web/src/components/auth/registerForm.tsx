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
import { registerAction } from '@/features/auth/register'
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
    mutationFn: registerAction,
    onSuccess: (res) => {
      if (!res.ok) return toast.error(res.message ?? 'Registration failed')
      toast.success('Check your email to confirm your account')
      startTransition(() => router.push('/auth/signin'))
    },
    onError: () => toast.error('Something went wrong'),
  })

  return (
    <AuthCard
      title={
        <>
          Create <span>Account</span>
        </>
      }
      subtitle="Fill the form below to create your account."
    >
      <form
        onSubmit={handleSubmit(({ confirmPassword: _, ...data }: any) => mutate(data))}
        className="w-full flex flex-col gap-8"
      >
        <Field label="Username" error={errors.username?.message}>
          <Input {...field('username')} type="text" placeholder="johndoe" />
        </Field>

        <Field label="Email" error={errors.email?.message}>
          <Input {...field('email')} type="email" placeholder="you@company.com" />
        </Field>

        <Field label="Password" error={errors.password?.message}>
          <Input {...field('password')} type="password" placeholder="••••••••" />
        </Field>

        <Field label="Confirm Password" error={errors.confirmPassword?.message}>
          <Input {...field('confirmPassword')} type="password" placeholder="••••••••" />
        </Field>

        <Button type="submit" disabled={isPending || isRedirecting} className="my-4">
          {isPending ? 'Creating account…' : isRedirecting ? 'Redirecting…' : 'Create account'}
        </Button>
      </form>

      <p className="text-sm text-center text-muted">
        Already have an account?{' '}
        <Link href="/auth/signin" className="text-accent hover:underline">
          Sign in
        </Link>
      </p>
    </AuthCard>
  )
}
