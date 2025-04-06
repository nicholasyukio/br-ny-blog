// src/app/blog/[slug]/page.tsx
import fs from "fs";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";

export default function BlogPost({ params }: { params: { slug: string } }) {
  const postFilePath = path.join(process.cwd(), "src/posts", `${params.slug}.md`);

  if (!fs.existsSync(postFilePath)) {
    notFound();  // Show 404 if post does not exist
  }

  const fileContent = fs.readFileSync(postFilePath, "utf-8");
  const { data, content } = matter(fileContent);

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
    
    <main className="max-w-3xl mx-auto p-6 bg-white text-black">
    <div className="mt-0 mb-8">
        <a href="/" className="text-blue-500 hover:underline">
          Voltar ao início
        </a>
    </div>
      <article>
        <h1 className="text-3xl font-bold text-gray-800">{data.title}</h1>
        {data.cover && (
          <img
            src={data.cover}
            alt={`Imagem de capa do artigo ${data.title}`}
            className="w-full h-96 object-cover rounded-md mt-4 mb-6"
          />
        )}
        <p className="text-gray-600 mt-2">{data.date}</p>
        <div className="mt-6 text-lg leading-relaxed space-y-4 markdown">
        <ReactMarkdown rehypePlugins={[rehypeRaw]} >
        {/* <ReactMarkdown>  */}
            {content}
        </ReactMarkdown>
        </div>
      </article>
      
      {/* Link to the homepage */}
      <div className="mt-8">
        <a href="/" className="text-blue-500 hover:underline">
          Voltar ao início
        </a>
      </div>
    </main>
    </>
  );
}
