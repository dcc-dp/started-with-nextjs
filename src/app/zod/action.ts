// services/user.service.ts
import { userSchema, UserInput } from '@/type/zodUserShema'

export type RegisterResult =
  | { success: true; data: UserInput }
  | { success: false; errors: string[] }

export function registerUser(data: UserInput): RegisterResult {
  const result = userSchema.safeParse(data)

  if (!result.success) {
    return {
      success: false,
      errors: result.error.issues.map((issue) => issue.message),
    }
  }

  console.log('User valid:', result.data)

  return {
    success: true,
    data: result.data,
  }
}
