import { useState } from 'react';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { GuiPage } from './components/GuiPage';

export default function App() {
  const [mode, setMode] = useState<'cli' | 'gui'>('gui');

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

  const tree = {
    '~': { parent: null, children: ['about', 'experience', 'projects.txt', 'contact.txt'] },
    about: { parent: '~', children: ['intro.txt', 'education.txt'] },
    experience: { parent: '~', children: ['work.txt', 'research.txt'] },
  };

  const files = {
    'intro.txt': `Hey, I'm Andrew.

I'm an undergraduate at UC Berkeley studying Computer Science, looking to double in Statistics or Applied Mathematics as well.

I want to build a career in AI adjacent roles, working across the stack from fundamental machine learning research to applied AI through startups.

Right now I'm doing research at Berkeley Artificial Intelligence Research (BAIR) and recruiting for software engineering roles for Spring and Summer 2027.`,

    'education.txt': `UC Berkeley -- B.A. Computer Science
Technical GPA: 4.0

Coursework:
  DATA C8 -- Foundations of Data Science                             A
  CS 61A  -- The Structure and Interpretation of Computer Programs   A
  CS 61B  -- Data Structures                                         A
  CS 70   -- Discrete Mathematics and Probability Theory             A
  MATH 54 -- Linear Algebra and Differential Equations               A+
  MATH 53 -- Multivariable Calculus                                  in progress
  CS 189  -- Introduction to Machine Learning                        in progress`,

    'work.txt': workExperience.map((job) => `${job.title} @ ${job.company}`).join('\n'),

    'research.txt': research.map((item) => `${item.title}\n  ${item.role}`).join('\n\n'),

    'projects.txt': projects.map((project, i) => `[${i + 1}] ${project.name}`).join('\n'),

    'contact.txt': `Email:    andrewli0420@gmail.com
School:   andrewli42@berkeley.edu
LinkedIn: https://www.linkedin.com/in/andrewli07/
GitHub:   https://github.com/AndrewLi0420`,
  };

  return (
    <div className="tp-page">
      <div className={`tp-shell ${mode === 'cli' ? 'tp-shell--cli' : 'tp-shell--gui'}`}>
        <button className="tp-toggle" onClick={() => setMode(mode === 'cli' ? 'gui' : 'cli')}>
          {mode === 'cli' ? 'gui mode' : 'cli mode'}
        </button>

        {mode === 'cli' ? (
          <InteractiveTerminal
            tree={tree}
            files={files}
            onToggle={() => setMode('gui')}
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
