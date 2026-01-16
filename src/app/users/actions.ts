"use server";

import { prisma } from "@/app/lib/prisma";



export async function getAllUsers() {
  return prisma.user.findMany({ orderBy: { id: "asc" } });
}

// Create user
export async function createUser(name: string, email: string) {
  return prisma.user.create({ data: { name, email } });
}

// Update user
export async function updateUser(id: number, name: string, email: string) {
  return prisma.user.update({ where: { id }, data: { name, email } });
}

// Delete user
export async function deleteUser(id: number) {
  return prisma.user.delete({ where: { id } });
}