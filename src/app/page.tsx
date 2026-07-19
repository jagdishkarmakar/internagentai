import Link from "next/link";
import "./page.css";

export default function Home() {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">
          Discover Your Perfect <span className="highlight">Internship</span>
        </h1>
        <p className="hero-subtitle">
          AI-driven personalized recommendations, skill gap analysis, and learning roadmaps tailored just for you.
        </p>
        <div className="hero-actions">
          <Link href="/dashboard" className="btn btn-primary btn-large">
            Get Started
          </Link>
        </div>
      </div>
      
      <div className="features-grid">
        <div className="card feature-card">
          <h3>Personalized Roles</h3>
          <p>Get matched with the best internship roles based on your skills, interests, and CGPA.</p>
        </div>
        <div className="card feature-card">
          <h3>Skill Gap Analysis</h3>
          <p>Identify missing skills and get a priority list of what you need to learn.</p>
        </div>
        <div className="card feature-card">
          <h3>Learning Roadmap</h3>
          <p>Receive a structured weekly study plan and curated resources to land your dream role.</p>
        </div>
      </div>
    </div>
  );
}
