import React from 'react';

const AppPosts = () => {
  const posts = [
    {
      id: 1,
      author: 'Aarav Mehta',
      authorPhoto: 'https://randomuser.me/api/portraits/men/32.jpg',
      title: 'શબ્દોની શક્તિ (Power of Words)',
      content: `
        શબ્દોનું છે અનોખું જાદૂ,\n
        દિલને સ્પર્શે, મનને રેડે,\n
        ભાવના વહે છે શબ્દોમાં,\n
        કવિતા જીવંત બને.\n
        — આરવ મહેતા
      `,
      date: '2024-01-15',
      likes: 24,
      comments: 8,
      tags: ['Gujarati', 'Poetry']
    },
    {
      id: 2,
      author: 'Priya Shah',
      authorPhoto: 'https://randomuser.me/api/portraits/women/44.jpg',
      title: 'ज़िन्दगी की प्रेरणा (Inspiration of Life)',
      content: `
        हर सुबह एक नई किरण,\n
        हर साँझ एक नई कहानी,\n
        जीवन के हर मोड़ पर,\n
        कविता बनती है निशानी।\n
        — प्रिया शाह
      `,
      date: '2024-01-12',
      likes: 31,
      comments: 12,
      tags: ['Hindi', 'Life']
    },
    {
      id: 3,
      author: 'Rahul Desai',
      authorPhoto: 'https://randomuser.me/api/portraits/men/65.jpg',
      title: 'The Stage and Beyond',
      content: `
        Under the lights, my fears dissolve,\n
        Each line a puzzle to resolve,\n
        The crowd and I, a single breath,\n
        Alive in verse, defying death.\n
        — Rahul Desai
      `,
      date: '2024-01-10',
      likes: 19,
      comments: 5,
      tags: ['Performance', 'Live Poetry']
    },
    {
      id: 4,
      author: 'Sneha Patel',
      authorPhoto: 'https://randomuser.me/api/portraits/women/68.jpg',
      title: 'માતૃભાષા (Mother Tongue)',
      content: `
        માતૃભાષા છે મીઠી,\n
        માતૃભાષા છે પ્રાણ,\n
        શબ્દોમાં વસે છે ઘર,\n
        કવિતા છે એની શાન।\n
        — સ્નેહા પટેલ
      `,
      date: '2024-01-08',
      likes: 28,
      comments: 9,
      tags: ['Gujarati', 'Culture']
    },
    {
      id: 5,
      author: 'Vikram Joshi',
      authorPhoto: 'https://randomuser.me/api/portraits/men/77.jpg',
      title: 'कविता की विरासत (Legacy of Poetry)',
      content: `
        शब्दों की विरासत, भावों का संसार,\n
        हर युग में गूंजे, कवि का पुकार।\n
        समय बदलता जाए, भाव वही रहे,\n
        कविता की दुनिया, सदा नई रहे।\n
        — विक्रम जोशी
      `,
      date: '2024-01-05',
      likes: 22,
      comments: 7,
      tags: ['Hindi', 'Legacy']
    },
    {
      id: 6,
      author: 'Kavya Trivedi',
      authorPhoto: 'https://randomuser.me/api/portraits/women/12.jpg',
      title: 'Storytelling Through Rhyme',
      content: `
        Once upon a moonlit night,\n
        Stories danced in silver light,\n
        Rhymes that twirl and softly land,\n
        Magic spun by a poet's hand.\n
        — Kavya Trivedi
      `,
      date: '2024-01-03',
      likes: 35,
      comments: 15,
      tags: ['Children', 'Storytelling']
    }
  ];

  return (
    <section className="posts-section">
      <div className="posts-header mb-10 px-4 md:px-12">
        <h2 className="posts-title">Community Posts</h2>
        <div className="posts-title-underline posts-title-underline-animated"></div>
        <div className="posts-subheading">Discover thoughts, insights, and stories from our talented poets and performers</div>
      </div>
      <div className="events-tile-header-divider"></div>
      
      <div className="max-w-4xl mx-auto px-4 md:px-0">
        <div className="posts-grid space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="post-card group relative overflow-hidden p-0 border border-[#e0e7ff] rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300">
              <div className="post-accent-bar"></div>
              <div className="p-6 md:p-8">
                <div className="post-header flex items-center gap-4 mb-4">
                  <img 
                    src={post.authorPhoto} 
                    alt={post.author} 
                    className="post-author-photo w-12 h-12 rounded-full object-cover border-2 border-indigo-100"
                  />
                  <div className="flex-1">
                    <h3 className="post-author-name font-semibold text-indigo-800">{post.author}</h3>
                    <p className="post-date text-sm text-gray-500">{post.date}</p>
                  </div>
                </div>
                
                <h4 className="post-title text-xl font-bold text-gray-800 mb-3">{post.title}</h4>
                <p className="post-content text-gray-600 leading-relaxed mb-4">{post.content}</p>
                
                <div className="post-tags flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span key={tag} className="post-tag bg-indigo-100 text-indigo-700 font-medium px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="post-actions flex items-center gap-6 text-sm text-gray-500">
                  <button className="post-action flex items-center gap-2 hover:text-indigo-600 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {post.likes}
                  </button>
                  <button className="post-action flex items-center gap-2 hover:text-indigo-600 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    {post.comments}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .posts-section {
          background: #f8fafc;
          padding-top: 4.5rem;
          padding-bottom: 4.5rem;
          font-family: 'Inter', 'Segoe UI', sans-serif;
        }
        .posts-header {
          margin: 0 auto 2.5rem auto;
          text-align: left;
        }
        .posts-title {
          font-size: 2.3rem;
          font-weight: 800;
          color: #232046;
          letter-spacing: -0.01em;
        }
        .posts-title-underline {
          width: 120px;
          height: 4px;
          background: linear-gradient(90deg, #6366f1 60%, #818cf8 100%);
          border-radius: 2px;
          margin-bottom: 1.2rem;
          margin-top: 0.1rem;
          box-shadow: 0 2px 12px #6366f144;
          border: 1.5px solid rgba(255,255,255,0.35);
        }
        .posts-title-underline-animated {
          transform: scaleX(0);
          transform-origin: left;
          animation: postsUnderlineGrow 1.1s cubic-bezier(0.4,0,0.2,1) 0.2s forwards;
        }
        @keyframes postsUnderlineGrow {
          0% {
            transform: scaleX(0);
            opacity: 0.2;
          }
          60% {
            opacity: 1;
          }
          100% {
            transform: scaleX(1);
            opacity: 1;
          }
        }
        .posts-subheading {
          color: #6366f1;
          font-size: 1.13rem;
          font-weight: 400;
          line-height: 1.7;
          margin-bottom: 1.2rem;
          max-width: 540px;
          letter-spacing: 0.01em;
        }
        .events-tile-header-divider {
          max-width: 1600px;
          margin: 0 auto 2.5rem auto;
          height: 1.5px;
          background: linear-gradient(90deg, #e0e7ff 0%, #6366f1 50%, #e0e7ff 100%);
          opacity: 0.18;
          border-radius: 1px;
        }
        .post-card {
          background: linear-gradient(120deg, #fff 80%, #f1f5ff 100%);
          border-radius: 1.5rem;
          box-shadow: 0 2px 12px #6366f111;
          transition: box-shadow 0.18s, transform 0.18s, border 0.18s;
          border: 1.5px solid #e0e7ff;
          position: relative;
        }
        .post-card:hover, .post-card:focus-within {
          box-shadow: 0 8px 32px #6366f144;
          border-color: #6366f1;
          // transform: translateY(-4px) scale(1.02);
        }
        .post-accent-bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #6366f1 0%, #818cf8 100%);
          z-index: 2;
        }
        .post-author-photo {
          width: 3rem;
          height: 3rem;
          object-fit: cover;
          border-radius: 50%;
          border: 2px solid #e0e7ff;
          box-shadow: 0 2px 8px #6366f122;
        }
        .post-author-name {
          color: #232046;
          font-size: 1.1rem;
          font-weight: 600;
        }
        .post-date {
          color: #6b7280;
          font-size: 0.9rem;
        }
        .post-title {
          color: #232046;
          font-size: 1.3rem;
          font-weight: 700;
        }
        .post-content {
          color: #6366f1;
          font-size: 1.01rem;
          font-weight: 400;
          line-height: 1.6;
        }
        .post-tag {
          background: #eef2ff;
          color: #6366f1;
          font-weight: 600;
          border-radius: 1rem;
          padding: 0.3rem 1.1rem;
          font-size: 0.93rem;
          letter-spacing: 0.01em;
          box-shadow: 0 1px 4px #6366f111;
        }
        .post-action {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: #6b7280;
          transition: color 0.2s ease;
        }
        .post-action:hover {
          color: #6366f1;
        }
      `}</style>
    </section>
  );
};

export default AppPosts; 