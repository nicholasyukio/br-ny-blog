// src/app/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

export default function Home() {
  const postsDirectory = path.join(process.cwd(), "src/posts");
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    return {
      slug: filename.replace(".md", ""),
      title: data.title,
      description: data.description,
      date: data.date,
      cover: data.cover
    };
  });

  return (
    <>
    <header className="bg-[#139ace] h-36 flex flex-col justify-center items-center mb-8">
    <img 
        src="/images/blog_image.png" 
        alt="Logo" 
        className="w-64 h-64 object-contain mt-2" 
    />
    <p className="text-2xl sm:text-xl text-center text-white mt-4 mb-4">
    Blog de Nicholas Yukio em português
    </p>
    </header>
    <main className="max-w-7xl mx-auto p-4 bg-white text-black">
      <p className="text-lg sm:text-xl text-center text-gray-600 mt-4">
        Veja meus últimos artigos abaixo:
      </p>
      <ul className="mt-8 space-y-6">
        {posts.map((post) => (
          <li key={post.slug} className="border-b pb-4">
            <Link
              href={`/blog/${post.slug}`}
              className="text-xl sm:text-2xl font-semibold text-blue-500 hover:underline"
            >
              {post.title}
            </Link>
            {/* {post.cover && (
              <img
                src={post.cover}
                alt={`Imagem de capa do artigo ${post.title}`}
                className="h-64 object-cover rounded-md mb-6"
              />
            )} */}
            <p className="text-sm sm:text-base">{post.description}</p>
            <p className="text-gray-500 text-sm sm:text-base">{post.date}</p>
          </li>
        ))}
      </ul>
    </main>
    </>
  );
}
