import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import ReactMarkdown from 'react-markdown';
import { FiArrowLeft } from 'react-icons/fi';
import { supabase } from '../utils/supabase';
import PageTransition from "../components/PageTransition";

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .where('slug', 'eq', slug)
          .single();

        if (error) {
          // Fallback if the .where chain isn't preferred by the client version
          const { data: data2, error: error2 } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('slug', slug)
            .single();
          
          if (error2) throw error2;
          setPost(data2);
        } else {
          setPost(data);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="site-container py-32 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Post not found</h1>
        <p className="text-slate-600 mb-8">The article you're looking for doesn't exist or has been removed.</p>
        <Link to="/blog" className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors">
          <FiArrowLeft className="mr-2" /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <PageTransition>
      <Helmet>
        <title>{`${post.title} | Blog - Beng Espoir`}</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={`${post.title} | Blog - Beng Espoir`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.cover_image_url} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <article className="pt-24 pb-32">
      {/* Header */}
      <header className="site-container max-w-4xl text-center mb-16">
        <Link to="/blog" className="inline-flex items-center text-brand-600 hover:text-brand-700 mb-10 font-medium transition-colors">
          <FiArrowLeft className="mr-2" /> Back to Blog
        </Link>
        <p className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-5">
          {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-10">
          {post.title}
        </h1>
        {post.author_name && (
          <div className="flex items-center justify-center gap-4">
            {post.author_image_url ? (
              <img 
                src={post.author_image_url} 
                alt={post.author_name} 
                className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold text-xl shadow-inner">
                {post.author_name.charAt(0)}
              </div>
            )}
            <div className="text-left">
              <span className="block font-bold text-slate-900">{post.author_name}</span>
              <span className="block text-sm text-slate-500">Author • {post.reading_time || "5 min"} read</span>
            </div>
          </div>
        )}
      </header>

      {/* Main Image */}
      {post.cover_image_url && (
        <div className="site-container max-w-5xl mb-20">
          <div className="aspect-[21/9] w-full rounded-3xl overflow-hidden shadow-2xl ring-1 ring-slate-900/5">
            <img
              src={post.cover_image_url}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="site-container max-w-3xl mx-auto">
        <div className="prose-container blog-markdown">
          <ReactMarkdown
            components={{
              h1: ({children}) => <h1 className="text-4xl font-bold mt-14 mb-6 text-slate-900 tracking-tight">{children}</h1>,
              h2: ({children}) => <h2 className="text-3xl font-bold mt-12 mb-5 text-slate-900 tracking-tight">{children}</h2>,
              h3: ({children}) => <h3 className="text-2xl font-bold mt-10 mb-4 text-slate-900 tracking-tight">{children}</h3>,
              p: ({children}) => <p className="mb-6 leading-relaxed text-slate-700 text-[1.125rem]">{children}</p>,
              blockquote: ({children}) => <blockquote className="border-l-4 border-brand-500 pl-6 italic my-8 text-xl text-slate-600 bg-slate-50 py-4 pr-4 rounded-r-xl">{children}</blockquote>,
              ul: ({children}) => <ul className="list-disc pl-6 mb-6 space-y-3 text-slate-700 text-[1.125rem] marker:text-brand-500">{children}</ul>,
              ol: ({children}) => <ol className="list-decimal pl-6 mb-6 space-y-3 text-slate-700 text-[1.125rem] marker:text-brand-500">{children}</ol>,
              a: ({children, href}) => (
                <a href={href} target="_blank" rel="noreferrer" className="text-brand-600 font-medium hover:text-brand-700 underline decoration-brand-300 decoration-2 underline-offset-4 transition-colors">
                  {children}
                </a>
              ),
              code: ({children}) => (
                <pre className="my-8 bg-slate-900 text-slate-50 p-6 rounded-xl overflow-x-auto shadow-md">
                  <code>{children}</code>
                </pre>
              ),
              img: ({src, alt}) => (
                <img src={src} alt={alt} className="my-10 rounded-2xl w-full object-cover shadow-md" />
              )
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </div>
    </article>
    </PageTransition>
  );
}
