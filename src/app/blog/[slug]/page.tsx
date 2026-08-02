import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import MDXImage from "@/components/MDXImage";

const components = {
  img: (props: any) => <MDXImage {...props} />,
  p: (props: any) => <div className="prose-p" {...props} />,
};

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Agnel Francis`,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="page-container">
      <div className="detail-container">
        <Link href="/blog" className="back-link">
          ← Back to Blog
        </Link>
        
        <header className="detail-header">
          <h1 className="detail-title">{post.title}</h1>
          <div className="detail-meta">
            <span className="detail-category">{new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
            <div className="detail-tags">
              {post.tags.map(tag => (
                <span key={tag} className="detail-tag">{tag}</span>
              ))}
            </div>
          </div>
        </header>

        <div className="detail-content prose">
          <MDXRemote source={post.content} components={components} />
        </div>
      </div>
    </main>
  );
}
