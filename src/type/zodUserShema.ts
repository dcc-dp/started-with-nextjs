import { z } from 'zod'

export const userSchema = z.object({
  name: z.string().min(3, 'Name minimal 3 karakter'),
  email: z.string().email('Email tidak valid'),
  age: z.number().min(18, 'Umur minimal 18'),
})

export type UserInput = z.infer<typeof userSchema>
