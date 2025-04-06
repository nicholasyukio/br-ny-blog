import Link from "next/link";
import { getAllPosts } from "../../lib/posts";

export default function Home({ posts }: { posts: any[] }) {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug} className="mb-2">
            <Link href={`/post/${post.slug}`} className="text-blue-500">
              {post.metadata.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

export async function getStaticProps() {
  return { props: { posts: getAllPosts() } };
}
