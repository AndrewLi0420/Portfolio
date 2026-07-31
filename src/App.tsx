import { useState } from 'react';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { GuiPage } from './components/GuiPage';

export default function App() {
  const [mode, setMode] = useState<'cli' | 'gui'>('gui');

  const skills = {
    languages: ['Python', 'Java', 'C++', 'JavaScript', 'TypeScript', 'SQL', 'Scheme', 'R', 'Swift'],
    ml: ['Neural Networks', 'Regression', 'Decision Trees', 'Random Forests', 'XGBoost', 'Monte Carlo Simulations', 'Time-Series Modeling', 'Inference Testing'],
    web: ['React', 'Node.js', 'FastAPI', 'Flask', 'PostgreSQL', 'REST APIs', 'Tailwind CSS', 'Radix UI'],
    tools: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'NumPy', 'Pandas', 'Matplotlib', 'Seaborn', 'Expo', 'Figma', 'Cursor'],
  };

  const projects = [
    { name: 'Cryptographic Training Data Watermarking for LLMs' },
    { name: 'Machine Learning False Alarm Classifier' },
    { name: 'Quantitative Trading Interactive Learning Tool' },
    { name: 'Physical Therapy AI Agent' },
  ];

  const workExperience = [
    { title: 'Founding Software Engineer Intern', company: 'KwikKart' },
    { title: 'Software Engineer (Contract)', company: 'BMW' },
    { title: 'Machine Learning Engineer Intern', company: 'Outsampler' },
    { title: 'Software Engineer Intern', company: 'NumisToken' },
  ];

  const research = [
    {
      title: 'Regime Aware Model-Based Reinforcement Learning for Non-stationary Environments',
      role: 'First author, Undergraduate Researcher @ Berkeley Artificial Intelligence Research (BAIR)',
    },
    {
      title: 'Machine Learning for Chaotic Systems Prediction',
      role: 'Research Intern @ Dr. Akl Lab',
    },
    {
      title: 'Quantum Diffraction and Crystal-Lattice Analysis of Pharmaceutical Salts through X-ray Diffraction',
      role: 'Student Researcher @ UC Santa Cruz',
    },
    {
      title: 'Phonon Signatures of 2D Materials Through Raman Spectroscopy',
      role: 'Student Researcher @ UC Santa Barbara',
    },
  ];

  const terminalCommands = {
    about: (
      <div className="text-[#cccccc]">
        <div className="mb-2">
          <span className="tp-cli-accent">const</span> <span className="text-[#9cdcfe]">developer</span> = {'{'}
        </div>
        <div className="ml-4 text-[#ce9178]">name: <span className="text-[#ce9178]">"Andrew Li"</span>,</div>
        <div className="ml-4 text-[#ce9178]">role: <span className="text-[#ce9178]">"Computer Science Undergrad"</span>,</div>
        <div className="ml-4 text-[#ce9178]">location: <span className="text-[#ce9178]">"Berkeley, CA"</span>,</div>
        <div className="ml-4 text-[#ce9178]">education: <span className="text-[#ce9178]">"UC Berkeley - B.S. Computer Science, double majoring in Statistics or Applied Mathematics (GPA: 4.0)"</span>,</div>
        <div className="ml-4 text-[#ce9178]">passion: <span className="text-[#ce9178]">"Pursuing a career in AI, from fundamental machine learning research to applied AI through startups"</span></div>
        <div>{'};'}</div>
        <div className="mt-4 text-[#6a9955]">
          // Working across the stack: research, applied ML, and full-stack engineering.
        </div>
        <div className="text-[#6a9955]">
          // Research interests: Machine Learning, Chaotic Systems, Quantum Materials, and Financial Markets Modeling.
        </div>
      </div>
    ),
    skills: (
      <div className="text-[#cccccc]">
        <div className="mb-3">
          <span className="text-[#c586c0]">class</span> <span className="text-[#4ec9b0]">Skills</span> {'{'}
        </div>
        {Object.entries(skills).map(([category, items]) => (
          <div key={category} className="ml-4 mb-2">
            <span className="tp-cli-accent">{category}</span>
            <span className="text-[#cccccc]">: [</span>
            <div className="ml-4">
              {items.map((skill, index) => (
                <div key={skill}>
                  <span className="text-[#ce9178]">"{skill}"</span>
                  {index < items.length - 1 ? ',' : ''}
                </div>
              ))}
            </div>
            <span className="text-[#cccccc]">]</span>
            {category !== 'tools' ? ',' : ''}
          </div>
        ))}
        <div>{'}'}</div>
      </div>
    ),
    projects: (
      <div className="text-[#cccccc] space-y-1">
        {projects.map((project, index) => (
          <div key={index} className="text-[#4ec9b0] tp-bold">
            [{index + 1}] {project.name}
          </div>
        ))}
      </div>
    ),
    research: (
      <div className="text-[#cccccc] space-y-1">
        <div className="tp-cli-accent mb-2">Research Experience:</div>
        {research.map((pub, index) => (
          <div key={index} className="tp-cli-accent">
            [{index + 1}] {pub.title} <span className="text-[#9cdcfe]">({pub.role})</span>
          </div>
        ))}
      </div>
    ),
    contact: (
      <div className="text-[#cccccc]">
        <div className="mb-2 tp-cli-accent">Get in touch:</div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[#4ec9b0]">📧</span>
            <a href="mailto:andrewli0420@gmail.com" className="text-[#9cdcfe] hover:text-[#569cd6] underline">
              andrewli0420@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#4ec9b0]">💼</span>
            <a href="https://www.linkedin.com/in/andrewli07/" target="_blank" rel="noopener noreferrer" className="text-[#9cdcfe] hover:text-[#569cd6] underline">
              linkedin.com/in/andrewli07
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#4ec9b0]">🐙</span>
            <a href="https://github.com/AndrewLi0420" target="_blank" rel="noopener noreferrer" className="text-[#9cdcfe] hover:text-[#569cd6] underline">
              github.com/AndrewLi0420
            </a>
          </div>
        </div>
      </div>
    ),
    experience: (
      <div className="text-[#cccccc] space-y-1">
        <div className="tp-cli-accent mb-2">Work Experience:</div>
        {workExperience.map((job, index) => (
          <div key={index} className="text-[#4ec9b0] tp-bold">
            {job.title} @ {job.company}
          </div>
        ))}
      </div>
    ),
  };

  return (
    <div className="tp-page">
      <div className={`tp-shell ${mode === 'cli' ? 'tp-shell--cli' : 'tp-shell--gui'}`}>
        <button className="tp-toggle" onClick={() => setMode(mode === 'cli' ? 'gui' : 'cli')}>
          {mode === 'cli' ? 'gui mode' : 'cli mode'}
        </button>

        {mode === 'cli' ? (
          <InteractiveTerminal
            commands={terminalCommands}
          />
        ) : (
          <GuiPage
            projects={projects}
            workExperience={workExperience}
            research={research}
          />
        )}
      </div>
    </div>
  );
}
