import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import blogPosts from '../data/blogPosts';
import './BlogPost.css';

// Dynamic imports for blog post components
const postComponents = {
  'getting-started-with-react-hooks': React.lazy(() => import('./posts/getting-started-with-react-hooks')),
  'neural-networks-guide': React.lazy(() => import('./posts/NeuralNetworksGuide')),
  'quant-trading-backtesting': React.lazy(() => import('./posts/QuantTradingBacktesting')),
  'low-latency-security-hft': React.lazy(() => import('./posts/LowLatencySecurityHFT')),
};

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [PostContent, setPostContent] = useState(null);
  const [tableOfContents, setTableOfContents] = useState([]);
  const [activeSection, setActiveSection] = useState('');
  const [isIndexOpen, setIsIndexOpen] = useState(false);
  
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

  // Extract table of contents from headings
  useEffect(() => {
    const timer = setTimeout(() => {
      const headings = document.querySelectorAll('.blog-post-content h2, .blog-post-content h3');
      const toc = Array.from(headings).map((heading) => ({
        id: heading.id,
        text: heading.textContent,
        level: heading.tagName.toLowerCase(),
      }));
      setTableOfContents(toc);
    }, 100);

    return () => clearTimeout(timer);
  }, [PostContent]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const headings = document.querySelectorAll('.blog-post-content h2, .blog-post-content h3');
      let currentSection = '';

      headings.forEach((heading) => {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 150 && rect.top >= -100) {
          currentSection = heading.id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [PostContent]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setIsIndexOpen(false); // Close menu after navigation
    }
  };

  const toggleIndex = () => {
    setIsIndexOpen(!isIndexOpen);
  };

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

        {/* Floating Index Button */}
        {tableOfContents.length > 0 && (
          <button className="index-toggle-btn" onClick={toggleIndex} aria-label="Toggle table of contents">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
            <span className="index-label">Index</span>
          </button>
        )}

        {/* Index Overlay */}
        {tableOfContents.length > 0 && (
          <>
            <div className={`index-overlay ${isIndexOpen ? 'open' : ''}`} onClick={toggleIndex}></div>
            <aside className={`index-sidebar ${isIndexOpen ? 'open' : ''}`}>
              <div className="index-header">
                <h4 className="index-title">Table of Contents</h4>
                <button className="index-close-btn" onClick={toggleIndex} aria-label="Close index">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
              <nav className="index-nav">
                {tableOfContents.map((item, index) => (
                  <button
                    key={index}
                    className={`index-item index-${item.level} ${activeSection === item.id ? 'active' : ''}`}
                    onClick={() => scrollToSection(item.id)}
                  >
                    {item.text}
                  </button>
                ))}
              </nav>
            </aside>
          </>
        )}

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
