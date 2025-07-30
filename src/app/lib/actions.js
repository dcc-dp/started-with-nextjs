'use server';

import db from './db';
import { revalidatePath } from 'next/cache';

export async function createUser(formData) {
  try {
    const name = formData.get('name');
    const email = formData.get('email');
    const age = formData.get('age');

    if (!name || !email || !age) {
      throw new Error('Semua field harus diisi!');
    }

    const [result] = await db.execute(
      'INSERT INTO users (name, email, age) VALUES (?, ?, ?)',
      [name, email, parseInt(age)]
    );

    revalidatePath('/');
    return { success: true, message: 'Pengguna berhasil ditambahkan!' };
  } catch (error) {
    console.error('Error creating user:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      throw new Error('Email sudah digunakan!');
    }
    throw new Error('Gagal menambahkan pengguna');
  }
}

export async function updateUser(id, formData) {
  try {
    const name = formData.get('name');
    const email = formData.get('email');
    const age = formData.get('age');

    if (!name || !email || !age) {
      throw new Error('Semua field harus diisi!');
 }

    const [result] = await db.execute(
      'UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?',
      [name, email, parseInt(age), id]
    );

    if (result.affectedRows === 0) {
      throw new Error('Pengguna tidak ditemukan');
    }

    revalidatePath('/');
    return { success: true, message: 'Pengguna berhasil diperbarui!' };
  } catch (error) {
    console.error('Error updating user:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      throw new Error('Email sudah digunakan!');
    }
    throw new Error('Gagal memperbarui pengguna');
  }
}

export async function deleteUser(id) {
  try {
    const [result] = await db.execute('DELETE FROM users WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
      throw new Error('Pengguna tidak ditemukan');
    }

    revalidatePath('/');
    return { success: true, message: 'Pengguna berhasil dihapus!' };
  } catch (error) {
console.error('Error deleting user:', error);
    throw new Error('Gagal menghapus pengguna');
  }
}

export async function getUsers() {
  try {
    const [rows] = await db.execute('SELECT * FROM users ORDER BY id DESC');
    return rows;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Gagal mengambil data pengguna');
  }
}

export async function getUserById(id) {
  try {
    const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0] || null;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Gagal mengambil data pengguna');
  }
}