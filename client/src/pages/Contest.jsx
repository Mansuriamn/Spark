import React, { useState, useEffect, use } from 'react';
import {
  FaTrophy,
  FaCode,
  FaFlask,
  FaUsers,
  FaCalendarAlt,
  FaSearch,
  FaChevronDown,
  FaMedal,
  FaFilter,
  FaTimes
} from 'react-icons/fa';
import Footer from '../components/Footer';
import axios from 'axios';

const Contest = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

   const [contestData, setContestData] = useState([]);

  useEffect(() => {
    const fetchContestData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/contests");
        if (response.data && Array.isArray(response.data)) {
          setContestData(response.data);
          // console.log(response.data);
        } else {
          console.error("No contest data returned");
        }
      } catch (error) {
        console.error("Error fetching contest sessions:", error);
      }
    };

    fetchContestData();
  }, []);

  const categories = [
    { id: 'featured', label: 'Featured', color: 'bg-purple-100 text-purple-800' },
    { id: 'research', label: 'Research', color: 'bg-green-100 text-green-800' },
    { id: 'code', label: 'Code', color: 'bg-blue-100 text-blue-800' },
    { id: 'hackathon', label: 'Hackathon', color: 'bg-orange-100 text-orange-800' },
    { id: 'ai', label: 'AI', color: 'bg-red-100 text-red-800' }
  ];

  


  const toggleCategory = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const filteredContests = contestData.filter(contest => {
    //by serach
    const matchesSearch = searchTerm === '' ||
      contest.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contest.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contest.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    //category
    const matchesCategory = selectedCategories.length === 0 ||
      selectedCategories.includes(contest.type);

    //by active tab
    const matchesActiveFilter = activeFilter === 'all' || contest.type === activeFilter;

    return matchesSearch && matchesCategory && matchesActiveFilter;
  });

  // reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setActiveFilter('all');
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isFilterOpen && !e.target.closest('.filter-panel')) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isFilterOpen]);
 



  return (
    <>
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div className="mb-6 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text animate-fadeIn">
                Student Competitions Hub
              </h1>
              <p className="text-gray-600 mt-2 max-w-xl animate-fadeIn animation-delay-100">
                Discover and participate in the most exciting tech challenges of 2025. Showcase your skills and win amazing prizes!
              </p>
            </div>

            <div className="flex w-full md:w-auto space-x-3 animate-fadeIn animation-delay-200">
              <div className="relative flex-1 md:flex-none md:w-80">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search competitions..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
              </div>
              <button
                onClick={() => setIsFilterOpen(true)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-all flex items-center animate-fadeIn animation-delay-300"
              >
                <FaFilter className="mr-2" />
                Filters
              </button>
            </div>
          </header>

          {/* filter Summary */}
          {(searchTerm || selectedCategories.length > 0 || activeFilter !== 'all') && (
            <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200 shadow-sm flex flex-wrap items-center animate-fadeIn">
              <span className="text-gray-700 font-medium mr-3">Active filters:</span>

              {searchTerm && (
                <div className="flex items-center bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full mr-2 mb-2">
                  <span className="mr-1">Search: "{searchTerm}"</span>
                  <button
                    onClick={() => setSearchTerm('')}
                    className="text-indigo-500 hover:text-indigo-700"
                  >
                    <FaTimes />
                  </button>
                </div>
              )}

              {selectedCategories.length > 0 && selectedCategories.map(catId => {
                const category = categories.find(c => c.id === catId);
                return (
                  <div key={catId} className="flex items-center bg-purple-50 text-purple-700 px-3 py-1 rounded-full mr-2 mb-2">
                    <span className="mr-1">{category.label}</span>
                    <button
                      onClick={() => toggleCategory(catId)}
                      className="text-purple-500 hover:text-purple-700"
                    >
                      <FaTimes />
                    </button>
                  </div>
                );
              })}

              {activeFilter !== 'all' && (
                <div className="flex items-center bg-green-50 text-green-700 px-3 py-1 rounded-full mr-2 mb-2">
                  <span className="mr-1">Tab: {categories.find(c => c.id === activeFilter)?.label || activeFilter}</span>
                  <button
                    onClick={() => setActiveFilter('all')}
                    className="text-green-500 hover:text-green-700"
                  >
                    <FaTimes />
                  </button>
                </div>
              )}

              <button
                onClick={resetFilters}
                className="ml-auto text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 animate-fadeIn animation-delay-300">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeFilter === 'all'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
            >
              All Contests
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeFilter === category.id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Stats Cards */}
         {contestData.length > 0 ? (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
    {contestData.map((contest, index) => {
      const formattedTime = new Date(contest.time).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      return (
        <div
          key={contest._id}
          className="contest-card bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 relative group animate-floatIn"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>

          <div className="p-6 relative z-10 h-full flex flex-col">
            {/* Icon and Badge */}
            <div className="flex justify-between items-start mb-4">
              <div className="w-14 h-14 rounded-lg bg-white border border-gray-200 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {/* Optional icon here */}
              </div>
              <div className="flex">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800`}>
                  {contest.type.charAt(0).toUpperCase() + contest.type.slice(1)}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-700 transition-colors mb-2">
                {contest.name}
              </h3>
              <p className="text-gray-600 mb-4">{contest.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs">
                  {contest.topic}
                </span>
              </div>

              <div className="flex justify-between items-center mb-4">
                <div className="text-sm text-gray-500 flex items-center">
                  <FaUsers className="mr-1.5" />
                  <span>{contest.registeredUsers.length} Entrants</span>
                </div>
                <div className="text-sm text-gray-500 flex items-center">
                  <FaCalendarAlt className="mr-1.5" />
                  <span>{formattedTime}</span>
                </div>
              </div>
            </div>

            {/* prize and CTA */}
            <div className="border-t border-gray-100 group-hover:border-indigo-100 transition-colors pt-4 mt-4">
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {contest.prize}
                </div>
                <button className="px-4 py-2 bg-purple-500 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:-translate-y-0.5 shadow-md hover:shadow-lg text-sm">
                  Participate
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    })}
  </div>
) : (
  <div className="bg-white rounded-xl shadow-sm p-12 text-center mb-12 animate-fadeIn">
    <div className="text-5xl text-gray-300 mb-4">🔍</div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">No competitions found</h3>
    <p className="text-gray-600 max-w-md mx-auto">
      We couldn't find any competitions matching your filters. Try adjusting your search or filters.
    </p>
    <button
      onClick={resetFilters}
      className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
    >
      Reset Filters
    </button>
  </div>
)}


          {/* View More */}
          <div className="text-center">
            <button className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-all inline-flex items-center group animate-pulse">
              <span>View More Competitions</span>
              <FaChevronDown className="ml-2 group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {isFilterOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="filter-panel bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800">Filter Competitions</h2>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes size={20} />
                  </button>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">By Category</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {categories.map(category => (
                      <button
                        key={category.id}
                        onClick={() => toggleCategory(category.id)}
                        className={`px-4 py-3 rounded-lg text-left transition-all ${selectedCategories.includes(category.id)
                            ? `${category.color} border border-transparent`
                            : 'bg-white border border-gray-300 hover:bg-gray-50'
                          }`}
                      >
                        {category.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">By Prize Amount</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'high', label: 'High Prize ($500k+)' },
                      { id: 'medium', label: 'Medium Prize ($100k-$500k)' },
                      { id: 'low', label: 'Low Prize (<$100k)' },
                    ].map(prize => (
                      <button
                        key={prize.id}
                        className="px-4 py-3 bg-white border border-gray-300 rounded-lg text-left hover:bg-gray-50 transition-colors"
                      >
                        {prize.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">By Time Left</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'week', label: '< 1 Week' },
                      { id: 'month', label: '< 1 Month' },
                      { id: 'months', label: '1-3 Months' },
                      { id: 'long', label: '> 3 Months' },
                    ].map(time => (
                      <button
                        key={time.id}
                        className="px-4 py-3 bg-white border border-gray-300 rounded-lg text-left hover:bg-gray-50 transition-colors"
                      >
                        {time.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => setSelectedCategories([])}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                  >
                    Clear Filters
                  </button>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
      <Footer></Footer>
    </>
  );
};

export default Contest;