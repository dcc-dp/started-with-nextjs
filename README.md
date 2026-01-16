This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Prisma ORM
Oke! Sekarang aku akan jelaskan alurnya secara lengkap dan jelas, dari awal sampai akhir, termasuk mengapa kita menaruh CRUD di actions.ts, bagaimana Prisma bekerja, dan bagaimana UI berinteraksi dengan database. Aku buat versi lebih panjang dan detail, supaya kamu benar-benar paham konsep dan praktiknya. 😄

⸻

1️⃣ Persiapan Database

Kita pakai MySQL/MariaDB untuk menyimpan data User. Prisma 7 bekerja dengan database relasional, jadi ini wajib.

Opsi:
	•	Install MySQL/MariaDB lokal
	•	Pakai Docker (lebih cepat, portable)

Contoh pakai Docker:

docker run --name my-mysql \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=mydb \
  -p 3306:3306 \
  -d mysql:8

	•	MYSQL_ROOT_PASSWORD=root → password root
	•	MYSQL_DATABASE=mydb → database awal
	•	-p 3306:3306 → expose port lokal

Cek koneksi:

mysql -u root -p -h 127.0.0.1 -P 3306
# masukkan password root

Jika berhasil login → database siap dipakai

⸻

2️⃣ Buat Project Next.js Baru

npx create-next-app@latest prisma-orm --typescript
cd prisma-orm

	•	--typescript → langsung pakai TypeScript
	•	Folder prisma-orm → tempat semua source code
	•	Kita pakai App Router Next.js 13+, jadi setiap folder bisa jadi route

⸻Oke! Sekarang aku akan jelaskan alurnya secara lengkap dan jelas, dari awal sampai akhir, termasuk mengapa kita menaruh CRUD di actions.ts, bagaimana Prisma bekerja, dan bagaimana UI berinteraksi dengan database. Aku buat versi lebih panjang dan detail, supaya kamu benar-benar paham konsep dan praktiknya. 😄

⸻

1️⃣ Persiapan Database

Kita pakai MySQL/MariaDB untuk menyimpan data User. Prisma 7 bekerja dengan database relasional, jadi ini wajib.

Opsi:
	•	Install MySQL/MariaDB lokal
	•	Pakai Docker (lebih cepat, portable)

Contoh pakai Docker:

docker run --name my-mysql \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=mydb \
  -p 3306:3306 \
  -d mysql:8

	•	MYSQL_ROOT_PASSWORD=root → password root
	•	MYSQL_DATABASE=mydb → database awal
	•	-p 3306:3306 → expose port lokal

Cek koneksi:

mysql -u root -p -h 127.0.0.1 -P 3306
# masukkan password root

Jika berhasil login → database siap dipakai

⸻

2️⃣ Buat Project Next.js Baru

npx create-next-app@latest prisma-orm --typescript
cd prisma-orm

	•	--typescript → langsung pakai TypeScript
	•	Folder prisma-orm → tempat semua source code
	•	Kita pakai App Router Next.js 13+, jadi setiap folder bisa jadi route

⸻

3️⃣ Instalasi Paket

3a. Dev Tools

npm install prisma @types/node --save-dev

	•	prisma → CLI untuk generate Prisma Client dan migrate database
	•	@types/node → type definitions untuk Node.js

3b. Runtime Packages

npm install @prisma/client @prisma/adapter-mariadb dotenv

	•	@prisma/client → query database di code
	•	@prisma/adapter-mariadb → adapter Prisma 7 untuk MariaDB/MySQL
	•	dotenv → load .env supaya password/host tidak hardcode

Semua package ini wajib agar Prisma bisa connect ke database dan kita bisa menulis query type-safe.

⸻

4️⃣ Buat File .env

Di root project:

DATABASE_HOST=127.0.0.1
DATABASE_PORT=3306
DATABASE_NAME=mydb
DATABASE_USER=root
DATABASE_PASSWORD=root

	•	Menyimpan konfigurasi database
	•	Supaya Prisma dan kode kita tidak hardcode username/password

⸻

5️⃣ Buat Prisma Config (Prisma 7)

Folder: prisma/
File: prisma/prisma.config.ts

import "dotenv/config";
import { defineConfig } from "prisma/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

export default defineConfig({
  datasource: {
    db: {
      adapter: new PrismaMariaDb({
        host: process.env.DATABASE_HOST!,
        port: Number(process.env.DATABASE_PORT!),
        user: process.env.DATABASE_USER!,
        password: process.env.DATABASE_PASSWORD!,
        database: process.env.DATABASE_NAME!,
        connectionLimit: 5,
      }),
    },
  },
});

Fungsi:
	•	Datasource Prisma 7 menggantikan url lama
	•	Menghubungkan Prisma ke database
	•	connectionLimit: 5 → maksimal koneksi simultan

⸻

6️⃣ Buat Prisma Schema (Model)

File: prisma/schema.prisma:

model User {
  id    Int    @id @default(autoincrement())
  name  String
  email String @unique
}

Fungsi:
	•	id → primary key
	•	email → unik
	•	Prisma otomatis membuat tabel User via migrate
	•	Nantinya bisa menambahkan relasi (misal: Todo → User)

⸻

7️⃣ Generate Prisma Client

npx prisma generate

	•	Prisma Client siap pakai di project
	•	Folder generated/prisma → berisi type-safe client
	•	Kita bisa import PrismaClient dari sini

⸻

8️⃣ Migrasi Database

npx prisma migrate dev --name init

	•	Prisma membuat tabel User di database
	•	Folder prisma/migrations → menyimpan history migrate
	•	Sekarang tabel siap untuk CRUD

⸻

9️⃣ Buat Instance Prisma Tunggal

File: src/lib/prisma.ts:

import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../../generated/prisma/client";

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST!,
  port: Number(process.env.DATABASE_PORT!),
  user: process.env.DATABASE_USER!,
  password: process.env.DATABASE_PASSWORD!,
  database: process.env.DATABASE_NAME!,
  connectionLimit: 5,
});

export const prisma = new PrismaClient({ adapter });

Fungsi:
	•	Hanya satu instance Prisma → mencegah pool timeout
	•	Bisa dipakai di semua server actions

⸻

🔟 Buat CRUD (Server Actions)

Folder: src/app/users/actions.ts

import { prisma } from "../../lib/prisma";

// Read all users
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

Kenapa CRUD diletakkan di actions.ts:
	1.	Pisahkan logika database dan UI
	2.	Mudah di-maintain & reusable
	3.	Type-safe karena Prisma Client digunakan di server

⸻

1️⃣1️⃣ Buat Halaman Users dengan CRUD Lengkap

File: src/app/users/page.tsx:

"use client";

import { useState, useEffect } from "react";
import { getAllUsers, createUser, updateUser, deleteUser } from "./actions";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // Load users
  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const data = await getAllUsers();
    setUsers(data);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editingId) {
      await updateUser(editingId, name, email);
      setEditingId(null);
    } else {
      await createUser(name, email);
    }
    setName("");
    setEmail("");
    fetchUsers();
  }

  function handleEdit(user: User) {
    setName(user.name);
    setEmail(user.email);
    setEditingId(user.id);
  }

  async function handleDelete(id: number) {
    await deleteUser(id);
    fetchUsers();
  }

  return (
    <div style={{ padding: 20, maxWidth: 600 }}>
      <h1>User Management</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button type="submit">{editingId ? "Update" : "Create"}</button>
      </form>

      <ul>
        {users.map(user => (
          <li key={user.id} style={{ marginBottom: 10 }}>
            {user.name} ({user.email})
            <button onClick={() => handleEdit(user)} style={{ marginLeft: 10 }}>
              Edit
            </button>
            <button onClick={() => handleDelete(user.id)} style={{ marginLeft: 5 }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

Fungsi UI:
	•	Form → Create / Update user
	•	Tombol Edit → isi form dengan data user
	•	Tombol Delete → hapus user dari database
	•	List → menampilkan semua user

⸻

1️⃣2️⃣ Jalankan Project

npm run dev

	•	Server ready di http://localhost:3000/users
	•	Bisa langsung CRUD User lengkap
	•	Semua query dijalankan via Prisma Client, type-safe, dan aman

⸻

1️⃣3️⃣ Kesimpulan Lengkap
	1.	Database → MySQL/MariaDB (lokal/Docker)
	2.	Next.js → Frontend + server actions
	3.	Prisma 7 + MariaDB → ORM modern, type-safe
	4.	.env → menyimpan host, port, username, password
	5.	CRUD Server Actions → semua query database di server (actions.ts)
	6.	UI interaktif → bisa Create, Read, Update, Delete user
	7.	Single Prisma Client → mencegah pool timeout

⸻

💡 Catatan Penting:
	•	Semua CRUD diletakkan di actions.ts supaya kode rapi, reusable, dan UI bersih
	•	page.tsx → hanya menangani UI dan memanggil function di actions.ts
	•	Nantinya bisa tambah model relasi, misal Todo → User, untuk membuat Todo List multi-user

⸻

Kalau kamu mau, aku bisa buatkan versi Todo List lengkap dengan relasi User → Todo, dengan CRUD untuk user dan todo, sekaligus UI interaktif.

Apakah mau aku buatkan versi itu sekarang?

3️⃣ Instalasi Paket

3a. Dev Tools

npm install prisma @types/node --save-dev

	•	prisma → CLI untuk generate Prisma Client dan migrate database
	•	@types/node → type definitions untuk Node.js

3b. Runtime Packages

npm install @prisma/client @prisma/adapter-mariadb dotenv

	•	@prisma/client → query database di code
	•	@prisma/adapter-mariadb → adapter Prisma 7 untuk MariaDB/MySQL
	•	dotenv → load .env supaya password/host tidak hardcode

Semua package ini wajib agar Prisma bisa connect ke database dan kita bisa menulis query type-safe.

⸻

4️⃣ Buat File .env

Di root project:

DATABASE_HOST=127.0.0.1
DATABASE_PORT=3306
DATABASE_NAME=mydb
DATABASE_USER=root
DATABASE_PASSWORD=root

	•	Menyimpan konfigurasi database
	•	Supaya Prisma dan kode kita tidak hardcode username/password

⸻

5️⃣ Buat Prisma Config (Prisma 7)

Folder: prisma/
File: prisma/prisma.config.ts

import "dotenv/config";
import { defineConfig } from "prisma/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

export default defineConfig({
  datasource: {
    db: {
      adapter: new PrismaMariaDb({
        host: process.env.DATABASE_HOST!,
        port: Number(process.env.DATABASE_PORT!),
        user: process.env.DATABASE_USER!,
        password: process.env.DATABASE_PASSWORD!,
        database: process.env.DATABASE_NAME!,
        connectionLimit: 5,
      }),
    },
  },
});

Fungsi:
	•	Datasource Prisma 7 menggantikan url lama
	•	Menghubungkan Prisma ke database
	•	connectionLimit: 5 → maksimal koneksi simultan

⸻

6️⃣ Buat Prisma Schema (Model)

File: prisma/schema.prisma:

model User {
  id    Int    @id @default(autoincrement())
  name  String
  email String @unique
}

Fungsi:
	•	id → primary key
	•	email → unik
	•	Prisma otomatis membuat tabel User via migrate
	•	Nantinya bisa menambahkan relasi (misal: Todo → User)

⸻

7️⃣ Generate Prisma Client

npx prisma generate

	•	Prisma Client siap pakai di project
	•	Folder generated/prisma → berisi type-safe client
	•	Kita bisa import PrismaClient dari sini

⸻

8️⃣ Migrasi Database

npx prisma migrate dev --name init

	•	Prisma membuat tabel User di database
	•	Folder prisma/migrations → menyimpan history migrate
	•	Sekarang tabel siap untuk CRUD

⸻

9️⃣ Buat Instance Prisma Tunggal

File: src/lib/prisma.ts:

import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../../generated/prisma/client";

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST!,
  port: Number(process.env.DATABASE_PORT!),
  user: process.env.DATABASE_USER!,
  password: process.env.DATABASE_PASSWORD!,
  database: process.env.DATABASE_NAME!,
  connectionLimit: 5,
});

export const prisma = new PrismaClient({ adapter });

Fungsi:
	•	Hanya satu instance Prisma → mencegah pool timeout
	•	Bisa dipakai di semua server actions

⸻

🔟 Buat CRUD (Server Actions)

Folder: src/app/users/actions.ts

import { prisma } from "../../lib/prisma";

// Read all users
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

Kenapa CRUD diletakkan di actions.ts:
	1.	Pisahkan logika database dan UI
	2.	Mudah di-maintain & reusable
	3.	Type-safe karena Prisma Client digunakan di server

⸻

1️⃣1️⃣ Buat Halaman Users dengan CRUD Lengkap

File: src/app/users/page.tsx:

"use client";

import { useState, useEffect } from "react";
import { getAllUsers, createUser, updateUser, deleteUser } from "./actions";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // Load users
  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const data = await getAllUsers();
    setUsers(data);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editingId) {
      await updateUser(editingId, name, email);
      setEditingId(null);
    } else {
      await createUser(name, email);
    }
    setName("");
    setEmail("");
    fetchUsers();
  }

  function handleEdit(user: User) {
    setName(user.name);
    setEmail(user.email);
    setEditingId(user.id);
  }

  async function handleDelete(id: number) {
    await deleteUser(id);
    fetchUsers();
  }

  return (
    <div style={{ padding: 20, maxWidth: 600 }}>
      <h1>User Management</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button type="submit">{editingId ? "Update" : "Create"}</button>
      </form>

      <ul>
        {users.map(user => (
          <li key={user.id} style={{ marginBottom: 10 }}>
            {user.name} ({user.email})
            <button onClick={() => handleEdit(user)} style={{ marginLeft: 10 }}>
              Edit
            </button>
            <button onClick={() => handleDelete(user.id)} style={{ marginLeft: 5 }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

Fungsi UI:
	•	Form → Create / Update user
	•	Tombol Edit → isi form dengan data user
	•	Tombol Delete → hapus user dari database
	•	List → menampilkan semua user

⸻

1️⃣2️⃣ Jalankan Project

npm run dev

	•	Server ready di http://localhost:3000/users
	•	Bisa langsung CRUD User lengkap
	•	Semua query dijalankan via Prisma Client, type-safe, dan aman

⸻

1️⃣3️⃣ Kesimpulan Lengkap
	1.	Database → MySQL/MariaDB (lokal/Docker)
	2.	Next.js → Frontend + server actions
	3.	Prisma 7 + MariaDB → ORM modern, type-safe
	4.	.env → menyimpan host, port, username, password
	5.	CRUD Server Actions → semua query database di server (actions.ts)
	6.	UI interaktif → bisa Create, Read, Update, Delete user
	7.	Single Prisma Client → mencegah pool timeout

⸻

💡 Catatan Penting:
	•	Semua CRUD diletakkan di actions.ts supaya kode rapi, reusable, dan UI bersih
	•	page.tsx → hanya menangani UI dan memanggil function di actions.ts
	•	Nantinya bisa tambah model relasi, misal Todo → User, untuk membuat Todo List multi-user

⸻

