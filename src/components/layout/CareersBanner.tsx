'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  BriefcaseBusiness,
  X,
  User,
  Mail,
  Phone,
  ChevronDown,
  Send,
  CheckCircle,
  Pencil,
  Upload
} from 'lucide-react';

export default function CareersBanner() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fileName, setFileName] = useState('No file chosen');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form Fields State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [position, setPosition] = useState('');
  const [experience, setExperience] = useState('');
  const [coverLetter, setCoverLetter] = useState('');

  // Drag and Drop & Preview States
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Dropdown UI Toggle States
  const [showPositionDropdown, setShowPositionDropdown] = useState(false);
  const [showExperienceDropdown, setShowExperienceDropdown] = useState(false);

  // Errors State
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleUploadedFile = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, resume: 'File size exceeds 5MB limit' }));
      setFileName('No file chosen');
      setSelectedFile(null);
      setPreviewUrl(null);
    } else {
      setFileName(file.name);
      setSelectedFile(file);
      // Create local URL for PDF previews
      if (file.type === 'application/pdf') {
        setPreviewUrl(URL.createObjectURL(file));
      } else {
        setPreviewUrl(null);
      }
      setErrors(prev => {
        const next = { ...prev };
        delete next.resume;
        return next;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleUploadedFile(e.target.files[0]);
    }
  };

  const positions = [
    'Administration Assistant',
    'Administration Manager',
    'HR Manager',
    'HR Assistant',
    'ERP Coordinator',
    'Business Development Manager',
    'Business Development Officer',
    'Customer Relations Executive',
    'Customer Relations Officer',
    'Finance Manager',
    'Accounts (General ,Sales)',
    'Managing Director',
    'Chief Marketing Officer'
  ];

  const experiences = [
    'Fresher / < 1 Year',
    '1-2 Years',
    '2-3 Years',
    '3-5 Years',
    '5+ Years'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) newErrors.fullName = 'Full name is required';

    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\+?[0-9\s-]{8,15}$/.test(mobile)) {
      newErrors.mobile = 'Enter a valid mobile number';
    }

    if (!position) newErrors.position = 'Please select a position';
    if (!experience) newErrors.experience = 'Please select your experience';

    if (fileName === 'No file chosen') {
      newErrors.resume = 'Please upload your resume';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
    }
  };

  const handleResetAndClose = () => {
    setIsModalOpen(false);
    setIsSubmitted(false);
    setFullName('');
    setEmail('');
    setMobile('');
    setPosition('');
    setExperience('');
    setCoverLetter('');
    setFileName('No file chosen');
    setSelectedFile(null);
    setPreviewUrl(null);
    setErrors({});
  };

  return (
    <div className="w-full px-8 sm:px-4 lg:px-[2.5vw] py-10 lg:py-15">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10px" }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full max-w-[1200px] xl:max-w-[1300px] 2xl:max-w-[1400px] mx-auto rounded-2xl border border-slate-100 bg-[#FCFAF7] shadow-[0_4px_24px_rgba(0,0,0,0.06)] overflow-hidden grid grid-cols-1 md:grid-cols-12 relative"
      >
        {/* Left Side Content */}
        <div className="relative md:col-span-7 px-6 py-6 sm:px-12 sm:py-12 lg:px-[3vw] lg:py-8 flex flex-col justify-center bg-[#FDFBF9] overflow-hidden">
          {/* Subtle background doodle pattern */}
          <div className="absolute inset-0 opacity-[0.13] pointer-events-none select-none">
            <Image
              src="/CareersBanner/careers-left-bg.webp"
              alt="Pattern Background"
              fill
              className="object-cover object-left"
            />
          </div>

          <div className="relative z-10 flex flex-col items-start w-full">
            {/* Label with 55% underline */}
            <div className="relative flex flex-col items-start mb-3">
              <span className="text-[#153520] font-extrabold text-xs sm:text-sm tracking-widest uppercase font-manrope">
                Careers
              </span>
              <div className="h-[2px] w-[55%] bg-[#153520] mt-1" />
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl 2xl:text-[4rem] font-extrabold leading-none font-barlow tracking-relaxed mb-4 uppercase">
              <span className="text-[#7CB325] mr-2">Join</span>
              <span className="text-[#153520]">Our Team</span>
            </h2>

            {/* Description */}
            <p className="text-slate-900 font-medium text-sm sm:text-base max-w-[400px] mb-3.5 leading-relaxed font-manrope">
              Build your career with MEATIN. We're always looking for passionate and driven people to grow with us.
            </p>

            {/* Button & Arrow doodle alignment wrapper */}
            <div className="relative w-full flex items-center mt-2">
              {/* Button triggers Popup Modal */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#395B20] hover:bg-[#1E3C11] text-white font-bold text-xs sm:text-sm px-6 py-3.5 sm:px-5.5 sm:py-3.5 rounded-xl uppercase tracking-relaxed transition-all duration-300 flex items-center gap-2 shadow-md active:scale-95 hover:shadow-lg font-manrope z-10"
              >
                Apply Now <ArrowRight className="w-4 h-4" />
              </button>

              {/* Float Arrow Doodle */}
              <div className="relative ml-[15%] w-[90px] h-[45px] sm:w-[120px] sm:h-[60px] opacity-[0.8] select-none pointer-events-none hidden sm:block">
                <Image
                  src="/CareersBanner/careers-arrow.svg"
                  alt="Arrow Doodle"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Image */}
        <div className="relative md:col-span-5 min-h-[260px] md:min-h-full w-full overflow-hidden bg-slate-100">
          <Image
            src="/CareersBanner/careers_image.webp"
            alt="MEATIN Team"
            fill
            className="object-cover object-left md:object-left"
            sizes="(max-width: 768px) 100vw, 42vw"
            priority
          />
          {/* Gradient fade overlay linking right image to left content on desktop */}
          <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#FDFBF9] via-[#FDFBF9]/80 to-transparent hidden md:block z-10" />
        </div>
      </motion.div>

      {/* Careers Popup Form Modal overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">

            {/* Modal Box Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              data-lenis-prevent
              className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 relative shadow-2xl overflow-hidden max-h-[90vh] flex flex-col font-manrope text-slate-800"
            >

              {/* Close Button top-right */}
              <button
                onClick={handleResetAndClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors z-20"
              >
                <X className="w-6 h-6" />
              </button>

              {!isSubmitted ? (
                // FORM VIEW
                <div className="overflow-y-auto pr-1 flex flex-col h-full">
                  {/* Header Title with Briefcase Icon */}
                  <div className="flex items-center gap-3 mb-6 pb-2 border-b border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-[#FAF9F5] flex items-center justify-center text-[#395B20] border border-[#EBEAE5]">
                      <BriefcaseBusiness className="w-5 h-5" />
                    </div>
                    <h2 className="text-[1.5rem] md:text-[1.75rem] font-extrabold text-[#153520] font-manrope uppercase">
                      Apply For A Position
                    </h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                      {/* Full Name Field */}
                      <div className="space-y-1">
                        <label className="text-xs sm:text-sm font-bold text-slate-700">Full Name <span className="text-[#D62828]">*</span></label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#395B20] w-4 h-4" />
                          <input
                            type="text"
                            placeholder="Enter your full name"
                            value={fullName}
                            onChange={(e) => {
                              setFullName(e.target.value);
                              if (errors.fullName) {
                                setErrors(prev => {
                                  const next = { ...prev };
                                  delete next.fullName;
                                  return next;
                                });
                              }
                            }}
                            className={`w-full pl-9 pr-4 py-2.5 sm:py-3 border rounded-xl text-sm outline-none transition-all placeholder:text-slate-400/80 ${errors.fullName ? 'border-[#D62828]' : 'border-slate-400 focus:border-[#395B20] focus:ring-1 focus:ring-[#395B20]/20'}`}
                          />
                        </div>
                        {errors.fullName && <p className="text-xs text-[#D62828]">{errors.fullName}</p>}
                      </div>

                      {/* Email Address Field */}
                      <div className="space-y-1">
                        <label className="text-xs sm:text-sm font-bold text-slate-700">Email Address <span className="text-[#D62828]">*</span></label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#395B20] w-4 h-4" />
                          <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              if (errors.email) {
                                setErrors(prev => {
                                  const next = { ...prev };
                                  delete next.email;
                                  return next;
                                });
                              }
                            }}
                            className={`w-full pl-9 pr-4 py-2.5 sm:py-3 border rounded-xl text-sm outline-none transition-all placeholder:text-slate-400/80 ${errors.email ? 'border-[#D62828]' : 'border-slate-400 focus:border-[#395B20] focus:ring-1 focus:ring-[#395B20]/20'}`}
                          />
                        </div>
                        {errors.email && <p className="text-xs text-[#D62828]">{errors.email}</p>}
                      </div>

                      {/* Mobile Number Field */}
                      <div className="space-y-1">
                        <label className="text-xs sm:text-sm font-bold text-slate-700">Mobile Number <span className="text-[#D62828]">*</span></label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#395B20] w-4 h-4" />
                          <input
                            type="text"
                            placeholder="Enter your mobile number"
                            value={mobile}
                            onChange={(e) => {
                              setMobile(e.target.value);
                              if (errors.mobile) {
                                setErrors(prev => {
                                  const next = { ...prev };
                                  delete next.mobile;
                                  return next;
                                });
                              }
                            }}
                            className={`w-full pl-9 pr-4 py-2.5 sm:py-3 border rounded-xl text-sm outline-none transition-all placeholder:text-slate-400/80 ${errors.mobile ? 'border-[#D62828]' : 'border-slate-400 focus:border-[#395B20] focus:ring-1 focus:ring-[#395B20]/20'}`}
                          />
                        </div>
                        {errors.mobile && <p className="text-xs text-[#D62828]">{errors.mobile}</p>}
                      </div>

                      {/* Position Dropdown Field */}
                      <div className="space-y-1">
                        <label className="text-xs sm:text-sm font-bold text-slate-700">Position Interested In <span className="text-[#D62828]">*</span></label>
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => {
                              setShowPositionDropdown(!showPositionDropdown);
                              setShowExperienceDropdown(false);
                            }}
                            className={`w-full px-4 py-2.5 sm:py-3 border rounded-xl text-sm flex items-center justify-between text-left outline-none transition-all ${errors.position ? 'border-[#D62828]' : 'border-slate-400 focus:border-[#395B20]'} bg-white`}
                          >
                            <span className={position ? 'text-slate-800' : 'text-slate-400/80'}>
                              {position || 'Select Position'}
                            </span>
                            <ChevronDown className="w-4 h-4 text-[#395B20] shrink-0" />
                          </button>
                          {showPositionDropdown && (
                            <div
                              data-lenis-prevent
                              className="absolute left-0 right-0 top-[98%] mt-0 bg-white border-2 border-slate-400 rounded-xl shadow-2xl max-h-56 overflow-y-auto z-30 font-medium text-sm"
                            >
                              {positions.map((p, idx) => (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => {
                                    setPosition(p);
                                    setShowPositionDropdown(false);
                                    setErrors(prev => {
                                      const next = { ...prev };
                                      delete next.position;
                                      return next;
                                    });
                                  }}
                                  className={`w-full text-left px-4 py-2.5 transition-colors ${position === p ? 'bg-[#395B20] text-white' : 'hover:bg-[#EEF6E8] text-[#153520] hover:text-[#395B20]'}`}
                                >
                                  {p}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        {errors.position && <p className="text-xs text-[#D62828]">{errors.position}</p>}
                      </div>

                      {/* Experience Dropdown Field */}
                      <div className="space-y-1">
                        <label className="text-xs sm:text-sm font-bold text-slate-700">Experience <span className="text-[#D62828]">*</span></label>
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => {
                              setShowExperienceDropdown(!showExperienceDropdown);
                              setShowPositionDropdown(false);
                            }}
                            className={`w-full px-4 py-2.5 sm:py-3 border rounded-xl text-sm flex items-center justify-between text-left outline-none transition-all ${errors.experience ? 'border-[#D62828]' : 'border-slate-400 focus:border-[#395B20]'} bg-white`}
                          >
                            <span className={experience ? 'text-slate-800' : 'text-slate-400/80'}>
                              {experience || 'Select Experience'}
                            </span>
                            <ChevronDown className="w-4 h-4 text-[#395B20] shrink-0" />
                          </button>
                          {showExperienceDropdown && (
                            <div
                              data-lenis-prevent
                              className="absolute left-0 right-0 top-[98%] mt-0 bg-white border-2 border-slate-400 rounded-xl shadow-2xl max-h-48 overflow-y-auto z-30 font-medium text-sm"
                            >
                              {experiences.map((exp, idx) => (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => {
                                    setExperience(exp);
                                    setShowExperienceDropdown(false);
                                    setErrors(prev => {
                                      const next = { ...prev };
                                      delete next.experience;
                                      return next;
                                    });
                                  }}
                                  className={`w-full text-left px-4 py-2.5 transition-colors ${experience === exp ? 'bg-[#395B20] text-white' : 'hover:bg-[#EEF6E8] text-[#153520] hover:text-[#395B20]'}`}
                                >
                                  {exp}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        {errors.experience && <p className="text-xs text-[#D62828]">{errors.experience}</p>}
                      </div>

                      {/* Upload Resume File Field with Drag & Drop Zone */}
                      <div className="space-y-1">
                        <label className="text-xs sm:text-sm font-bold text-slate-700">Upload Resume <span className="text-[#D62828]">*</span></label>
                        <div
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          className={`border rounded-xl p-2 flex flex-wrap sm:flex-nowrap items-center gap-2 bg-white transition-all ${isDragging ? 'border-dashed border-[#395B20] bg-[#EEF6E8]/30' : errors.resume ? 'border-[#D62828]' : 'border-slate-400 focus-within:border-[#395B20]'}`}
                        >
                          {/* File input (Hidden) */}
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                          />

                          {/* Green square container with Upload icon */}
                          <div className="w-10 h-10 shrink-0 rounded-lg bg-[#EEF6E8] flex items-center justify-center text-[#395B20] mr-1">
                            <Upload className="w-5 h-5" />
                          </div>

                          {/* Custom Button Trigger */}
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="shrink-0 border border-slate-200 text-[#153520] hover:bg-[#EEF6E8] hover:text-[#395B20] hover:border-[#EEF6E8] transition-all font-bold text-xs px-3.5 py-2.5 rounded-lg active:scale-95 bg-white shadow-xs"
                          >
                            Choose File
                          </button>

                          <span className="text-xs text-slate-500 truncate min-w-[70px] flex-1">
                            {fileName}
                          </span>

                          {/* Preview Resume Option if file exists */}
                          {selectedFile && (
                            <button
                              type="button"
                              onClick={() => {
                                if (previewUrl) {
                                  window.open(previewUrl, '_blank');
                                } else {
                                  alert(`Previewing is supported directly in the browser for PDF resumes. For Word docs (${selectedFile.name}), please download to view.`);
                                }
                              }}
                              className="shrink-0 border border-[#395B20] text-[#395B20] hover:bg-[#395B20] hover:text-white transition-all font-bold text-[10px] sm:text-xs px-2.5 py-1.5 rounded-lg active:scale-95 ml-auto"
                            >
                              Preview
                            </button>
                          )}
                        </div>
                        <p className="text-xs text-slate-600">PDF, DOC, DOCX (Max 5MB) • Drag & Drop supported</p>
                        {errors.resume && <p className="text-xs text-[#D62828]">{errors.resume}</p>}
                      </div>

                    </div>

                    {/* Cover Letter Field */}
                    <div className="space-y-1">
                      <label className="text-xs sm:text-sm font-bold text-slate-700">Cover Letter (Optional)</label>
                      <div className="relative">
                        <Pencil className="absolute left-3 top-3 text-[#395B20] w-4 h-4" />
                        <textarea
                          rows={3}
                          placeholder="Write a few lines about yourself"
                          value={coverLetter}
                          onChange={(e) => setCoverLetter(e.target.value)}
                          className="w-full pl-9 pr-4 py-3 border border-slate-400 focus:border-[#395B20] focus:ring-1 focus:ring-[#395B20]/20 rounded-xl text-sm outline-none transition-all placeholder:text-slate-400/80 resize-none"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="bg-[#395B20] hover:bg-[#1E3C11] text-white font-bold text-xs sm:text-sm px-6 py-3.5 sm:px-6 sm:py-3.5 rounded-xl uppercase transition-all duration-300 flex items-center gap-2 shadow-md active:scale-95 hover:shadow-lg font-manrope"
                      >
                        Submit Application <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                // SUCCESS SCREEN VIEW
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-10 px-4 space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-[#7CB325]/10 flex items-center justify-center text-[#7CB325] mb-2">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#153520] font-manrope uppercase tracking-relaxed">
                    Application Submitted!
                  </h2>
                  <p className="text-slate-800 font-medium text-sm sm:text-base max-w-md leading-relaxed">
                    Successful submission! We will contact you shortly. Thank you for your interest in joining MEATIN.
                  </p>
                  <button
                    onClick={handleResetAndClose}
                    className="mt-8 bg-[#395B20] hover:bg-[#1E3C11] text-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-xl uppercase transition-all shadow-md active:scale-95"
                  >
                    Close
                  </button>
                </motion.div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
