import { useState } from 'react';
import { TerminalWindow } from './components/TerminalWindow';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Badge } from './components/ui/badge';
import { Card } from './components/ui/card';
import { Github, Linkedin, Mail, FileText, Code2, Brain, Award, BookOpen } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('terminal');

  const skills = {
    languages: ['Python', 'Java', 'C++', 'JavaScript', 'TypeScript', 'SQL', 'Scheme', 'R', 'Swift'],
    ml: ['Neural Networks', 'Regression', 'Decision Trees', 'Random Forests', 'XGBoost', 'Monte Carlo Simulations', 'Time-Series Modeling', 'Inference Testing'],
    web: ['React', 'Node.js', 'FastAPI', 'Flask', 'PostgreSQL', 'REST APIs', 'Tailwind CSS', 'Radix UI'],
    tools: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'NumPy', 'Pandas', 'Matplotlib', 'Seaborn', 'Expo', 'Figma', 'Cursor'],
  };

  const projects = [
        {
          name: 'PhysicAI Therapy',
          description: 'Built an AI-powered physical therapy platform designed to make recovery more accessible and personalized. The app helps users self-assess injuries through guided movement tests and instantly generates tailored exercise programs, reducing dependence on in-person referrals and long scheduling delays. The goal is to bridge the gap between professional rehabilitation and everyday users through technology-driven, affordable care.',
          tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Radix UI', 'Flask', 'Sci-kit learn', 'NumPy'],
          link: 'https://physic-ai-therapy.vercel.app/',
          status: 'Live Demo',
        },
    {
      name: 'TradeLens',
      description: 'Created a machine-learning powered investment platform that empowers everyday traders with the same insights used by professionals. By combining historical market patterns with real-time social sentiment, the project aims to democratize quantitative investing, giving users transparent, explainable predictions and portfolio guidance that improve confidence and decision-making in financial markets.',
      tech: ['React', 'FastAPI', 'PyTorch', 'PostgreSQL', 'REST APIs', 'NLP', 'Feed Forward & Long Short-Term Memory Neural Networks', 'TensorFlow'],
      link: '#',
      status: 'In Progress',
    },
  ];

  const research = [
    {
      title: 'Machine Learning for Chaotic Systems Prediction',
      venue: 'Dr. Akl Lab - Research Intern',
      description: 'Modeled chaotic multi-pendulum dynamics using C++ and numerical solvers to study nonlinear physical systems sensitive to initial conditions. Evaluated over 10 machine learning models, including LSTM, GRU, and regression baselines, to predict chaotic motion trajectories and benchmark their performance against physics-based simulations, advancing hybrid computational approaches for dynamic system forecasting. This research has potential applications in weather prediction and financial market modeling, where understanding chaotic behavior is crucial for accurate long-term forecasting.',
    },
    {
      title: 'X-Ray Diffraction in Salt Crystals for Pharmaceuticals',
      venue: 'UC Santa Cruz - Student Researcher',
      description: 'Analyzed X-ray diffraction data to compare single-crystal and powder diffraction methods for characterizing ionic and molecular salts. Investigated how crystal packing, polymorphism, and lattice orientation affect drug solubility, stability, and absorption efficiency, combining computational pattern analysis with crystallographic data modeling to optimize pharmaceutical formulations.',
    },
    {
      title: 'Advanced Modeling and Simulation of Material Properties',
      venue: 'Dr. Akl Lab - Research Intern',
      description: 'Used density functional theory (DFT) and molecular dynamics (MD) simulations with LAMMPS and Quantum ESPRESSO to study atomic interactions in layered materials. The research aimed to understand exfoliation mechanisms and mechanical stability at the nanoscale, providing insight into interlayer bonding and informing the design of next-generation materials with tunable mechanical and electronic properties.',
    },
    {
      title: 'Raman Spectroscopy for Identification of 2D Materials',
      venue: 'UC Santa Barbara - Student Researcher',
      description: 'Investigated graphene and other 2D materials through Raman spectroscopy to identify vibrational modes and layer-dependent phonon behavior. Correlated peak shifts and intensity ratios in the G and 2D bands with monolayer and multilayer graphene structures, enhancing non-destructive optical characterization techniques used in semiconductor and sensor research.',
    },
  ];

  const terminalCommands = {
    about: (
      <div className="text-[#cccccc]">
        <div className="mb-2">
          <span className="text-[#dcdcaa]">const</span> <span className="text-[#9cdcfe]">developer</span> = {'{'}
        </div>
        <div className="ml-4 text-[#ce9178]">name: <span className="text-[#ce9178]">"Andrew Li"</span>,</div>
        <div className="ml-4 text-[#ce9178]">role: <span className="text-[#ce9178]">"Computer Science & Applied Math Student"</span>,</div>
        <div className="ml-4 text-[#ce9178]">location: <span className="text-[#ce9178]">"Berkeley, CA"</span>,</div>
        <div className="ml-4 text-[#ce9178]">education: <span className="text-[#ce9178]">"UC Berkeley - B.S. Computer Science & Applied Math (GPA: 4.0)"</span>,</div>
        <div className="ml-4 text-[#ce9178]">passion: <span className="text-[#ce9178]">"Building ML systems and full-stack applications that solve real-world problems"</span></div>
        <div>{'};'}</div>
        <div className="mt-4 text-[#6a9955]">
          // Experienced in developing ML models, full-stack applications, and research.
        </div>
        <div className="text-[#6a9955]">
          // Research interests: Machine Learning, Chaotic Systems, Crystallography, and Financial Modeling.
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
            <span className="text-[#dcdcaa]">{category}</span>
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
      <div className="text-[#cccccc] space-y-3">
        {projects.map((project, index) => (
          <div key={index}>
            <div className="flex items-center gap-3">
              <div className="text-[#4ec9b0]">
                [{index + 1}] {project.name}
              </div>
              {project.status === 'Live Demo' ? (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-[#9cdcfe] hover:text-[#569cd6] underline">
                  🔗 Live Demo
                </a>
              ) : (
                <span className="text-[#6a9955]">
                  {project.status}
                </span>
              )}
            </div>
            <div className="ml-4 text-[#cccccc]">{project.description}</div>
            <div className="ml-4 text-[#6a9955]">
              Tech: {project.tech.join(', ')}
            </div>
          </div>
        ))}
      </div>
    ),
    research: (
      <div className="text-[#cccccc] space-y-3">
        <div className="text-[#569cd6] mb-2">Research Experience:</div>
        {research.map((pub, index) => (
          <div key={index}>
            <div className="text-[#dcdcaa]">[{index + 1}] {pub.title}</div>
            <div className="ml-4 text-[#9cdcfe]">{pub.venue}</div>
            <div className="ml-4 text-[#cccccc]">{pub.description}</div>
          </div>
        ))}
      </div>
    ),
    contact: (
      <div className="text-[#cccccc]">
        <div className="mb-2 text-[#569cd6]">Get in touch:</div>
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
      <div className="text-[#cccccc] space-y-3">
        <div>
          <div className="text-[#4ec9b0]">Technology Analyst @ Phi Beta Lambda</div>
          <div className="ml-4 text-[#6a9955]">September 2025 - Present</div>
          <div className="ml-4 text-[#cccccc]">
            • Executed 12-week curriculum covering Python libraries, R, web development, and Figma
          </div>
          <div className="ml-4 text-[#cccccc]">
            • Delivered software solutions for Fortune 500 clients (Qualcomm, Meta, Google, TikTok)
          </div>
        </div>
        <div>
          <div className="text-[#4ec9b0]">Student Researcher @ UC Santa Cruz</div>
          <div className="ml-4 text-[#6a9955]">July 2024 - August 2024</div>
          <div className="ml-4 text-[#cccccc]">
            • Engineered software-assisted pipelines to analyze 50+ crystallographic datasets
          </div>
          <div className="ml-4 text-[#cccccc]">
            • Constructed Python scripts to visualize diffraction peaks with Matplotlib and NumPy
          </div>
        </div>
        <div>
          <div className="text-[#4ec9b0]">Research Intern @ Dr. Akl Lab</div>
          <div className="ml-4 text-[#6a9955]">January 2024 - May 2024</div>
          <div className="ml-4 text-[#cccccc]">
            • Modeled chaotic multi-pendulum dynamics in C++ using Runge-Kutta method
          </div>
          <div className="ml-4 text-[#cccccc]">
            • Implemented and evaluated 10+ ML models (LSTM, RNN, GRU) with TensorFlow
          </div>
        </div>
      </div>
    ),
  };

  const welcomeMessage = (
    <div className="text-[#cccccc]">
      <div className="text-[#4ec9b0] mb-2">
        ╔═════════════════════════════════════════════════════════════╗
      </div>
        <div className="text-[#4ec9b0]">
          ║   My name is Andrew - Computer Science & Applied Math Student      ║
        </div>
      <div className="text-[#4ec9b0] mb-4">
        ╚═════════════════════════════════════════════════════════════╝
      </div>
      <div className="text-[#569cd6] mb-2">Type 'help' to see available commands</div>
      <div className="text-[#6a9955] mb-2">
        // Try: about, skills, projects, research, experience, contact
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#1e1e1e] p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-block">
            <pre className="text-[#4ec9b0] text-sm mb-4" style={{ fontFamily: 'monospace, "Courier New", Courier' }}>
{`       ____             __                         __     _ 
      /   |  ____  ____/ /_______  _      __      / /   (_)
     / /| | / __ \\/ __  / ___/ _ \\| | /| / /    / /   / / 
    / ___ |/ / / / /_/ / /  /  __/| |/ |/ /     / /___/ /  
/_/  |_|\\_||_/ \\___/_/   \\___/ |__/|__/    /_____/_/`}
            </pre>
          </div>
          <div className="flex items-center justify-center gap-4 mt-4">
            <a href="https://github.com/AndrewLi0420" target="_blank" rel="noopener noreferrer" className="text-[#9cdcfe] hover:text-[#569cd6] transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/andrewli07/" target="_blank" rel="noopener noreferrer" className="text-[#9cdcfe] hover:text-[#569cd6] transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:andrewli0420@gmail.com" className="text-[#9cdcfe] hover:text-[#569cd6] transition-colors">
              <Mail className="w-5 h-5" />
            </a>
        <a href="https://drive.google.com/file/d/1p6lK02JviqCiz3OuCQNnPW3YUZwaKAwf/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="text-[#9cdcfe] hover:text-[#569cd6] transition-colors">
          <FileText className="w-5 h-5" />
        </a>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-[#252526] border border-[#3c3c3c] mb-6">
            <TabsTrigger 
              value="terminal" 
              className="text-gray-400 data-[state=active]:bg-[#1e1e1e] data-[state=active]:text-[#4ec9b0]"
            >
              <Code2 className="w-4 h-4 mr-2" />
              Interactive Terminal
            </TabsTrigger>
            <TabsTrigger 
              value="visual" 
              className="text-gray-400 data-[state=active]:bg-[#1e1e1e] data-[state=active]:text-[#4ec9b0]"
            >
              <Brain className="w-4 h-4 mr-2" />
              Visual Overview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="terminal">
            <TerminalWindow title="portfolio.sh - bash">
              <InteractiveTerminal 
                welcomeMessage={welcomeMessage}
                commands={terminalCommands}
              />
            </TerminalWindow>
          </TabsContent>

          <TabsContent value="visual" className="space-y-6">
            {/* About Section */}
            <Card className="p-6 bg-[#252526] border-[#3c3c3c]">
              <h2 className="text-[#4ec9b0] mb-4 flex items-center gap-2">
                <Code2 className="w-5 h-5" />
                About Me
              </h2>
              <p className="text-[#cccccc] mb-4">
                I'm a Computer Science and Applied Math student at UC Berkeley with a 4.0 GPA, passionate about 
                building intelligent systems that solve real-world problems. With experience in machine learning research, 
                full-stack development, and data analysis, I bridge the gap between cutting-edge research and practical applications.
              </p>
              <p className="text-[#cccccc]">
                My work spans from developing ML models for chaotic systems prediction to building full-stack applications 
                like PhysicAI Therapy and TradeLens. I'm particularly interested in Machine Learning, Financial Modeling, 
                and Crystallography research.
              </p>
            </Card>

            {/* Skills Section */}
            <Card className="p-6 bg-[#252526] border-[#3c3c3c]">
              <h2 className="text-[#4ec9b0] mb-4 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Technical Skills
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(skills).map(([category, items]) => (
                  <div key={category}>
                    <h3 className="text-[#569cd6] mb-2 capitalize">{category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {items.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs text-[#9cdcfe] border-gray-400 bg-[#1e1e1e]">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Projects Section */}
            <Card className="p-6 bg-[#252526] border-[#3c3c3c]">
              <h2 className="text-[#4ec9b0] mb-4 flex items-center gap-2">
                <Code2 className="w-5 h-5" />
                Featured Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project, index) => (
                  <Card key={index} className="p-4 bg-[#1e1e1e] border-[#3c3c3c] hover:border-[#4ec9b0] transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-[#dcdcaa]">{project.name}</h3>
                      {project.status === 'Live Demo' ? (
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          <Badge 
                            className="text-sm px-4 py-2 bg-[#ce9178] text-white border-[#ce9178] hover:bg-[#ce9178] cursor-pointer"
                            style={{ backgroundColor: '#ce9178' }}
                          >
                            {project.status}
                          </Badge>
                        </a>
                      ) : (
                        <Badge 
                          className="text-sm px-4 py-2 bg-[#ce9178] text-white border-[#ce9178] hover:bg-[#ce9178]"
                          style={{ backgroundColor: '#ce9178' }}
                        >
                          {project.status}
                        </Badge>
                      )}
                    </div>
                    <p className="text-[#cccccc] text-sm mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs text-[#ce9178] border-[#ce9178]">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </Card>

            {/* Research Section */}
            <Card className="p-6 bg-[#252526] border-[#3c3c3c]">
              <h2 className="text-[#4ec9b0] mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Research Experience
              </h2>
              <div className="space-y-4">
                {research.map((pub, index) => (
                  <div key={index} className="border-l-2 border-[#569cd6] pl-4">
                    <h3 className="text-[#dcdcaa] mb-1">{pub.title}</h3>
                    <p className="text-[#9cdcfe] text-sm mb-2">{pub.venue}</p>
                    <p className="text-[#cccccc] text-sm">{pub.description}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Contact Section */}
            <Card className="p-6 bg-[#252526] border-[#3c3c3c]">
              <h2 className="text-[#4ec9b0] mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Contact
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a href="mailto:andrewli0420@gmail.com" className="flex items-center gap-3 text-[#9cdcfe] hover:text-[#569cd6] transition-colors">
                  <Mail className="w-5 h-5" />
                  andrewli0420@gmail.com
                </a>
                <a href="https://www.linkedin.com/in/andrewli07/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[#9cdcfe] hover:text-[#569cd6] transition-colors">
                  <Linkedin className="w-5 h-5" />
                  LinkedIn Profile
                </a>
                <a href="https://github.com/AndrewLi0420" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[#9cdcfe] hover:text-[#569cd6] transition-colors">
                  <Github className="w-5 h-5" />
                  GitHub Profile
                </a>
                <a href="https://drive.google.com/file/d/1p6lK02JviqCiz3OuCQNnPW3YUZwaKAwf/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[#9cdcfe] hover:text-[#569cd6] transition-colors">
                  <FileText className="w-5 h-5" />
                  Resume/CV
                </a>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-8 text-center text-[#6a9955] text-sm">
          <p>© 2025 Andrew Li. Built with React & TypeScript.</p>
          <p className="mt-1">Themed with VSCode Dark+ colors</p>
        </div>
      </div>
    </div>
  );
}
