import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function Blog() {
  // Get all markdown files
  const postsDirectory = path.join(process.cwd(), "src/posts");
  const filenames = fs.readdirSync(postsDirectory);

  // Extract metadata from each post
  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    return {
      slug: filename.replace(".md", ""),
      title: data.title,
      date: data.date,
    };
  });

  return (
    <main>
      <h1>Blog t</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <a href={`/blog/${post.slug}`}>{post.title}</a>
          </li>
        ))}
      </ul>
    </main>
  );
}
