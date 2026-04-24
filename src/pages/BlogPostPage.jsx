import { useEffect, useRef } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import gsap from 'gsap';
import { getPostBySlug, getRelatedPosts } from '../data/blog';
import './BlogPostPage.css';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);
  const rootRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  useEffect(() => {
    if (!post) return;
    const ctx = gsap.context(() => {
      gsap.from('.bp-hero > *', {
        opacity: 0, y: 30, duration: 0.9, ease: 'power3.out', stagger: 0.08,
      });
    }, rootRef);
    return () => ctx.revert();
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;

  const related = getRelatedPosts(slug);

  return (
    <main className="blogpost-page" ref={rootRef}>
      <nav className="bp-breadcrumbs" aria-label="Breadcrumb">
        <div className="bp-breadcrumbs__inner">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to="/blog">Journal</Link>
          <span aria-hidden="true">/</span>
          <span className="bp-breadcrumbs__current">{post.title}</span>
        </div>
      </nav>

      <article className="bp-article">
        <header
          className="bp-hero"
          style={{ background: `radial-gradient(ellipse at 30% 10%, ${post.accent}30 0%, #ffffff 65%)` }}
        >
          <span className="bp-hero__category">{post.category}</span>
          <h1 className="bp-hero__title">{post.title}</h1>
          <p className="bp-hero__excerpt">{post.excerpt}</p>
          <div className="bp-hero__meta">
            <span>{post.author.name} · {post.author.role}</span>
            <span className="bp-hero__dot" aria-hidden="true">·</span>
            <span>{formatDate(post.date)}</span>
            <span className="bp-hero__dot" aria-hidden="true">·</span>
            <span>{post.readTime} min read</span>
          </div>
        </header>

        <div className="bp-body">
          {post.body.map((block, i) => {
            if (block.type === 'h2') return <h2 key={i}>{block.text}</h2>;
            return <p key={i}>{block.text}</p>;
          })}
        </div>
      </article>

      {related.length > 0 && (
        <section className="bp-related">
          <div className="bp-related__inner">
            <h2 className="bp-related__title">Keep reading</h2>
            <div className="bp-related__grid">
              {related.map((r) => (
                <Link to={`/blog/${r.slug}`} className="bp-related__card" key={r.slug}>
                  <div
                    className="bp-related__media"
                    style={{ background: `radial-gradient(circle at 50% 50%, ${r.accent}40 0%, transparent 70%)` }}
                  ></div>
                  <div className="bp-related__body">
                    <span className="bp-related__category">{r.category}</span>
                    <h3>{r.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
