'use client';

import { ReactNode, useState } from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

type BlogPost = {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    category: string;
    tags: string[];
};

const CATEGORIES = ['전체', '실용정보', '해외생활', '비즈니스', '언어학', '역사', '안전가이드'];

export default function BlogFilterList({ posts, adSlot }: { posts: BlogPost[], adSlot?: ReactNode }) {
    const [activeCategory, setActiveCategory] = useState('전체');

    const filteredPosts = activeCategory === '전체'
        ? posts
        : posts.filter((post) => post.category === activeCategory);

    return (
        <div className="space-y-8">
            {/* 카테고리 필터 */}
            <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        aria-pressed={activeCategory === cat}
                        className={`px-4 py-2 text-sm font-medium rounded-full cursor-pointer transition-colors ${activeCategory === cat
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {adSlot}

            {/* 블로그 포스트 목록 */}
            <div className="space-y-4">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <a
                            key={post.id}
                            href={`/blog/${post.id}`}
                            className="block bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-100 transition-all group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-md">
                                    {post.category}
                                </span>
                                <div className="flex items-center gap-4 text-gray-400 text-sm">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar size={14} />
                                        <span>{post.date}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Clock size={14} />
                                        <span>{post.readTime}</span>
                                    </div>
                                </div>
                            </div>

                            <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                {post.title}
                            </h2>
                            <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                                {post.excerpt}
                            </p>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    {post.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-md"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                    <ArrowRight size={16} />
                                </div>
                            </div>
                        </a>
                    ))
                ) : (
                    <div className="text-center py-12 text-gray-500 bg-white rounded-2xl border border-gray-100">
                        해당 카테고리의 글이 없습니다.
                    </div>
                )}
            </div>
        </div>
    );
}
