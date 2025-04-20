'use client';

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import ImageCarousel from './components/ImageCarousel';
import './notices.css';

const NoticesPage: React.FC = () => {
  const images = [
    'https://jerusalemengg.ac.in/images/Web-Banner_3.jpg',
    'https://jerusalemengg.ac.in/images/WhatsApp%20Image%202025-03-19%20at%2011.16.55%20AM.jpeg',
    'https://jerusalemengg.ac.in/images/Web-banner-jce.jpg',
    'https://jerusalemengg.ac.in/images/JEC-Web-Banner1.jpg',
    'https://jerusalemengg.ac.in/upload/Web-Slider2.png',
    'https://jerusalemengg.ac.in/images/WhatsApp%20Image%202025-02-09%20at%2011.49.16%20AM%20(2).jpeg',
    'https://jerusalemengg.ac.in/images/Hactivators%20(1).jpeg',
  ];

  const updates = [
    {
      title: 'The college is accredited with A Grade by NAAC',
      link: '#',
      isNew: true,
    },
    {
      title: 'Committee for monitoring students grievance',
      link: '#',
      isNew: true,
    },
    {
      title: 'Grievances/complaints related to conduct of examination',
      link: '#',
      isNew: false,
    },
    {
      title: 'Faculty Research Award Photos',
      link: '#',
      isNew: false,
    },
    {
      title: "International Women's Day Celebration - Photos",
      link: '#',
      isNew: false,
    },
  ];

  return (
    <div className="container p-4 bg-gray-100">
      <Head>
        <title>Notices & Announcements</title>
        <meta name="description" content="College Notices and Announcements" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="nav">
        <Link href="/">
          <img src="/jce-logo.png" alt="JCE Logo" className="logo" />
        </Link>
      </header>

      <section className="notices-section">
        <h2 className="text-2xl font-bold mb-4">Notices & Announcements</h2>
        
        <ImageCarousel images={images} />

        <div className="notices-content">
          <h3 className="text-xl font-semibold mb-3">Latest Updates</h3>
          <div className="bg-white p-4 rounded shadow">
            <ul className="space-y-3">
              {updates.map((update, index) => (
                <li key={index} className="flex items-start">
                  {update.isNew && (
                    <span className="inline-block px-2 py-1 text-xs font-semibold bg-red-100 text-red-800 rounded mr-2 mt-1">
                      NEW
                    </span>
                  )}
                  <Link href={update.link} className="text-blue-600 hover:text-blue-800 hover:underline">
                    {update.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NoticesPage; 