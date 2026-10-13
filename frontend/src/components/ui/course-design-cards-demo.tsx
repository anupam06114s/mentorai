import React from 'react';
import Card from '@/components/ui/course-design-cards';
import '@/index.css';

const CourseDesignCardsDemo: React.FC = () => {
  const cardData = [
    {
      id: 1,
      colorClass: 'green',
      date: 'Feb 2, 2026',
      title: 'Full Stack Engineer',
      description: 'ISRO Telemetry & Mission Control Software Systems',
      progressPercent: '95%',
      progressValue: '95% Match',
      imgSrc1: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      imgAlt1: 'Recruiter 1',
      imgSrc2: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      imgAlt2: 'Recruiter 2',
      countdownText: '2 days left',
      applyUrl: 'https://www.isro.gov.in/careers',
      company: 'ISRO',
      location: 'Bengaluru',
      workMode: 'On-site',
      sector: 'government',
      salary: '₹56k - ₹1.77L/mo',
      skills: ['Python', 'C++', 'Algorithms', 'FastAPI'],
    },
    {
      id: 2,
      colorClass: 'orange',
      date: 'Feb 05, 2026',
      title: 'AI / ML Research Engineer',
      description: 'Anthropic Claude Model Scale & Optimization',
      progressPercent: '92%',
      progressValue: '92% Match',
      imgSrc1: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
      imgAlt1: 'Recruiter 3',
      imgSrc2: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      imgAlt2: 'Recruiter 4',
      countdownText: 'Active Now',
      applyUrl: 'https://www.arbeitnow.com',
      company: 'Anthropic',
      location: 'Remote',
      workMode: 'Remote',
      sector: 'private',
      salary: '₹35 - 55 LPA',
      skills: ['PyTorch', 'Transformers', 'Python', 'LLM'],
    },
    {
      id: 3,
      colorClass: 'red',
      date: 'March 03, 2026',
      title: 'Scientist B (Cyber & Cloud)',
      description: 'National Informatics Centre Digital Public Infrastructure',
      progressPercent: '94%',
      progressValue: '94% Match',
      imgSrc1: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80',
      imgAlt1: 'Recruiter 5',
      imgSrc2: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      imgAlt2: 'Recruiter 6',
      countdownText: '3 weeks left',
      applyUrl: 'https://www.calicut.nielit.in/nic21/',
      company: 'NIC / MeitY',
      location: 'New Delhi',
      workMode: 'Hybrid',
      sector: 'government',
      salary: '₹56k - ₹1.77L/mo',
      skills: ['Cloud', 'PostgreSQL', 'Docker', 'Linux'],
    },
    {
      id: 4,
      colorClass: 'blue',
      date: 'March 08, 2026',
      title: 'Senior Frontend Architect',
      description: 'Next.js 15 & React 19 Design Systems',
      progressPercent: '96%',
      progressValue: '96% Match',
      imgSrc1: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80',
      imgAlt1: 'Erik Longman',
      imgSrc2: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80',
      imgAlt2: 'Jane Doe',
      countdownText: 'Closing Soon',
      applyUrl: 'https://remotive.com',
      company: 'Vercel Platform',
      location: 'Worldwide Remote',
      workMode: 'Remote',
      sector: 'private',
      salary: '$85k - $140k',
      skills: ['React', 'TypeScript', 'Tailwind', 'Next.js'],
    },
  ];

  return (
    <section className="job-cards-grid p-6">
      {cardData.map((card) => (
        <Card key={card.id} data={card} />
      ))}
    </section>
  );
};

export default CourseDesignCardsDemo;
