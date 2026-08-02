import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Agnel Francis",
  description: "Insights, tutorials, and updates on design and development.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  const bgClasses = ["bg-blue", "bg-orange", "bg-yellow"];

  return (
    <main className="page-container">
      <div className="page-header">
        <h1 className="page-title">Blog & Insights</h1>
        <p className="page-subtitle">A collection of thoughts on design, code, and everything in between.</p>
      </div>
      
      <div className="blog-grid">
        {posts.map((post, index) => (
          <Link 
            href={`/blog/${post.slug}`} 
            key={post.slug} 
            className="blog-card"
          >
            <div className={`blog-card-image ${bgClasses[index % bgClasses.length]}`}>
              <div className={`abstract-shape ${index % 2 === 0 ? 'abstract-circle' : 'abstract-square'}`}></div>
            </div>
            <div className="blog-card-content">
              <div className="blog-card-date">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <h2 className="blog-card-title">{post.title}</h2>
              <p className="blog-card-excerpt">{post.excerpt}</p>
              <div className="tags">
                {post.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
