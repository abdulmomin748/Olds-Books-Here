import React from 'react';
import img1 from '../../../assets/images (1).jpg'
import img2 from '../../../assets/images (2).jpg'
import img3 from '../../../assets/images.jpg'
const RecentPost = () => {
    return (
        <div className='py-28'>
            <h2 className='text-5xl font-semibold text-center mb-10'>Recent Blog Posts</h2>
            <div className='grid gap-6 lg:grid-cols-3 grid-cols-1 md:grid-cols-2'>
            <div className="max-w-lg mx-auto p-4 shadow-md dark:bg-gray-900 dark:text-gray-100">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <img src={img1} alt="" className="block object-cover object-center w-full rounded-md h-72 dark:bg-gray-500" />
                        <div className="flex items-center text-xs">
                            <span>6 min ago</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <a rel="noopener noreferrer" href="#" className="block">
                            <h3 className="text-xl font-semibold dark:text-violet-400">Top 10 Questions about Starting a Used Book Selling Business in 2023</h3>
                        </a>
                        <p className="leading-snug dark:text-gray-400">With one simple search we connect you to various companies buying used textbooks online. By comparing textbook buyback prices, we ensure you receive the best prices for your textbooks. Shipping is free and you're often paid the same day your book is received.</p>
                    </div>
                </div>
            </div>
            <div className="max-w-lg  mx-auto p-4 shadow-md dark:bg-gray-900 dark:text-gray-100">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <img src={img2} alt="" className="block object-cover object-center w-full rounded-md h-72 dark:bg-gray-500" />
                        <div className="flex items-center text-xs">
                            <span>6 min ago</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <a rel="noopener noreferrer" href="#" className="block">
                            <h3 className="text-xl font-semibold dark:text-violet-400">Tips on How to Prepare Your Book Business for a Recession</h3>
                        </a>
                        <p className="leading-snug dark:text-gray-400">After you've searched your ISBN, we display a list of companies with offers for your book. BookScouter users can rate and review each vendor with our feedback system. We display this rating next to each vendor so you can sell your books with confidence.</p>
                    </div>
                </div>
            </div>
            <div className="max-w-lg  mx-auto p-4 shadow-md dark:bg-gray-900 dark:text-gray-100">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <img src={img3} alt="" className="block object-cover object-center w-full rounded-md h-72 dark:bg-gray-500" />
                        <div className="flex items-center text-xs">
                            <span>6 min ago</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <a rel="noopener noreferrer" href="#" className="block">
                            <h3 className="text-xl font-semibold dark:text-violet-400">9 Most Searched Linear Algebra Books</h3>
                        </a>
                        <p className="leading-snug dark:text-gray-400">After you've searched your ISBN, we display a list of companies with offers for your book. BookScouter users can rate and review each vendor with our feedback system. We display this rating next to each vendor so you can sell your books with confidence.</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default RecentPost;