interface Project {
  name: string;
}

interface Job {
  title: string;
  company: string;
}

interface ResearchItem {
  title: string;
  role: string;
}

interface Course {
  code: string;
  name: string;
  grade: string;
}

interface GuiPageProps {
  projects: Project[];
  workExperience: Job[];
  research: ResearchItem[];
  coursework: Course[];
}

export function GuiPage({ projects, workExperience, research, coursework }: GuiPageProps) {
  return (
    <>
      <div className="tp-name">Andrew Li</div>
      <div className="tp-links">
        <a className="tp-link" href="https://github.com/AndrewLi0420" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a className="tp-link" href="https://www.linkedin.com/in/andrewli07/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a className="tp-link" href="mailto:andrewli42@berkeley.edu">Email</a>
      </div>

      <hr className="tp-hr tp-hr--accent" />

      <div className="tp-intro">
        <p>Hey, I'm Andrew.</p>
        <p>
          I'm currently an undergraduate at the University of California, Berkeley with
          a major in Computer Science and looking to double in Statistics or Applied Mathematics as well.
        </p>
        <p>
          I'm looking to pursue a career in Artificial Intelligence adjacent roles, working across the stack from
          fundamental machine learning research to applied AI through startups.
        </p>
        <p>
          Currently, I'm conducting research at Berkeley Artificial Intelligence Research (BAIR), as well as
          recruiting for software engineering roles for the Spring and Summer of 2027.
        </p>
      </div>

      <hr className="tp-hr" />

      <div className="tp-section">
        <div className="tp-section-title">EXPERIENCE</div>
        <ul className="tp-list">
          {workExperience.map((job, index) => (
            <li key={index}>{job.title} @ {job.company}</li>
          ))}
        </ul>
      </div>

      <div className="tp-section">
        <div className="tp-section-title">PROJECTS</div>
        <ul className="tp-list">
          {projects.map((project, index) => (
            <li key={index}>{project.name}</li>
          ))}
        </ul>
      </div>

      <div className="tp-section">
        <div className="tp-section-title">RESEARCH</div>
        <ul className="tp-list">
          {research.map((pub, index) => (
            <li key={index}>{pub.title} ({pub.role})</li>
          ))}
        </ul>
      </div>

      <div className="tp-section">
        <div className="tp-section-title">COURSEWORK</div>
        <ul className="tp-list">
          {coursework.map((course, index) => (
            <li key={index}>{course.code} — {course.name} ({course.grade})</li>
          ))}
        </ul>
      </div>

      <hr className="tp-hr tp-hr--accent" />

      <div className="tp-footer">&copy; 2026 Andrew Li</div>
    </>
  );
}
