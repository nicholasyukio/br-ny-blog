import { getPostBySlug, getAllPosts } from "../../../lib/posts";
import { remark } from "remark";
import html from "remark-html";

export default function Post({ metadata, content }: any) {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">{metadata.title}</h1>
      <p className="text-gray-500">{metadata.date}</p>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </main>
  );
}

export async function getStaticPaths() {
  const posts = getAllPosts();
  const paths = posts.map((post) => ({ params: { slug: post.slug } }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: any) {
  const post = getPostBySlug(params.slug);
  const processedContent = await remark().use(html).process(post.content);
  return { props: { metadata: post.metadata, content: processedContent.toString() } };
}
