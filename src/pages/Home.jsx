import React from 'react';
import Hero from '../components/Hero/Hero';
import BlogCard from '../components/BlogCard/BlogCard';
import blogPosts from '../data/blogPosts';
import './Home.css';

const Home = () => {
  return (
    <main className="home">
      <Hero />
      
      <section id="posts" className="posts-section">
        <div className="posts-container">

          
          {blogPosts.length > 0 ? (
            <div className="posts-grid">
              {blogPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="posts-empty">
              <p>No posts yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Home;
