import { MetadataRoute } from 'next';
import { blogPosts } from '@/data/blog-posts';
import indexData from '@/data/names/us/index.json';

const BASE_URL = 'https://nameeng.com';

export default function sitemap(): MetadataRoute.Sitemap {
    // 1. Static Routes
    const staticRoutes = [
        '',
        '/about',
        '/how-to-use',
        '/faq',
        '/passport-guide',
        '/romanization-guide',
        '/blog',
        '/tools',
        '/tools/name-generator',
        '/tools/name-checker',
        '/tools/surname-frequency',
        '/names',
        '/names/us',
        '/names/us/popular',
        '/names/us/rarity',
        '/names/us/trends',
    ];

    const staticEntries = staticRoutes.map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: (route === '' || route === '/blog' || route === '/tools' ? 'weekly' : 'monthly') as any,
        priority: route === '' ? 1.0 : 0.8,
    }));

    // 2. Blog Post Routes
    const blogEntries = blogPosts.map((post) => ({
        url: `${BASE_URL}/blog/${post.id}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as any,
        priority: 0.7,
    }));

    // 3. Names Routes (Dynamic Top 1000)
    // indexData is already sorted by popularity (lr), we just take top N.
    // For sitemap size management, we'll index top 1000.
    const topNames = indexData.slice(0, 1000).map((entry) => ({
        url: `${BASE_URL}/names/us/${encodeURIComponent(entry.n)}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as any,
        priority: 0.6,
    }));

    // 4. Surname Frequency Routes (Dynamic)
    // Note: For now, we only include the tool main page. 
    // If we want to include individual surnames, we would fetch them from the JSON.
    // Given the large number of surnames, we might want to limit this or use a separate logic.
    // For now, let's keep it simple as the original manual sitemap didn't have individual surnames.

    return [...staticEntries, ...blogEntries, ...topNames];
}
