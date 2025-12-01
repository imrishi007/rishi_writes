import React from 'react';
import { Link } from 'react-router-dom';
import './BlogCard.css';

const BlogCard = ({ post }) => {
  const { slug, title, excerpt, date, readTime, tags, image } = post;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <Link to={`/blog/${slug}`} className="blog-card">
      {image && (
        <div className="blog-card-image">
          <img src={image} alt={title} loading="lazy" />
        </div>
      )}
      <div className="blog-card-content">
        <div className="blog-card-meta">
          <span className="blog-card-date">{formatDate(date)}</span>
        </div>
        <h2 className="blog-card-title">{title}</h2>
        <p className="blog-card-excerpt">{excerpt}</p>
        {tags && tags.length > 0 && (
          <div className="blog-card-tags">
            {tags.map((tag, index) => (
              <span key={index} className="blog-card-tag">
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="blog-card-footer">
          <span className="blog-card-link">
            Read more
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
