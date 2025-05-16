# Form Builder Full Stack

<p style="text-align: center;">
    <a href="https://www.pedroestevao.com">
        <img src="https://res.cloudinary.com/dge3g9rcw/image/upload/v1747433667/github/iyenjgx6zkelxaztb1du.webp" alt="Illustrative image" />
    </a>
</p>

A modern full stack **form builder application** built with the latest technologies in the React ecosystem. Users can create, customize, preview, and share responsive forms through an intuitive drag-and-drop interface.

## About the Project

This project was developed by following a 4-hour full-stack tutorial, using the latest features of the Next.js App Router. It allows users to design and publish interactive forms with layout and input elements, track submissions, and view detailed stats.

## Tech Stack

This project leverages the following tools and technologies:

- [Next.js 13+ (App Router)](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [DnD Kit](https://dndkit.com/)
- [Supabase](https://supabase.com/) / [Vercel PostgreSQL](https://vercel.com/postgres)
- [Prisma ORM](https://www.prisma.io/)

## Features

- **Responsive design**
- **Drag and drop form designer** (powered by DnD-kit)
- Layout fields: Title, Subtitle, Paragraph, Spacer, Separator
- orm fields: Text, Number, Select, Date, Checkbox, Textarea
- **Form preview dialog**
- **Sharable form URLs**
- **Form submission with validation**
- **Form statistics** (submissions & visits tracking)
- Easy to customize and add new fields

## Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/pedroestevaodev/form-builder-nextjs.git
cd form-builder-nextjs
```

### 2. Install dependencies

```bash
$ bun install
```

### 3. Environment Variables

Create a `.env.local` file in the root and configure the following variables:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="tobemodified"
CLERK_SECRET_KEY="tobemodified"
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/"
DATABASE_URL="tobemodified"
```

### 4. Start the development server

```bash
$ bun run dev
```

Open your browser and visit `http://localhost:3000` to see the project in action.

You can start editing the homepage by modifying the `app/layout.tsx` file. The browser will automatically update as you make changes to the code.

## Resources

To learn more about the technologies used in this project, check out the following resources:

- [Next.js Docs](https://nextjs.org/docs) - Learn more about Next.js features and APIs.
- [Next.js Learn](https://nextjs.org/learn) - Interactive tutorial to learn Next.js.
- [React Docs](https://pt-br.react.dev/learn) - Access the official React guide.
- [Tailwind CSS Docs](https://tailwindcss.com/docs) - Learn how to use Tailwind CSS to style your application.
- [Supabase Docs](https://supabase.com/docs) - Learn how to get up and running with Supabase through tutorials, APIs and platform resources.

## Deploy

The easiest way to deploy your Next.js application is by using the [Vercel Platform](https://vercel.com/new), created by the developers of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

> Make sure to set the environment variables in Vercel > Settings > Environment Variables.

## Learning Credits

This project was built based on the **YouTube** tutorial:

🎬 [**_NextJs course: Full stack Form builder, React, Typescript, Dnd-Kit, PostgreSQL, Prisma, Tailwind_**](https://youtu.be/QGXUUXy0AMw?si=NH96eRCufnYjNWM-)  
👨🏻‍💻 [_Kliton Bare_](https://www.youtube.com/@klitonbare)

## License

This project is open source and available under the [MIT License](https://mit-license.org/).  
<br />

---

<br />

**Built with ☕ by [Pedro Estevão](https://www.pedroestevao.com)**
