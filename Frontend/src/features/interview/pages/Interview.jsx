import React, { useState, useEffect } from 'react'
import '../style/interview.scss'
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate, useParams } from 'react-router'
import Loading from '../../../components/Loading.jsx'

const NAV_ITEMS = [
    { id: 'technical', label: 'Technical', icon: "⚙️" },
    { id: 'behavioral', label: 'Behavioral', icon: "💬" },
    { id: 'roadmap', label: 'Road Map', icon: "🧭" },
]

// Question Card (UI only improved for mobile)
const QuestionCard = ({ item, index }) => {
    const [open, setOpen] = useState(false)

    return (
        <div className='bg-white/5 border border-white/10 rounded-xl p-3 md:p-4'>
            <div
                className='flex items-start gap-3 cursor-pointer'
                onClick={() => setOpen(o => !o)}
            >
                <span className='text-xs bg-black/40 px-2 py-1 rounded'>
                    Q{index + 1}
                </span>

                <p className='flex-1 text-sm'>
                    {item.question}
                </p>

                <span className={`transition-transform ${open ? 'rotate-180' : ''}`}>
                    ⌄
                </span>
            </div>

            {open && (
                <div className='mt-3 space-y-2 text-sm text-gray-300'>
                    <div className='p-3 bg-black/30 rounded-lg'>
                        <p className='text-xs text-green-400'>Intention</p>
                        {item.intention}
                    </div>
                    <div className='p-3 bg-black/30 rounded-lg'>
                        <p className='text-xs text-blue-400'>Answer</p>
                        {item.answer}
                    </div>
                </div>
            )}
        </div>
    )
}

// Roadmap UI responsive
const RoadMapDay = ({ day }) => (
    <div className='bg-white/5 border border-white/10 rounded-xl p-3 md:p-4'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-2'>
            <span className='text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded w-fit'>
                Day {day.day}
            </span>
            <h3 className='text-sm font-semibold'>{day.focus}</h3>
        </div>

        <ul className='mt-2 space-y-1 text-sm text-gray-300'>
            {day.tasks.map((task, i) => (
                <li key={i} className='flex gap-2'>
                    • {task}
                </li>
            ))}
        </ul>
    </div>
)

const Interview = () => {

    const [activeNav, setActiveNav] = useState('technical')
    const { report, getReportById, loading, getResumePdf } = useInterview()
    const { interviewId } = useParams()

    useEffect(() => {
        if (interviewId) getReportById(interviewId)
    }, [interviewId])

    if (loading || !report) {
        return (
            <main className='h-screen flex items-center justify-center bg-black text-white'>
                <Loading />
            </main>
        )
    }

    return (
        <div className='h-screen flex flex-col md:flex-row bg-black text-white'>

            {/* LEFT NAV (mobile horizontal scroll) */}
            <nav className='w-full md:w-64 flex md:flex-col overflow-x-auto md:overflow-visible border-b md:border-b-0 md:border-r border-white/10 bg-white/5 p-2 md:p-4'>

                <div className='flex md:flex-col gap-2'>
                    {NAV_ITEMS.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveNav(item.id)}
                            className={`px-3 py-2 text-xs md:text-sm rounded-lg whitespace-nowrap
                            ${activeNav === item.id
                                    ? 'bg-green-500/20 text-green-400'
                                    : 'text-gray-300 hover:bg-white/5'
                                }`}
                        >
                            {item.icon} {item.label}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => getResumePdf(interviewId)}
                    className='hidden md:block mt-auto text-xs bg-green-600 py-2 rounded-lg'
                >
                    Download Resume
                </button>
            </nav>

            {/* MAIN */}
            <main className='flex-1 overflow-y-auto p-3 md:p-4 space-y-4'>

                {activeNav === 'technical' && (
                    <>
                        <h2 className='text-lg font-semibold'>Technical Questions</h2>
                        {report.technicalQuestions.map((q, i) => (
                            <QuestionCard key={i} item={q} index={i} />
                        ))}
                    </>
                )}

                {activeNav === 'behavioral' && (
                    <>
                        <h2 className='text-lg font-semibold'>Behavioral Questions</h2>
                        {report.behavioralQuestions.map((q, i) => (
                            <QuestionCard key={i} item={q} index={i} />
                        ))}
                    </>
                )}

                {activeNav === 'roadmap' && (
                    <>
                        <h2 className='text-lg font-semibold'>Roadmap</h2>
                        {report.preparationPlan.map((day) => (
                            <RoadMapDay key={day.day} day={day} />
                        ))}
                    </>
                )}

            </main>

            {/* RIGHT PANEL (mobile bottom) */}
            <aside className='w-full md:w-72 border-t md:border-t-0 md:border-l border-white/10 bg-white/5 p-4'>

                <div className='text-center mb-4'>
                    <p className='text-xs text-gray-400'>Match Score</p>
                    <div className='text-3xl md:text-4xl font-bold text-green-400'>
                        {report.matchScore}%
                    </div>
                </div>

                <div>
                    <p className='text-xs text-gray-400 mb-2'>Skill Gaps</p>
                    <div className='flex flex-wrap gap-2'>
                        {report.skillGaps.map((gap, i) => (
                            <span
                                key={i}
                                className='text-xs px-2 py-1 rounded bg-white/10'
                            >
                                {gap.skill}
                            </span>
                        ))}
                    </div>
                </div>

                <button
                    onClick={() => getResumePdf(interviewId)}
                    className='md:hidden w-full mt-4 text-xs bg-green-600 py-2 rounded-lg'
                >
                    Download Resume
                </button>

            </aside>

        </div>
    )
}

export default Interview