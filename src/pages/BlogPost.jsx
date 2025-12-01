import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import blogPosts from '../data/blogPosts';
import './BlogPost.css';

// Dynamic imports for blog post components
const postComponents = {
  'getting-started-with-react-hooks': React.lazy(() => import('./posts/getting-started-with-react-hooks')),
  'neural-networks-guide': React.lazy(() => import('./posts/NeuralNetworksGuide')),
  'quant-trading-backtesting': React.lazy(() => import('./posts/QuantTradingBacktesting')),
};

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [PostContent, setPostContent] = useState(null);
  
  const post = blogPosts.find(p => p.slug === slug);

  useEffect(() => {
    if (!post) {
      navigate('/');
      return;
    }

    if (postComponents[slug]) {
      setPostContent(() => postComponents[slug]);
    }
  }, [slug, post, navigate]);

  if (!post) {
    return null;
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <main className="blog-post">
      <article className="blog-post-container">
        <Link to="/" className="blog-post-back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to posts
        </Link>

        <header className="blog-post-header">
          <div className="blog-post-meta">
            <span className="blog-post-date">{formatDate(post.date)}</span>
          </div>
          <h1 className="blog-post-title">{post.title}</h1>
          {post.tags && post.tags.length > 0 && (
            <div className="blog-post-tags">
              {post.tags.map((tag, index) => (
                <span key={index} className="blog-post-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="blog-post-content">
          {PostContent ? (
            <React.Suspense fallback={<div className="loading">Loading...</div>}>
              <PostContent />
            </React.Suspense>
          ) : (
            <div className="blog-post-placeholder">
              <p>{post.excerpt}</p>
              <p className="coming-soon">Full content coming soon...</p>
            </div>
          )}
        </div>

        <footer className="blog-post-footer">
          <div className="blog-post-author">
            <img src="/logo1.jpeg" alt="Rishi Raval" className="author-image" />
            <div className="author-info">
              <span className="author-name">Rishi Raval</span>
            </div>
          </div>
        </footer>
      </article>
    </main>
  );
};

export default BlogPost;
