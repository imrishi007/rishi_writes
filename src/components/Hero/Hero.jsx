import React from 'react';
import './Hero.css';

const Hero = () => {
  const scrollToPosts = () => {
    const postsSection = document.getElementById('posts');
    if (postsSection) {
      postsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero">
      <div className="hero-container">
        <h1 className="hero-title">
          <span className="hero-title-main">RISHI</span>
          <span className="hero-title-accent">WRITES</span>
        </h1>
        <p className="hero-subtitle">
          Thoughts, stories, and ideas beyond algorithms
        </p>
        <p className="hero-description">
          Welcome to my corner of the internet where I share insights about technology, 
          life experiences, tutorials, and everything that doesn't fit into a recursion tree.
        </p>
        <button className="hero-cta" onClick={scrollToPosts}>
          <span>Explore Posts</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M19 12l-7 7-7-7"/>
          </svg>
        </button>
      </div>
      <div className="hero-glow"></div>
    </section>
  );
};

export default Hero;
