import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { client, urlFor } from '../utils/sanity';
import SectionTitle from '../components/SectionTitle';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "post"] | order(publishedAt desc) {
          _id,
          title,
          slug,
          mainImage,
          publishedAt,
          "excerpt": array::join(string::split((pt::text(body)), "")[0..120], "") + "..."
        }`
      )
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  return (
    <section className="py-20 lg:py-32">
      <div className="site-container">
        <SectionTitle
          subtitle="My Journal"
          title="Insights & Thoughts"
          description="A collection of my thoughts on web development, design, and building products."
        />

        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-500 border-t-transparent"></div>
          </div>
        ) : posts.length > 0 ? (
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post._id}
                to={`/blog/${post.slug.current}`}
                className="card-surface group flex flex-col overflow-hidden rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-xl"
              >
                {post.mainImage && (
                  <div className="aspect-video w-full overflow-hidden bg-slate-100">
                    <img
                      src={urlFor(post.mainImage).url()}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <p className="mb-2 text-xs font-medium text-brand-500">
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                  <h3 className="mb-3 text-xl font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-auto text-sm leading-relaxed text-slate-600">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-16 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
            <h3 className="text-lg font-medium text-slate-900">No posts yet</h3>
            <p className="mt-2 text-slate-500">Check back later for new articles!</p>
          </div>
        )}
      </div>
    </section>
  );
}
