import { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

// Icons
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaDownload, FaYoutube } from "react-icons/fa";
import { MdEmail, MdClose, MdNotificationsActive, MdLocationOn, MdPhone } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi"; 
import { FiArrowUpRight } from "react-icons/fi";

// Assets
import image from "./assets/sagor.png";
import img1 from "./assets/1.png";
import img2 from "./assets/2.jpg";

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

function Layout() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showWelcomeMsg, setShowWelcomeMsg] = useState(false);
  
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const workRef = useRef(null);
  const contactRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => setShowWelcomeMsg(true), 1200);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (ref) => {
    setMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => ref.current?.scrollIntoView({ behavior: "smooth" }), 100);
    } else {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0c10]">
        <div className="text-center">
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-16 h-16 border-4 border-[#5a3bff] border-t-transparent rounded-full mx-auto mb-4" />
          <TypeAnimation sequence={["SAGOR AHMED BIO...", 1000]} speed={50} className="text-xl font-black text-white italic" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0c10] text-white font-sans selection:bg-[#5a3bff] selection:text-white overflow-x-hidden">
      
      {/* 1. WELCOME POPUP */}
      <AnimatePresence>
        {showWelcomeMsg && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="fixed bottom-10 right-6 md:right-12 z-[200] max-w-[320px]">
            <div className="bg-white text-black p-6 rounded-[2.5rem] shadow-2xl border-t-4 border-[#5a3bff] relative">
              <button onClick={() => setShowWelcomeMsg(false)} className="absolute top-4 right-4 text-xl opacity-30 hover:opacity-100"><MdClose/></button>
              <div className="flex items-center gap-3 mb-2 text-[#5a3bff]">
                <MdNotificationsActive className="animate-bounce" />
                <span className="font-black text-[10px] uppercase tracking-widest">New Notification</span>
              </div>
              <h4 className="text-lg font-black italic">Hi, I'm Sagor!</h4>
              <p className="text-xs opacity-70 font-bold mb-4">Let's build something extraordinary today.</p>
              <button onClick={() => {setShowWelcomeMsg(false); scrollToSection(contactRef)}} className="w-full bg-black text-white py-3 rounded-xl font-black text-[10px] uppercase hover:bg-[#5a3bff] transition-all">Get Started</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. SIDEBAR HEADER */}
      <header className="fixed top-0 left-0 w-full z-[100] px-6 py-6 flex justify-between items-center pointer-events-none">
        <button onClick={() => setMenuOpen(true)} className="pointer-events-auto text-4xl text-white bg-black/40 p-2 rounded-xl backdrop-blur-md border border-white/5 hover:text-[#5a3bff] transition-all shadow-xl">
          <HiMenuAlt2 />
        </button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/90 backdrop-blur-md z-[101]" onClick={() => setMenuOpen(false)} />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25 }} className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-white text-black z-[102] p-12 flex flex-col justify-between shadow-2xl">
              <div>
                <div className="flex justify-between items-center mb-12">
                  <h2 className="text-4xl font-black text-[#5a3bff] italic">Sagor</h2>
                  <button onClick={() => setMenuOpen(false)} className="text-4xl hover:rotate-90 transition-all"><MdClose /></button>
                </div>
                <nav className="space-y-6">
                  <SidebarLink label="Home" onClick={() => scrollToSection(homeRef)} />
                  <SidebarLink label="About" onClick={() => scrollToSection(aboutRef)} />
                  <SidebarLink label="Portfolio" onClick={() => scrollToSection(workRef)} />
                  <SidebarLink label="Contact" onClick={() => scrollToSection(contactRef)} />
                </nav>
                <button onClick={() => scrollToSection(contactRef)} className="mt-12 w-full bg-[#5a3bff] text-white py-5 rounded-2xl font-black uppercase text-sm shadow-xl hover:scale-105 transition-all">Get Started →</button>
              </div>
              <div className="mt-10 border-t pt-10 text-center">
                 <p className="font-bold opacity-60 mb-4">+880 1318 102806</p>
                 <div className="flex justify-center gap-4 text-2xl">
                    <a href="https://facebook.com/bdsagordm" className="hover:text-[#5a3bff]"><FaFacebookF/></a>
                    <a href="https://linkedin.com/in/bdsagordm" className="hover:text-[#5a3bff]"><FaLinkedinIn/></a>
                    <a href="https://youtube.com/@bdsagordm" className="hover:text-[#5a3bff]"><FaYoutube/></a>
                 </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 3. HERO SECTION */}
      <section ref={homeRef} className="min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-[12%] pt-32 pb-20 relative overflow-hidden">
        <div className="max-w-3xl z-10 text-center md:text-left">
          <div className="mb-6 inline-block">
             <span className="fire-text text-xl md:text-2xl font-black italic uppercase tracking-widest">Certified SEO Specialist</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-black leading-[0.9] tracking-tighter mb-6 uppercase italic">
            Sagor <span className="text-[#d4af37]">Ahmed</span>
          </h1>
          <p className="text-white/40 font-bold mb-10 text-lg md:text-xl">Transforming Brands through Result-Driven SEO & Ads 🚀</p>
          <div className="flex flex-wrap gap-5 justify-center md:justify-start">
            <button onClick={() => scrollToSection(contactRef)} className="bg-[#5a3bff] text-white px-10 py-5 rounded-2xl font-black hover:scale-110 transition-all shadow-[0_0_30px_rgba(90,59,255,0.4)]">Contact Me</button>
            <button onClick={() => scrollToSection(workRef)} className="border border-white/10 px-10 py-5 rounded-2xl font-black hover:bg-white hover:text-black transition-all">Portfolio</button>
          </div>
        </div>
        <div className="relative mt-20 md:mt-0 z-10">
            <img src={image} className="w-72 md:w-[480px] drop-shadow-2xl rounded-[4rem] border-b-8 border-[#5a3bff]" alt="Sagor" />
        </div>
      </section>

      {/* 4. PERSONAL INFO SECTION */}
      <section ref={aboutRef} className="py-20 px-6 md:px-[12%]">
        <div className="max-w-5xl mx-auto bg-[#111318] rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl relative">
          <div className="bg-[#1a1c23] py-5 text-center border-b border-white/5">
            <h2 className="text-2xl md:text-3xl font-black tracking-widest uppercase italic"><span className="text-white">PERSONAL</span> <span className="text-[#d4af37]">INFOS</span></h2>
          </div>
          <div className="p-8 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
            <InfoItem label="First Name" value="Sagor Ahmed" />
            <InfoItem label="Phone" value="+8801318102806" />
            <InfoItem label="Age" value="19 Years" />
            <InfoItem label="Skype" value="live:.cid.sagor_bio" />
            <InfoItem label="Nationality" value="Bangladeshi" />
            <InfoItem label="Github" value="sagor-bio" />
            <InfoItem label="Address" value="Dhaka, Bangladesh" />
            <InfoItem label="E-mail" value="bdsagordm@gmail.com" />
            <InfoItem label="Profession" value="SEO Expert" />
            <InfoItem label="Language" value="English, Bangla" />
            <div className="flex items-center gap-4">
               <span className="opacity-50 font-bold">Remote :</span>
               <span className="text-[#c1ff00] font-black uppercase">Available</span>
            </div>
            <InfoItem label="Hobbies" value="Learning, Traveling" />
          </div>
          <button className="w-full flex items-center justify-center gap-3 py-6 bg-[#1a1c23] border-t border-white/5 font-black uppercase italic tracking-widest hover:bg-[#5a3bff] transition-all group">
              Download <span className="text-[#d4af37] group-hover:text-white">Resume</span> <FaDownload className="text-sm"/>
          </button>
        </div>
      </section>

      {/* 5. EXPERIENCE SECTION */}
      <section className="py-20 px-6 md:px-[12%] bg-[#0a0c10]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-4xl font-black italic mb-16 uppercase text-[#d4af37]">Experience & <span className="text-white">Education</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <ExpCard date="2024 - Present" title="SEO EXPERT" company="Upwork" desc="Delivering high-end SEO solutions for global clients to scale their digital presence." />
             <ExpCard date="2024 - Present" title="YOUTUBE SPECIALIST" company="Fiverr" desc="Expert in video ranking, channel optimization, and organic audience growth." />
             <ExpCard date="2024 - 2025" title="ADVERTISING MANAGER" company="Midwest Roofing Ltd." desc="Managed complex ad campaigns in the UK market for lead generation." />
             <ExpCard date="2024 - 2025" title="GROWTH STRATEGIST" company="Alux Realty" desc="Strategized real estate marketing funnels for US-based projects." />
          </div>
        </div>
      </section>

      {/* 6. SKILLS SECTION (FIXED ERROR) */}
      <section className="py-20 px-6 md:px-[12%]">
        <h2 className="text-4xl md:text-5xl font-black mb-16 italic text-[#d4af37] uppercase tracking-tighter text-center">Master <span className="text-white">Skills</span></h2>
        <div className="max-w-5xl mx-auto relative p-10 md:p-16 bg-[#111318] rounded-[3rem] border border-white/5">
          <div className="absolute inset-0 border-2 border-[#d4af37]/20 rounded-[3rem]"></div>
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute -inset-[2px] border-[2px] border-t-[#d4af37] border-l-transparent border-r-transparent border-b-transparent rounded-[3rem] opacity-40 pointer-events-none" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10">
            <SkillBar label="SEO Specialist" percent="96%" />
            <SkillBar label="YouTube Optimizing" percent="92%" />
            <SkillBar label="Video SEO" percent="97%" />
            <SkillBar label="Google Ads" percent="91%" />
            <SkillBar label="Meta Ads" percent="91%" />
            <SkillBar label="Content Marketing" percent="85%" />
          </div>
        </div>
      </section>

      {/* 7. PORTFOLIO */}
      <section ref={workRef} className="py-32 px-6 md:px-[12%] bg-[#0f1115]">
        <h2 className="text-5xl md:text-7xl font-black text-center mb-20 italic uppercase tracking-tighter">My <span className="text-[#5a3bff]">Works</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <WorkCard img={img1} title="YouTube Growth Case" cat="SEO" />
          <WorkCard img={img2} title="Meta Ads ROI Strategy" cat="Ads" />
          <WorkCard img={img1} title="Global SEO Audit" cat="Analytics" />
          <WorkCard img={img2} title="Ad Funnel Design" cat="Marketing" />
          <WorkCard img={img1} title="Organic Video SEO" cat="YouTube" />
          <WorkCard img={img2} title="Sales Conversion" cat="Strategy" />
        </div>
      </section>

      {/* 8. CONTACT SECTION */}
      <section ref={contactRef} className="py-32 px-6 md:px-[12%]">
        <div className="max-w-6xl mx-auto bg-[#161a20] p-10 md:p-24 rounded-[4rem] border border-white/5 grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-6xl font-black mb-10 tracking-tighter uppercase italic text-[#d4af37]">Let's talk.</h2>
            <p className="font-bold opacity-40 mb-12 text-lg">Ready to dominate your niche? Reach out and let's start growing.</p>
            <div className="space-y-6">
               <ContactInfo icon={<MdEmail/>} value="bdsagordm@gmail.com" />
               <ContactInfo icon={<MdPhone/>} value="+8801318102806" />
               <ContactInfo icon={<MdLocationOn/>} value="Dhaka, Bangladesh" />
            </div>
          </div>
          <form className="space-y-4">
            <input className="w-full p-6 rounded-2xl bg-black border border-white/5 outline-none focus:border-[#5a3bff] transition-all" placeholder="Full Name" />
            <input className="w-full p-6 rounded-2xl bg-black border border-white/5 outline-none focus:border-[#5a3bff] transition-all" placeholder="Email Address" />
            <textarea className="w-full p-6 rounded-2xl bg-black border border-white/5 h-40 outline-none focus:border-[#5a3bff] transition-all" placeholder="Your Project Ideas"></textarea>
            <button className="w-full bg-[#d4af37] text-black py-6 rounded-2xl font-black uppercase text-xl shadow-2xl hover:bg-[#5a3bff] hover:text-white transition-all">Send Message</button>
          </form>
        </div>
      </section>

      {/* 9. MAIN FOOTER (FIXED AS PER IMAGE CC3666) */}
      <footer className="bg-[#f0f4f8] text-black py-20 px-6 md:px-[12%] mt-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Logo & Bio */}
          <div className="space-y-6">
            <div className="text-3xl font-black tracking-tighter italic flex items-center gap-2">
              <span className="text-[#5a3bff] border-l-4 border-[#5a3bff] pl-2">SAGOR</span> AHMED
            </div>
            <p className="text-sm opacity-70 leading-relaxed font-medium">
              By optimizing content, leveraging relevant keywords, and adhering to SEO best practices, businesses can secure a prominent position in search engine results.
            </p>
            {/* Social Icons - Boro ebong Black */}
            <div className="flex gap-3">
              <FooterSocialIcon href="https://facebook.com/bdsagordm" icon={<FaFacebookF/>} />
              <FooterSocialIcon href="https://instagram.com/bdsagordm" icon={<FaInstagram/>} />
              <FooterSocialIcon href="https://linkedin.com/in/bdsagordm" icon={<FaLinkedinIn/>} />
              <FooterSocialIcon href="https://youtube.com/@bdsagordm" icon={<FaYoutube/>} />
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xl font-black mb-8 uppercase italic">About Us</h3>
            <ul className="space-y-4 font-bold opacity-60 text-sm">
              <li className="hover:text-[#5a3bff] cursor-pointer">Our Blog</li>
              <li className="hover:text-[#5a3bff] cursor-pointer" onClick={() => scrollToSection(aboutRef)}>About Us</li>
              <li className="hover:text-[#5a3bff] cursor-pointer" onClick={() => scrollToSection(workRef)}>Services</li>
              <li className="hover:text-[#5a3bff] cursor-pointer" onClick={() => scrollToSection(contactRef)}>Contact Us</li>
            </ul>
          </div>

          {/* Contact Details (Updated) */}
          <div>
            <h3 className="text-xl font-black mb-8 uppercase italic">Get in touch</h3>
            <div className="space-y-5">
              <FooterContactItem icon={<MdEmail/>} text="bdsagordm@gmail.com" />
              <FooterContactItem icon={<MdPhone/>} text="+8801318102806" />
              <FooterContactItem icon={<MdLocationOn/>} text="Dhaka, Bangladesh" />
            </div>
          </div>

          {/* Newsletter Section (New Design) */}
          <div>
            <h3 className="text-xl font-black mb-8 uppercase italic">Subscribe Our Newsletter</h3>
            <div className="flex bg-[#e0e7ff] p-2 rounded-full border border-[#5a3bff]/10 max-w-[300px]">
              <input 
                type="email" 
                placeholder="Enter Your email" 
                className="bg-transparent border-none outline-none px-4 py-2 w-full text-sm font-medium"
              />
              <button className="bg-[#5a3bff] text-white p-3 rounded-full hover:scale-105 transition-all flex items-center justify-center">
                <span className="text-xs font-bold mr-1">Subscribe</span>
                <FiArrowUpRight />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] font-bold opacity-50 uppercase tracking-widest">
          <p>©Copyright 2024 bdsagordm.com . All rights reserved</p>
          <div className="flex gap-8">
            <span className="hover:text-black cursor-pointer">Terms & Conditions</span>
            <span className="hover:text-black cursor-pointer">Privacy Policy</span>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fire-glow {
          0% { text-shadow: 0 0 10px #ff4500; color: #fff; }
          50% { text-shadow: 0 0 25px #ff8c00; color: #ffeb3b; }
          100% { text-shadow: 0 0 10px #ff4500; color: #fff; }
        }
        .fire-text { animation: fire-glow 1.5s infinite; }
      `}} />
    </div>
  );
}

// HELPER COMPONENTS
function SidebarLink({ label, onClick }) {
  return (
    <motion.div whileHover={{ x: 10 }} onClick={onClick} className="text-2xl font-black uppercase tracking-tight cursor-pointer hover:text-[#5a3bff] transition-all">
      {label}
    </motion.div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className="flex gap-4">
      <span className="opacity-50 font-bold min-w-[100px]">{label} :</span>
      <span className="font-black text-white italic">{value}</span>
    </div>
  );
}

// FIXED SKILLBAR COMPONENT
function SkillBar({ label, percent }) {
  return (
    <div>
      <div className="flex justify-between mb-4 font-black uppercase text-[10px] tracking-widest opacity-70 italic">
        <span>{label}</span>
        <span>{percent}</span>
      </div>
      <div className="w-full h-[6px] bg-white/5 rounded-full overflow-hidden">
        {/* Style fixed with double curly braces */}
        <motion.div 
            initial={{ width: 0 }} 
            whileInView={{ width: percent }} 
            transition={{ duration: 2 }} 
            style={{ width: percent }}
            className="h-full bg-gradient-to-r from-[#d4af37] to-[#5a3bff]" 
        />
      </div>
    </div>
  );
}

function ExpCard({ date, title, company, desc }) {
  return (
    <div className="bg-[#111318] p-8 rounded-[2rem] border border-white/5 hover:border-[#d4af37] transition-all">
       <span className="inline-block px-4 py-1 bg-white/5 rounded-full text-[10px] font-black mb-4">{date}</span>
       <h3 className="text-xl font-black italic text-white uppercase">{title} - <span className="text-[#d4af37]">{company}</span></h3>
       <p className="mt-3 opacity-40 text-sm font-bold leading-relaxed">{desc}</p>
    </div>
  );
}

function WorkCard({ img, title, cat }) {
  return (
    <div className="group relative rounded-[3rem] overflow-hidden h-80 border border-white/5">
      <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" alt={title} />
      <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-center items-center p-8 text-center">
        <p className="text-[#5a3bff] text-xs font-black uppercase tracking-widest mb-3">{cat}</p>
        <h4 className="text-2xl font-black italic">{title}</h4>
      </div>
    </div>
  );
}

function ContactInfo({ icon, value }) {
  return (
    <div className="flex items-center gap-5">
      <div className="p-4 bg-black border border-white/5 rounded-2xl text-[#d4af37] text-2xl">{icon}</div>
      <p className="font-black italic text-lg">{value}</p>
    </div>
  );
}

// Updated Social Icon for Footer
function FooterSocialIcon({ href, icon }) {
  return (
    <a href={href} className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-xl hover:bg-[#5a3bff] transition-all">
      {icon}
    </a>
  );
}

function FooterContactItem({ icon, text }) {
  return (
    <div className="flex items-start gap-4">
      <span className="text-xl text-black mt-1">{icon}</span>
      <span className="text-sm font-bold opacity-70">{text}</span>
    </div>
  );
}