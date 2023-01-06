# ReGo - Regionalität to go

This is going to be the MMP3-Project during our MultiMediaTechnology bachelor studis at the university of applied sciences salzburg.

Creators: Bernadette Ackerl, Vanessa Reiter and Markus Rinnerberger

---

Currently using:

- Next.js,
- Postgresql,
- Prisma
- GraphQL,
- Nexus,
- Apollo Server and Client
- SASS

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

---

## Getting Started

Install the dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

setup an .env file for your local database, you can copy the example env file and adapt it. It should not be a problem if you adapted DATABASE_URL does not exist yet, because when first executing, it should be created anyways.

```bash
npx prisma db push
```

seeding you DB:

```bash
npx prisma db seed
```

start Prisma Studio to checkout you DB

```bash
npm run viewDb
```

---

This applicaton is deployed via Vercel | GitHub

you can view it here: https://rego-tau.vercel.app/
