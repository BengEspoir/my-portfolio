import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FiCalendar, FiClock, FiArrowRight } from 'react-icons/fi';
import { supabase } from '../utils/supabase';
import SectionTitle from '../components/SectionTitle';
import PageTransition from '../components/PageTransition';
import { BlogCardSkeleton } from '../components/Skeleton';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('id, title, slug, cover_image, created_at, excerpt, category, reading_time')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setPosts(data || []);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return (
    <PageTransition>
      <Helmet>
        <title>Blog | Beng Espoir</title>
        <meta name="description" content="Insights on product design, software engineering, and the intersection of creativity and technology." />
      </Helmet>

      <div className="site-container py-12 md:py-20">
        <SectionTitle
          title="Insights & Articles"
          subtitle="Sharing my thoughts on design systems, frontend development, and product strategy."
          align="center"
        />

        {loading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map(i => <BlogCardSkeleton key={i} />)}
          </div>
        ) : posts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-soft transition-all hover:border-brand-100 hover:shadow-xl"
              >
                <Link to={`/blog/${post.slug}`} className="relative block aspect-[16/9] overflow-hidden">
                  <img
                    src={post.cover_image || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop"}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute left-4 top-4">
                    <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900 backdrop-blur-sm">
                      {post.category}
                    </span>
                  </div>
                </Link>

                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-center gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <FiCalendar />
                      <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiClock />
                      <span>{post.reading_time || "5 min"} read</span>
                    </div>
                  </div>

                  <h3 className="mb-3 text-xl font-bold text-slate-900 transition-colors group-hover:text-brand-600">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="mb-6 line-clamp-3 flex-1 text-slate-600">
                    {post.excerpt}
                  </p>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="mt-auto inline-flex items-center gap-2 font-semibold text-brand-600 transition-gap hover:gap-3"
                  >
                    Read Article <FiArrowRight />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="flex h-60 items-center justify-center rounded-3xl border-2 border-dashed border-slate-100 bg-slate-50 text-center">
            <p className="text-lg text-slate-500">No articles published yet. Check back soon!</p>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
