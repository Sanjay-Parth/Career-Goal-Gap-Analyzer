import React, { useState, useRef } from 'react'
import "../style/home.scss"
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'

const Home = () => {

    const { loading, generateReport, reports } = useInterview()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const resumeInputRef = useRef()

    const navigate = useNavigate()

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[0]
        const data = await generateReport({ jobDescription, selfDescription, resumeFile })
        navigate(`/interview/${data._id}`)
    }

    if (loading) {
        return (
            <main className='min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black text-white'>
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <h1 className="text-lg font-medium text-gray-300">Preparing your AI interview strategy...</h1>
                </div>
            </main>
        )
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-black  to-black text-white px-4 py-10'>

            {/* Header */}
            <header className='text-center mb-12'>
                <h1 className='text-4xl md:text-6xl font-extrabold tracking-tight'>
                    Build Your <span className='text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600'>AI Interview Plan</span>
                </h1>
                <p className='text-gray-400 mt-4 max-w-2xl mx-auto'>
                    Analyze job descriptions and your profile to generate a high-performance interview strategy.
                </p>
            </header>

            {/* Main Card */}
            <div className='max-w-6xl mx-auto bg-black backdrop-blur-xl border border-none rounded-3xl shadow-2xl overflow-hidden'>

                <div className='grid md:grid-cols-2'>

                    {/* Left */}
                    <div className='p-8 border-b md:border-b-0 md:border-r border-white/10'>
                        <div className='flex items-center justify-between mb-4'>
                            <h2 className='text-lg font-semibold'>Target Job Description</h2>
                            <span className='text-xs bg-red-500/20 text-red-300 px-3 py-1 rounded-full border border-red-500/30'>
                                Required
                            </span>
                        </div>

                        <textarea
                            onChange={(e) => setJobDescription(e.target.value)}
                            className='w-full h-72 bg-black/40 border border-white/50 text-white p-4 rounded-xl outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition'
                            placeholder="Paste the full job description here..."
                            maxLength={5000}
                        />

                        <div className='text-xs text-gray-100 mt-2'>
                            {jobDescription.length} / 5000 characters
                        </div>
                    </div>

                    {/* Right */}
                    <div className='p-8'>

                        <h2 className='text-lg font-semibold mb-4'>Your Profile</h2>

                        {/* Upload */}
                        <div className='mb-6'>
                            <label className='block mb-2 text-sm text-gray-300'>
                                Upload Resume
                                <span className='ml-2 text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full border border-green-500/30'>
                                    Recommended
                                </span>
                            </label>

                            <label className='block border border-dashed border-white/50 p-8 text-center rounded-xl cursor-pointer hover:border-green-500/60 hover:bg-white/5 transition'>
                                <p className='text-gray-300'>Click or drag & drop your resume</p>
                                <p className='text-xs text-gray-500 mt-1'>PDF or DOCX (max 5MB)</p>

                                <input
                                    ref={resumeInputRef}
                                    hidden
                                    type='file'
                                    accept='.pdf,.docx'
                                />
                            </label>
                        </div>

                        <div className='text-center text-gray-500 my-4 text-sm'>OR</div>

                        {/* Self Description */}
                        <div>
                            <label className='block mb-2 text-sm text-gray-300'>
                                Quick Self Description
                            </label>

                            <textarea
                                onChange={(e) => setSelfDescription(e.target.value)}
                                className='w-full h-40 bg-black/40 border border-white/50 text-white p-4 rounded-xl outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition'
                                placeholder="Briefly describe your experience..."
                            />
                        </div>

                        <p className='text-xs text-gray-500 mt-3'>
                            Provide resume or self description for best results.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className='flex flex-col md:flex-row items-center justify-between gap-4 p-6 border-t border-white/10'>

                    <p className='text-xs text-gray-500'>
                        ⚡ AI generates your strategy in ~30 seconds
                    </p>

                    <button
                        onClick={handleGenerateReport}
                        className='px-8 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-[1.02] active:scale-95 transition font-semibold shadow-lg shadow-green-500/20'
                    >
                        Generate Interview Strategy
                    </button>
                </div>
            </div>

            {/* Recent Reports */}
            {reports.length > 0 && (
                <section className='max-w-5xl mx-auto mt-14'>
                    <h2 className='text-xl font-semibold mb-5'>Recent Plans</h2>

                    <div className='grid md:grid-cols-2 gap-4'>
                        {reports.map(report => (
                            <div
                                key={report._id}
                                onClick={() => navigate(`/interview/${report._id}`)}
                                className='p-5 rounded-xl bg-white/5 border border-white/10 hover:border-green-500/50 cursor-pointer transition hover:scale-[1.01]'
                            >
                                <h3 className='font-semibold text-white'>
                                    {report.title || 'Untitled Position'}
                                </h3>

                                <p className='text-xs text-gray-500 mt-1'>
                                    {new Date(report.createdAt).toLocaleDateString()}
                                </p>

                                <p className='text-sm text-green-400 mt-2'>
                                    Match Score: {report.matchScore}%
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer className='mt-16 text-center text-xs text-gray-500 space-x-6'>
                <a className='hover:text-white transition' href="#">Privacy</a>
                <a className='hover:text-white transition' href="#">Terms</a>
                <a className='hover:text-white transition' href="#">Support</a>
            </footer>

        </div>
    )
}

export default Home