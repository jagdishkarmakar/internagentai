"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import "./dashboard.css";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    name: "",
    cgpa: "",
    year: "",
    branch: "",
    college: "",
    skills: "",
    languages: "",
    frameworks: "",
    tools: "",
    databases: "",
    projects: "",
    interests: "",
    preferred_technologies: "",
    career_goal: "",
    hours: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (status === "loading") return <p className="loading-state">Loading...</p>;

  if (!session) {
    return (
      <div className="card text-center" style={{ marginTop: "4rem" }}>
        <h2>Access Denied</h2>
        <p>Please log in with Google to access the dashboard.</p>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate recommendation");

      setResult(data.result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="card form-card">
        <h2>Student Profile</h2>
        <p className="subtitle">Fill out your details to get a personalized internship roadmap.</p>
        
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label>Full Name</label>
            <input name="name" value={formData.name} onChange={handleChange} required />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>CGPA</label>
              <input name="cgpa" placeholder="e.g., 8.5" value={formData.cgpa} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Year of Study</label>
              <input name="year" placeholder="e.g., 3rd Year" value={formData.year} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Branch / Major</label>
              <input name="branch" placeholder="e.g., Computer Science" value={formData.branch} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>College</label>
              <input name="college" value={formData.college} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group">
            <label>General Skills</label>
            <textarea name="skills" placeholder="Problem solving, Data structures..." value={formData.skills} onChange={handleChange} rows={2} required />
          </div>

          <div className="form-group">
            <label>Programming Languages</label>
            <input name="languages" placeholder="Python, Java, C++..." value={formData.languages} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Frameworks</label>
            <input name="frameworks" placeholder="React, Express, Django..." value={formData.frameworks} onChange={handleChange} required />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Tools</label>
              <input name="tools" placeholder="Git, Docker..." value={formData.tools} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Databases</label>
              <input name="databases" placeholder="MongoDB, MySQL..." value={formData.databases} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group">
            <label>Projects (Briefly describe 1-2)</label>
            <textarea name="projects" value={formData.projects} onChange={handleChange} rows={3} required />
          </div>

          <div className="form-group">
            <label>Interests</label>
            <input name="interests" placeholder="AI, Web Dev, Cloud..." value={formData.interests} onChange={handleChange} required />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Preferred Technologies</label>
              <input name="preferred_technologies" placeholder="e.g., Python, React" value={formData.preferred_technologies} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Hours available per week</label>
              <input name="hours" type="number" placeholder="e.g., 15" value={formData.hours} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group">
            <label>Career Goal</label>
            <textarea name="career_goal" placeholder="e.g., Become a Machine Learning Engineer" value={formData.career_goal} onChange={handleChange} rows={2} required />
          </div>

          <button type="submit" className="btn btn-primary submit-btn" disabled={loading}>
            {loading ? "Analyzing Profile..." : "Generate Roadmap"}
          </button>
        </form>
      </div>

      {error && (
        <div className="card error-card">
          <p>{error}</p>
        </div>
      )}

      {result && (
        <div className="card result-card markdown-body">
          <ReactMarkdown>{result}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
