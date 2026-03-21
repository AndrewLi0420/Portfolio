import { useState } from 'react';
import { TerminalWindow } from './components/TerminalWindow';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Badge } from './components/ui/badge';
import { Card } from './components/ui/card';
import { Github, Linkedin, Mail, Code2, Brain, Award, BookOpen, Briefcase } from 'lucide-react';

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

  const workExperience = [
    {
      title: 'Software Engineer (Contract)',
      company: 'BMW Group',
      location: 'Mountain View, CA',
      period: 'February 2026 - April 2026',
      description: 'BMW Group is a global leader in premium automotive and mobility solutions. At BMW Group, I built an AI-powered data research system to scrape and aggregate information on 1,000+ companies across multiple market segments. I designed a data validation pipeline to verify URL validity and cross-check extracted attributes, reducing hallucinated data by ~30% across 1,000+ company records through schema checks and type normalization. I also engineered a JSON-based data architecture to store 50+ structured fields per company and built parsing and sync pipelines integrating external sources, automating ingestion and scheduling weekly updates of hundreds of records.',
    },
    {
      title: 'AI Research Engineer Intern',
      company: 'Outsampler',
      location: 'Berkeley, CA',
      period: 'December 2025 - Present',
      description: 'Outsampler is an AI-powered financial technology company specializing in explainable AI agents for institutional asset management. They develop interpretable systems that autonomously monitor, analyze, and provide transparent reasoning for patterns and anomalies in complex financial time-series data. At Outsampler, I developed interpretable AI agents for financial time-series reasoning within institutional asset management. I improved output diversity of constrained-decoding small language models by ~20% by generating and ranking multi-candidate SQL queries across financial datasets through Python scripts and inference workflows. I also evaluated research-informed text-to-SQL generation performance across 1,000+ prompts, benchmarking prompt bias and decoding parameters using 5 open-source language models of various sizes hosted on virtual machines.',
    },
    {
      title: 'Software Engineer Intern',
      company: 'NumisToken',
      location: 'Berkeley, CA',
      period: 'November 2025 - Present',
      description: 'NumisToken is a blockchain-powered digital coin marketplace that bridges traditional numismatics with modern cryptocurrency technology. The platform enables collectors and investors to buy, sell, and trade digital representations of rare coins with verified authenticity, leveraging smart contracts for transparent ownership tracking and secure transactions. At NumisToken, I built and maintained Java REST APIs for a digital coin marketplace supporting hundreds of daily user transactions. I secured digital coin purchase and transfer flows backed by Stripe by optimizing PostgreSQL schemas and implementing transactional locking, reducing query latency by ~30% and improving checkout success by ~10%. I also architected and maintained blockchain-based smart contract integrations using Web3j.js to record digital coin ownership changes on-chain, improving transparency and auditability of over 500 marketplace transactions.',
    },
    {
      title: 'Software Engineer (Contract)',
      company: 'ELDÆON',
      location: 'Berkeley, CA',
      period: 'October 2025 - December 2025',
      description: 'ELDÆON is an aerospace technology company specializing in advanced passive radar systems and sensor technologies for airborne object detection. Their solutions provide military and civilian organizations with non-emitting, covert surveillance capabilities that detect and track aircraft, drones, and other aerial vehicles without traditional active radar signatures. At ELDÆON, I leveraged data from passive radar systems and other advanced measurement tools to detect airborne objects. I developed and integrated an XGBoost-based ML classifier into the existing C++/Node.js radar signal processing pipeline, reducing false alarms by ~20% while handling 100+ detections per second with sub-100ms latency. I also refactored Docker build configurations to enable cross-platform deployment across various operating systems.',
    },
    {
      title: 'Technology Consultant',
      company: 'Phi Beta Lambda - Future Business Leaders of America',
      location: 'Berkeley, CA',
      period: 'August 2025 - December 2025',
      description: 'Phi Beta Lambda (PBL) is the collegiate division of Future Business Leaders of America (FBLA), the largest career student business organization in the world. PBL prepares students for careers in business and business-related fields through academic competitions, leadership development, and real-world consulting projects with Fortune 500 companies. As a Technology Consultant at PBL, I delivered software and analytics solutions for multiple Fortune 500 clients including Meta, TikTok, Qualcomm, and NASA. My work combined web scraping, data analysis, and UI/UX improvements to drive measurable business outcomes, helping clients optimize their operations and digital presence.',
    },
    {
      title: 'Software Engineer Intern',
      company: 'Sync Visual Media',
      location: 'Phoenix, AZ',
      period: 'June 2025 - August 2025',
      description: 'Sync Visual Media is a digital media and web development agency focused on building client-facing platforms and optimizing online visibility. At Sync Visual Media, I developed full-stack web applications for client platforms using React and Python-based APIs, optimizing user flows, UI/UX, and backend performance to increase visitor-to-customer conversion rates by ~15% per client. I also engineered SEO rendering pipelines — including metadata tagging, structured schema, and image indexing — to optimize 100+ digital assets for clients, boosting search ranking visibility across Google Image and web results.',
    },
    {
      title: 'Machine Learning Research Intern',
      company: 'Dr. Akl Lab',
      location: 'Fremont, CA',
      period: 'January 2024 - May 2024',
      description: 'Dr. Akl Lab is a computational research lab focused on physics simulation, materials science, and machine learning applications for complex dynamical systems. At Dr. Akl Lab, I simulated and collected time-series data from a chaotic multi-pendulum system in Python, generating 10,000+ synthetic trajectories with object-oriented simulation to study long-horizon prediction under noisy dynamics. I trained and evaluated 10+ sequence models — including LSTM, GRU, vanilla RNN, and regression baselines — in TensorFlow to forecast future states of a chaotic system, improving prediction accuracy on unseen trajectories by ~15%.',
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
        <div className="ml-4 text-[#ce9178]">role: <span className="text-[#ce9178]">"Computer Science Student"</span>,</div>
        <div className="ml-4 text-[#ce9178]">location: <span className="text-[#ce9178]">"Berkeley, CA"</span>,</div>
        <div className="ml-4 text-[#ce9178]">education: <span className="text-[#ce9178]">"UC Berkeley - B.S. Computer Science (GPA: 4.0)"</span>,</div>
        <div className="ml-4 text-[#ce9178]">passion: <span className="text-[#ce9178]">"Building ML systems and full-stack applications that solve real-world problems"</span></div>
        <div>{'};'}</div>
        <div className="mt-4 text-[#6a9955]">
          // Experienced in developing ML models, full-stack applications, and research.
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
        <div className="text-[#569cd6] mb-2">Work Experience:</div>
        {workExperience.map((job, index) => (
          <div key={index}>
            <div className="text-[#4ec9b0]">{job.title} @ {job.company}</div>
            <div className="ml-4 text-[#9cdcfe]">{job.location}</div>
            <div className="ml-4 text-[#6a9955]">{job.period}</div>
            <div className="ml-4 text-[#cccccc] mt-2">{job.description}</div>
          </div>
        ))}
      </div>
    ),
  };

  const welcomeMessage = (
    <div className="text-[#cccccc]">
      <div className="text-[#4ec9b0] mb-2">
        ╔═════════════════════════════════════════════════════════════╗
      </div>
        <div className="text-[#4ec9b0]">
          ║{'\u00A0\u00A0\u00A0'}My name is Andrew - Computer Science Student{'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}║
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
              <p className="text-[#cccccc]">
                I'm Andrew Li, a Computer Science major at the University of California, Berkeley, born and raised in the San Francisco Bay Area. My interests lie at the intersection of computation, artificial intelligence, and quantitative modeling, applying these tools to solve real-world problems in fields like finance, healthcare, and physics. I have explored topics ranging from machine learning for chaotic systems and AI-powered product design to computational simulation and full-stack development. Outside of academics, I love playing volleyball, snowboarding, and finding creative ways to blend technology with sports and everyday life.
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

            {/* Work Experience Section */}
            <Card className="p-6 bg-[#252526] border-[#3c3c3c]">
              <h2 className="text-[#4ec9b0] mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Work Experience
              </h2>
              <div className="space-y-4">
                {workExperience.map((job, index) => (
                  <div key={index} className="border-l-2 border-[#569cd6] pl-4">
                    <h3 className="text-[#dcdcaa] mb-1">{job.title}</h3>
                    <p className="text-[#9cdcfe] text-sm mb-1">{job.company} - {job.location}</p>
                    <p className="text-[#6a9955] text-sm mb-2">{job.period}</p>
                    <p className="text-[#cccccc] text-sm leading-relaxed">{job.description}</p>
                  </div>
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
