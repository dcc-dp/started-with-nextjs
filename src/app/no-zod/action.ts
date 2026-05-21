// services/user.service.ts

export type UserInput = {
  name: string
  email: string
  age: number
}

export type RegisterResult =
  | { success: true; data: UserInput }
  | { success: false; errors: string[] }

export function registerUser(data: UserInput): RegisterResult {
  const errors: string[] = []

  // validasi name
  if (!data.name) {
    errors.push('Name wajib diisi')
  }

  if (data.name.length < 3) {
    errors.push('Name minimal 3 karakter')
  }

  // validasi email
  if (!data.email.includes('@')) {
    errors.push('Email tidak valid')
  }

  // validasi age
  if (typeof data.age !== 'number') {
    errors.push('Age harus number')
  }

  if (data.age < 18) {
    errors.push('Umur minimal 18')
  }

  // jika ada error
  if (errors.length > 0) {
    return {
      success: false,
      errors,
    }
  }

  console.log('User valid:', data)

  return {
    success: true,
    data,
  }
}
