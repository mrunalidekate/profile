import { Mail, Phone, Linkedin, Briefcase, Code, GraduationCap, Languages, Award, MapPin, Calendar, Bug, CheckCircle, FileCheck, Zap, Target, TrendingUp, Users, Rocket, Download, Moon, Sun, Terminal, Activity, Play, Pause, RotateCcw, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, BarChart, Bar, Cell } from 'recharts';

export default function App() {
  const [activeTab, setActiveTab] = useState('experience');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);
  const [isTyping, setIsTyping] = useState(true);
  const [typedText, setTypedText] = useState('');
  const [testsPassed, setTestsPassed] = useState(0);
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  
  const { scrollYProgress } = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);

  const fullText = "QA Professional | Automation & ETL Testing Specialist";

  // Typing animation effect
  useEffect(() => {
    if (isTyping && typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else if (typedText.length === fullText.length) {
      setIsTyping(false);
    }
  }, [typedText, isTyping]);

  // Particle system
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
      }));
      setParticles(newParticles);
    };
    generateParticles();
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Automated test simulation
  const runTests = () => {
    setIsTestRunning(true);
    setTestsPassed(0);
    const interval = setInterval(() => {
      setTestsPassed(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTestRunning(false);
          return 100;
        }
        return prev + 1;
      });
    }, 30);
  };

  // Terminal simulation
  const runTerminal = () => {
    setShowTerminal(true);
    setTerminalLines([]);
    const commands = [
      '$ npm run test',
      'Running test suite...',
      '✓ Database validation tests passed',
      '✓ API endpoint tests passed',
      '✓ UI automation tests passed',
      '✓ ETL pipeline tests passed',
      'All tests passed successfully! 🎉'
    ];
    
    commands.forEach((cmd, index) => {
      setTimeout(() => {
        setTerminalLines(prev => [...prev, cmd]);
      }, index * 600);
    });
  };

  const bgClass = darkMode ? 'bg-slate-950' : 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900';
  const cardBgClass = darkMode ? 'bg-slate-900/95' : 'bg-white/95';

  return (
    <div className={`min-h-screen ${bgClass} transition-colors duration-500 relative overflow-hidden`} ref={containerRef}>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Particle Background */}
      <div className="fixed inset-0 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-blue-400/30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + particle.size,
              repeat: Infinity,
              delay: particle.id * 0.1,
            }}
          />
        ))}
      </div>

      {/* Mouse Follower */}
      <motion.div
        className="fixed w-8 h-8 border-2 border-purple-500 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Floating Action Buttons */}
      <div className="fixed right-6 top-24 flex flex-col gap-4 z-40">
        <motion.button
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setDarkMode(!darkMode)}
          className={`w-14 h-14 rounded-full ${darkMode ? 'bg-yellow-400' : 'bg-slate-800'} shadow-2xl flex items-center justify-center text-white`}
        >
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={runTerminal}
          className="w-14 h-14 rounded-full bg-green-500 shadow-2xl flex items-center justify-center text-white"
        >
          <Terminal size={24} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={runTests}
          className="w-14 h-14 rounded-full bg-purple-500 shadow-2xl flex items-center justify-center text-white"
        >
          {isTestRunning ? <Pause size={24} /> : <Play size={24} />}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 rounded-full bg-blue-500 shadow-2xl flex items-center justify-center text-white"
        >
          <Download size={24} />
        </motion.button>
      </div>

      {/* Terminal Modal */}
      <AnimatePresence>
        {showTerminal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowTerminal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="bg-slate-900 rounded-lg shadow-2xl max-w-2xl w-full p-6 font-mono"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-4 text-gray-400">terminal</span>
              </div>
              <div className="space-y-2">
                {terminalLines.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`${line.includes('✓') ? 'text-green-400' : line.includes('$') ? 'text-blue-400' : 'text-gray-300'}`}
                  >
                    {line}
                  </motion.div>
                ))}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="text-green-400"
                >
                  ▊
                </motion.span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto relative z-10 py-8 px-4">
        {/* 3D Rotating Header */}
        <motion.header 
          initial={{ opacity: 0, rotateX: -90 }}
          animate={{ opacity: 1, rotateX: 0 }}
          transition={{ duration: 1, type: "spring" }}
          style={{
            transformStyle: "preserve-3d",
          }}
          className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl shadow-2xl px-8 py-12 mb-8 relative overflow-hidden"
        >
          {/* Animated Gradient Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-4"
            >
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                  scale: { duration: 1, repeat: Infinity }
                }}
              >
                <Bug size={20} />
              </motion.div>
              <span>QA Professional</span>
            </motion.div>

            <motion.h1 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-6xl mb-4"
            >
              Mrunali Dekate
            </motion.h1>
            
            <div className="text-2xl text-blue-100 mb-8 h-8">
              {typedText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                |
              </motion.span>
            </div>
            
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-6 text-blue-50"
            >
              <motion.a 
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:mrunalii678@gmail.com" 
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/20 transition-all"
              >
                <Mail size={18} />
                <span>mrunalii678@gmail.com</span>
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                href="tel:+917447355566" 
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/20 transition-all"
              >
                <Phone size={18} />
                <span>+91 7447355566</span>
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/20 transition-all"
              >
                <Linkedin size={18} />
                <span>LinkedIn Profile</span>
              </motion.a>
            </motion.div>
          </div>
        </motion.header>

        {/* Live Test Runner Display */}
        <AnimatePresence>
          {isTestRunning || testsPassed > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              className={`${cardBgClass} backdrop-blur-lg rounded-2xl p-6 mb-8 shadow-2xl border-2 border-green-500`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="flex items-center gap-2 text-2xl text-gray-800 dark:text-white">
                  <Activity className="text-green-500" />
                  Live Test Execution
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setTestsPassed(0)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <RotateCcw size={20} />
                </motion.button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Tests Passed: {testsPassed}/100</span>
                  <span className={`${testsPassed === 100 ? 'text-green-500' : 'text-blue-500'}`}>
                    {testsPassed === 100 ? '✓ Complete' : 'Running...'}
                  </span>
                </div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${testsPassed}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* 3D Stats Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <StatsCard3D icon={<Zap />} value="10+" label="Years in IT" color="from-yellow-500 to-orange-500" delay={0.8} />
          <StatsCard3D icon={<Bug />} value="9+" label="Years Testing" color="from-red-500 to-pink-500" delay={0.9} />
          <StatsCard3D icon={<CheckCircle />} value="5+" label="Years Automation" color="from-green-500 to-emerald-500" delay={1.0} />
          <StatsCard3D icon={<Target />} value="50%" label="Efficiency Boost" color="from-blue-500 to-cyan-500" delay={1.1} />
        </motion.div>

        {/* Main Content Card */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className={`${cardBgClass} backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden`}
        >
          {/* Professional Summary */}
          <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={`p-8 ${darkMode ? 'bg-slate-800' : 'bg-gradient-to-r from-blue-50 to-purple-50'}`}
          >
            <h2 className={`flex items-center gap-3 text-3xl mb-4 ${darkMode ? 'text-blue-400' : 'text-blue-900'}`}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Briefcase size={28} />
              </motion.div>
              Professional Summary
            </h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`leading-relaxed text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
            >
              Experienced QA professional with 10+ years in IT, including 9+ years in software testing and 5+ years in
              Automation/ETL/API testing. Skilled in data analysis, validation, and cleansing, with solid SQL/PL-SQL knowledge and
              hands-on testing of Windows and web applications. Proven track record in Agile-Scrum environments, defect RCA, and
              end-to-end test management. Strong exposure to the health insurance domain, with expertise in tools like Azure DevOps
              and Git. Known for mentoring teams, quick learning, and excellent communication and collaboration skills.
            </motion.p>
          </motion.section>

          {/* Skills Visualization with Radar Chart */}
          <section className={`p-8 ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
            <h2 className={`flex items-center gap-3 text-3xl mb-6 ${darkMode ? 'text-blue-400' : 'text-blue-900'}`}>
              <Code size={28} />
              Technical Skills Radar
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={skillRadarData}>
                    <PolarGrid stroke={darkMode ? '#444' : '#ccc'} />
                    <PolarAngleAxis dataKey="skill" stroke={darkMode ? '#888' : '#666'} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} stroke={darkMode ? '#888' : '#666'} />
                    <Radar name="Proficiency" dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={skillRadarData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#444' : '#ddd'} />
                    <XAxis dataKey="skill" stroke={darkMode ? '#888' : '#666'} angle={-45} textAnchor="end" height={100} />
                    <YAxis stroke={darkMode ? '#888' : '#666'} />
                    <RechartsTooltip 
                      contentStyle={{ 
                        backgroundColor: darkMode ? '#1e293b' : '#fff',
                        border: '1px solid #8b5cf6',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                      {skillRadarData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={skillColors[index % skillColors.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <InteractiveSkillCard 
                title="Automation Tools" 
                skills={['Playwright', 'Selenium (Python)', 'Jmeter', 'ACCELQ', 'Jenkins']}
                level={90}
                icon={<Rocket size={20} />}
                hoveredSkill={hoveredSkill}
                setHoveredSkill={setHoveredSkill}
                darkMode={darkMode}
              />
              <InteractiveSkillCard 
                title="Databases" 
                skills={['MS SQL Server', 'PL/SQL']}
                level={85}
                icon={<FileCheck size={20} />}
                hoveredSkill={hoveredSkill}
                setHoveredSkill={setHoveredSkill}
                darkMode={darkMode}
              />
              <InteractiveSkillCard 
                title="ETL Tools" 
                skills={['SSMS', 'Azure Synapse']}
                level={80}
                icon={<TrendingUp size={20} />}
                hoveredSkill={hoveredSkill}
                setHoveredSkill={setHoveredSkill}
                darkMode={darkMode}
              />
              <InteractiveSkillCard 
                title="API Testing Tools" 
                skills={['Talend API', 'Postman']}
                level={88}
                icon={<Zap size={20} />}
                hoveredSkill={hoveredSkill}
                setHoveredSkill={setHoveredSkill}
                darkMode={darkMode}
              />
              <InteractiveSkillCard 
                title="Test Management" 
                skills={['Azure DevOps', 'JIRA']}
                level={92}
                icon={<Target size={20} />}
                hoveredSkill={hoveredSkill}
                setHoveredSkill={setHoveredSkill}
                darkMode={darkMode}
              />
              <InteractiveSkillCard 
                title="BI & Analytics" 
                skills={['Power BI']}
                level={75}
                icon={<TrendingUp size={20} />}
                hoveredSkill={hoveredSkill}
                setHoveredSkill={setHoveredSkill}
                darkMode={darkMode}
              />
            </div>
          </section>

          {/* Career Timeline */}
          <section className={`p-8 ${darkMode ? 'bg-slate-800' : 'bg-gradient-to-b from-white to-slate-50'}`}>
            <h2 className={`flex items-center gap-3 text-3xl mb-8 ${darkMode ? 'text-blue-400' : 'text-blue-900'}`}>
              <Briefcase size={28} />
              Career Timeline
            </h2>
            
            <InteractiveTimeline darkMode={darkMode} />

            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 mt-8 mb-6">
              {['experience', 'projects', 'achievements'].map((tab) => (
                <motion.button
                  key={tab}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-lg capitalize transition-all ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : darkMode 
                        ? 'bg-slate-700 text-gray-300 hover:bg-slate-600' 
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {tab}
                </motion.button>
              ))}
            </div>

            {/* Tab Content with Page Transition */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20, rotateY: -10 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -20, rotateY: 10 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'experience' && <ExperienceContent darkMode={darkMode} />}
                {activeTab === 'projects' && <ProjectsContent darkMode={darkMode} />}
                {activeTab === 'achievements' && <AchievementsContent darkMode={darkMode} />}
              </motion.div>
            </AnimatePresence>
          </section>

          {/* Education with 3D Card */}
          <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={`p-8 ${darkMode ? 'bg-slate-900' : 'bg-white'}`}
          >
            <h2 className={`flex items-center gap-3 text-3xl mb-6 ${darkMode ? 'text-blue-400' : 'text-blue-900'}`}>
              <GraduationCap size={28} />
              Education
            </h2>
            <EducationCard3D darkMode={darkMode} />
          </motion.section>

          {/* Languages with Animation */}
          <section className={`p-8 ${darkMode ? 'bg-slate-800' : 'bg-gradient-to-r from-purple-50 to-blue-50'}`}>
            <h2 className={`flex items-center gap-3 text-3xl mb-6 ${darkMode ? 'text-blue-400' : 'text-blue-900'}`}>
              <Languages size={28} />
              Languages
            </h2>
            <div className="flex flex-wrap gap-4">
              {['English (Proficient)', 'Marathi', 'Hindi'].map((lang, index) => (
                <motion.span
                  key={lang}
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: "spring" }}
                  whileHover={{ 
                    scale: 1.15, 
                    rotate: [0, -5, 5, -5, 0],
                    boxShadow: "0 10px 30px rgba(139, 92, 246, 0.3)"
                  }}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full shadow-lg cursor-pointer"
                >
                  {lang}
                </motion.span>
              ))}
            </div>
          </section>

          {/* Certifications with 3D Cards */}
          <section className={`p-8 ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
            <h2 className={`flex items-center gap-3 text-3xl mb-6 ${darkMode ? 'text-blue-400' : 'text-blue-900'}`}>
              <Award size={28} />
              Certifications & Awards
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <AwardCard3D 
                title="ISTQB Certified"
                year="2023"
                color="from-amber-400 to-orange-500"
                delay={0}
              />
              <AwardCard3D 
                title="SPOT Team Award"
                subtitle="Engage Project"
                color="from-green-400 to-emerald-500"
                delay={0.2}
              />
              <AwardCard3D 
                title="Star Performer"
                subtitle="Holman Project"
                year="2025"
                color="from-purple-400 to-pink-500"
                delay={0.4}
              />
            </div>
          </section>
        </motion.div>

        {/* Animated Footer */}
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center py-6 mt-8 text-white"
        >
          <motion.p
            animate={{ 
              textShadow: [
                "0 0 10px rgba(139, 92, 246, 0.5)",
                "0 0 20px rgba(139, 92, 246, 0.8)",
                "0 0 10px rgba(139, 92, 246, 0.5)",
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            &copy; 2025 Mrunali Dekate. All rights reserved.
          </motion.p>
        </motion.footer>
      </div>
    </div>
  );
}

// Skill data for charts
const skillRadarData = [
  { skill: 'Automation', value: 90 },
  { skill: 'Database', value: 85 },
  { skill: 'ETL', value: 80 },
  { skill: 'API Testing', value: 88 },
  { skill: 'Test Mgmt', value: 92 },
  { skill: 'BI Tools', value: 75 },
];

const skillColors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4'];

function StatsCard3D({ icon, value, label, color, delay }: { icon: React.ReactNode; value: string; label: string; color: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -90 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay, type: "spring" }}
      whileHover={{ 
        scale: 1.1, 
        y: -10,
        rotateY: 10,
        rotateX: 10,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
      }}
      style={{ transformStyle: "preserve-3d" }}
      className={`bg-gradient-to-br ${color} text-white rounded-xl p-6 shadow-xl cursor-pointer relative overflow-hidden`}
    >
      <motion.div
        className="absolute inset-0 bg-white"
        initial={{ scale: 0, opacity: 0.3 }}
        whileHover={{ scale: 2, opacity: 0 }}
        transition={{ duration: 0.6 }}
      />
      <div className="flex flex-col items-center text-center relative z-10">
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          {icon}
        </motion.div>
        <motion.div 
          className="text-3xl mt-3"
          whileHover={{ scale: 1.2 }}
        >
          {value}
        </motion.div>
        <div className="text-sm mt-1 opacity-90">{label}</div>
      </div>
    </motion.div>
  );
}

function InteractiveSkillCard({ 
  title, 
  skills, 
  level, 
  icon,
  hoveredSkill,
  setHoveredSkill,
  darkMode
}: { 
  title: string; 
  skills: string[]; 
  level: number; 
  icon: React.ReactNode;
  hoveredSkill: string | null;
  setHoveredSkill: (skill: string | null) => void;
  darkMode: boolean;
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, z: 50 }}
      onHoverStart={() => setHoveredSkill(title)}
      onHoverEnd={() => setHoveredSkill(null)}
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ transformStyle: "preserve-3d" }}
      className={`${darkMode ? 'bg-slate-800 border-slate-600' : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200'} rounded-xl p-6 border-2 hover:border-purple-400 transition-all shadow-lg hover:shadow-2xl cursor-pointer relative`}
    >
      <AnimatePresence mode="wait">
        {!isFlipped ? (
          <motion.div
            key="front"
            initial={{ rotateY: 0 }}
            exit={{ rotateY: 90 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div 
                className={darkMode ? 'text-blue-400' : 'text-blue-600'}
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                {icon}
              </motion.div>
              <h3 className={`text-xl ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{title}</h3>
            </div>
            
            <div className="mb-4">
              <div className={`flex justify-between text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <span>Proficiency</span>
                <motion.span
                  key={level}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="font-bold"
                >
                  {level}%
                </motion.span>
              </div>
              <div className={`h-3 ${darkMode ? 'bg-slate-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full relative"
                >
                  <motion.div
                    className="absolute inset-0 bg-white"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    style={{ opacity: 0.3 }}
                  />
                </motion.div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.15, y: -3 }}
                  className={`${darkMode ? 'bg-slate-700 text-gray-200 border-slate-600' : 'bg-white text-gray-700 border-gray-200'} px-3 py-1 rounded-full text-sm shadow-sm border`}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="back"
            initial={{ rotateY: -90 }}
            animate={{ rotateY: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <Sparkles className="mx-auto mb-4 text-yellow-500" size={40} />
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} text-lg`}>
              Click to flip back
            </p>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mt-2`}>
              {skills.length} tools mastered
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function InteractiveTimeline({ darkMode }: { darkMode: boolean }) {
  const timelineData = [
    { year: '2014', company: 'Tech Mahindra', role: 'QA Engineer', color: 'bg-orange-500' },
    { year: '2017', company: 'Cognizant', role: 'Senior QA', color: 'bg-green-500' },
    { year: '2018', company: 'Infosys Ltd', role: 'Lead QA', color: 'bg-purple-500' },
    { year: '2022', company: 'Datamatics', role: 'QA Specialist', color: 'bg-blue-500' },
  ];

  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className={`absolute left-8 top-0 bottom-0 w-1 ${darkMode ? 'bg-slate-700' : 'bg-blue-200'}`} />
      
      <div className="space-y-8">
        {timelineData.map((item, index) => (
          <motion.div
            key={item.year}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="relative pl-20"
          >
            {/* Timeline Dot */}
            <motion.div
              whileHover={{ scale: 1.5, rotate: 180 }}
              className={`absolute left-4 top-4 w-8 h-8 ${item.color} rounded-full shadow-lg flex items-center justify-center text-white z-10 cursor-pointer`}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-3 h-3 bg-white rounded-full"
              />
            </motion.div>
            
            {/* Content Card */}
            <motion.div
              whileHover={{ scale: 1.03, x: 10 }}
              className={`${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-lg p-6 shadow-lg`}
            >
              <div className="flex items-center gap-4 mb-2">
                <span className={`${item.color} text-white px-3 py-1 rounded-full text-sm`}>
                  {item.year}
                </span>
                <h3 className={`text-xl ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{item.company}</h3>
              </div>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{item.role}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ExperienceContent({ darkMode }: { darkMode: boolean }) {
  const experiences = [
    {
      company: 'Datamatics Global Services Ltd',
      location: 'Mumbai',
      period: 'Mar 2022 - Present',
      color: 'from-blue-500 to-cyan-500',
      projects: 3
    },
    {
      company: 'Infosys Ltd.',
      location: 'Pune',
      period: '2018 - 2021',
      color: 'from-purple-500 to-pink-500',
      projects: 2
    },
    {
      company: 'Cognizant',
      location: 'Pune',
      period: '2017 - 2018',
      color: 'from-green-500 to-emerald-500',
      projects: 1
    },
    {
      company: 'Tech Mahindra',
      location: 'Pune',
      period: '2014 - 2017',
      color: 'from-orange-500 to-red-500',
      projects: 1
    }
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {experiences.map((exp, index) => (
        <motion.div
          key={exp.company}
          initial={{ opacity: 0, rotateX: -90 }}
          animate={{ opacity: 1, rotateX: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ 
            scale: 1.05,
            rotateY: 5,
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
          }}
          style={{ transformStyle: "preserve-3d" }}
          className={`${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg border-l-4 border-blue-500 hover:shadow-2xl transition-all relative overflow-hidden`}
        >
          <motion.div
            className={`absolute inset-0 bg-gradient-to-r ${exp.color} opacity-0`}
            whileHover={{ opacity: 0.1 }}
            transition={{ duration: 0.3 }}
          />
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className={`text-2xl ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{exp.company}</h3>
                <p className="text-blue-500 flex items-center gap-2 mt-2">
                  <MapPin size={16} />
                  {exp.location}
                </p>
              </div>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
                className={`bg-gradient-to-r ${exp.color} text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg`}
              >
                {exp.projects}
              </motion.div>
            </div>
            
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className={`bg-gradient-to-r ${exp.color} text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2 w-fit`}
            >
              <Calendar size={16} />
              {exp.period}
            </motion.span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ProjectsContent({ darkMode }: { darkMode: boolean }) {
  const projects = [
    {
      name: 'Holman',
      period: 'June 2024 - Present',
      company: 'Datamatics',
      highlights: [
        '50% reduction in manual testing effort',
        'Led team of 3 QA Engineers',
        '40% improvement in CI/CD efficiency'
      ],
      icon: <Rocket />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'SAIA',
      period: 'April 2023 - May 2024',
      company: 'Datamatics',
      highlights: [
        '30+ critical defects identified',
        'Implemented CI with Jenkins',
        'API design & performance review'
      ],
      icon: <Zap />,
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Engage CRM',
      period: 'March 2022 - March 2023',
      company: 'Datamatics',
      highlights: [
        'Led Agile Scrum activities',
        'Database & functional testing',
        'Azure DevOps implementation'
      ],
      icon: <Target />,
      color: 'from-green-500 to-emerald-500'
    },
    {
      name: 'PACCAR Services',
      period: '2019 - 2021',
      company: 'Infosys',
      highlights: [
        'ETL process validation',
        'Automated test cases',
        'Business Objects dashboard validation'
      ],
      icon: <TrendingUp />,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      name: 'British Telecom',
      period: '2018 - 2019',
      company: 'Infosys',
      highlights: [
        '25% increase in test coverage',
        'API automation testing',
        'System & Integration Testing'
      ],
      icon: <CheckCircle />,
      color: 'from-indigo-500 to-purple-500'
    },
    {
      name: 'British Telecom (Onshore)',
      period: '2015 - 2016',
      company: 'Tech Mahindra',
      highlights: [
        'System Analyst in UK',
        'Multiple testing types',
        'Customer communication'
      ],
      icon: <Users />,
      color: 'from-pink-500 to-red-500'
    }
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <motion.div
          key={project.name}
          initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ delay: index * 0.1, type: "spring" }}
          whileHover={{ 
            scale: 1.08, 
            rotateZ: 2,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)"
          }}
          style={{ transformStyle: "preserve-3d" }}
          className={`${darkMode ? 'bg-slate-800' : 'bg-gradient-to-br from-white to-blue-50'} rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all border-2 ${darkMode ? 'border-slate-700' : 'border-blue-200'} relative overflow-hidden group`}
        >
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10`}
            transition={{ duration: 0.3 }}
          />
          
          <div className="relative z-10">
            <div className="flex items-start gap-3 mb-4">
              <motion.div 
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.5 }}
                className={`bg-gradient-to-r ${project.color} text-white p-3 rounded-lg shadow-lg`}
              >
                {project.icon}
              </motion.div>
              <div>
                <h3 className={`text-xl ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{project.name}</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{project.company}</p>
                <p className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'} mt-1`}>{project.period}</p>
              </div>
            </div>
            <ul className="space-y-2">
              {project.highlights.map((highlight, idx) => (
                <motion.li 
                  key={idx} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`flex items-start gap-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  <CheckCircle size={16} className="text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-sm">{highlight}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function AchievementsContent({ darkMode }: { darkMode: boolean }) {
  const achievements = [
    {
      title: '50% Reduction in Manual Testing',
      description: 'Designed Selenium WebDriver framework',
      metric: '50%',
      icon: <Rocket />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: '30% Team Productivity Increase',
      description: 'Led and mentored QA team of 3 engineers',
      metric: '30%',
      icon: <Users />,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: '40% CI/CD Efficiency Boost',
      description: 'Jenkins integration for automated testing',
      metric: '40%',
      icon: <TrendingUp />,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: '25% Test Coverage Increase',
      description: 'API automation testing adoption',
      metric: '25%',
      icon: <Target />,
      color: 'from-orange-500 to-red-500'
    },
    {
      title: '30+ Critical Defects',
      description: 'Identified before production release',
      metric: '30+',
      icon: <Bug />,
      color: 'from-red-500 to-pink-500'
    },
    {
      title: 'International Experience',
      description: 'Worked onshore in UK (2015-2016)',
      metric: 'UK',
      icon: <MapPin />,
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {achievements.map((achievement, index) => (
        <motion.div
          key={achievement.title}
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: index * 0.1, type: "spring" }}
          whileHover={{ 
            scale: 1.1, 
            rotateY: 10,
            rotateX: 10,
            z: 50
          }}
          style={{ transformStyle: "preserve-3d" }}
          className={`${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all relative overflow-hidden group`}
        >
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-0 group-hover:opacity-20`}
            transition={{ duration: 0.3 }}
          />
          
          <div className="relative z-10">
            <motion.div 
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.6 }}
              className={`bg-gradient-to-r ${achievement.color} text-white w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg`}
            >
              {achievement.icon}
            </motion.div>
            <motion.div 
              className={`text-4xl text-center bg-gradient-to-r ${achievement.color} bg-clip-text text-transparent mb-2`}
              whileHover={{ scale: 1.2 }}
            >
              {achievement.metric}
            </motion.div>
            <h3 className={`text-lg text-center mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{achievement.title}</h3>
            <p className={`text-sm text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{achievement.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function EducationCard3D({ darkMode }: { darkMode: boolean }) {
  return (
    <motion.div 
      initial={{ opacity: 0, rotateY: -90 }}
      whileInView={{ opacity: 1, rotateY: 0 }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.03, 
        rotateY: 5,
        rotateX: 5,
        boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.5)"
      }}
      style={{ transformStyle: "preserve-3d" }}
      className={`${darkMode ? 'bg-slate-800 border-slate-600' : 'bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200'} rounded-xl p-6 border-2 transition-all shadow-xl relative overflow-hidden`}
    >
      <motion.div
        className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500 rounded-full opacity-10"
        animate={{ scale: [1, 1.2, 1], rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      
      <div className="flex flex-wrap justify-between items-start relative z-10">
        <div>
          <h3 className={`text-2xl ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Bachelor of Engineering</h3>
          <p className="text-blue-600 mt-2">Mechanical Engineering</p>
          <p className="text-purple-600 mt-1">Sant Gadge Baba Amravati University</p>
          <div className="mt-3 flex items-center gap-4">
            <motion.span 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="bg-green-100 text-green-800 px-4 py-1 rounded-full shadow-md"
            >
              CGPA: 7.8
            </motion.span>
          </div>
        </div>
        <motion.span 
          whileHover={{ scale: 1.1 }}
          className={`${darkMode ? 'bg-slate-700' : 'bg-white'} px-4 py-2 rounded-lg shadow-md flex items-center gap-2`}
        >
          <Calendar size={16} />
          <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>June 2010 - June 2014</span>
        </motion.span>
      </div>
    </motion.div>
  );
}

function AwardCard3D({ 
  title, 
  subtitle, 
  year, 
  color, 
  delay 
}: { 
  title: string; 
  subtitle?: string; 
  year?: string; 
  color: string; 
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, rotateY: 90, z: -100 }}
      whileInView={{ opacity: 1, rotateY: 0, z: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, type: "spring" }}
      whileHover={{ 
        scale: 1.1, 
        rotateZ: 5,
        rotateY: 10,
        boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.4)"
      }}
      style={{ transformStyle: "preserve-3d" }}
      className={`bg-gradient-to-br ${color} text-white rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all relative overflow-hidden cursor-pointer`}
    >
      <motion.div
        className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"
        animate={{ scale: [1, 1.5, 1], rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
      >
        <Award size={40} className="mb-4 relative z-10" />
      </motion.div>
      <h3 className="text-xl mb-2 relative z-10">{title}</h3>
      {subtitle && <p className="text-sm opacity-90 mb-1 relative z-10">{subtitle}</p>}
      {year && <p className="text-sm opacity-75 relative z-10">{year}</p>}
    </motion.div>
  );
}
