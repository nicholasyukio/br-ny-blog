// src/app/api/posts/[slug]/route.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { NextResponse } from 'next/server';
import {remark} from 'remark';
import remarkHtml from 'remark-html';

export async function GET({ params }: { params: { slug: string } }) {
  const postFilePath = path.join(process.cwd(), 'src/posts', `${params.slug}.md`);

  if (!fs.existsSync(postFilePath)) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  const fileContent = fs.readFileSync(postFilePath, 'utf-8');
  const { data, content } = matter(fileContent);
  
  // Use remark to convert markdown to HTML
  const processedContent = await remark()
    .use(remarkHtml)  // Convert markdown to HTML
    .process(content);

  const htmlContent = processedContent.toString();

  // Return both the metadata and the converted HTML content
  return NextResponse.json({
    metadata: data,
    content: htmlContent,
  });
}
