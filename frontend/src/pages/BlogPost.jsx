import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PortableText } from '@portabletext/react';
import { FiArrowLeft } from 'react-icons/fi';
import { client, urlFor } from '../utils/sanity';

const ptComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      return (
        <img
          alt={value.alt || ' '}
          loading="lazy"
          src={urlFor(value).url()}
          className="my-10 rounded-2xl w-full object-cover shadow-md"
        />
      );
    },
    youtube: ({ value }) => {
      const { url } = value;
      if (!url) return null;
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      const videoId = (match && match[2].length === 11) ? match[2] : null;

      if (!videoId) return null;

      return (
        <div className="aspect-video w-full my-10 rounded-2xl overflow-hidden shadow-md">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      );
    },
    code: ({ value }) => {
      return (
        <pre className="my-8 bg-slate-900 text-slate-50 p-6 rounded-xl overflow-x-auto shadow-md">
          <code>{value.code}</code>
        </pre>
      );
    }
  },
  block: {
    h1: ({children}) => <h1 className="text-4xl font-bold mt-14 mb-6 text-slate-900 tracking-tight">{children}</h1>,
    h2: ({children}) => <h2 className="text-3xl font-bold mt-12 mb-5 text-slate-900 tracking-tight">{children}</h2>,
    h3: ({children}) => <h3 className="text-2xl font-bold mt-10 mb-4 text-slate-900 tracking-tight">{children}</h3>,
    normal: ({children}) => <p className="mb-6 leading-relaxed text-slate-700 text-[1.125rem]">{children}</p>,
    blockquote: ({children}) => <blockquote className="border-l-4 border-brand-500 pl-6 italic my-8 text-xl text-slate-600 bg-slate-50 py-4 pr-4 rounded-r-xl">{children}</blockquote>,
  },
  list: {
    bullet: ({children}) => <ul className="list-disc pl-6 mb-6 space-y-3 text-slate-700 text-[1.125rem] marker:text-brand-500">{children}</ul>,
    number: ({children}) => <ol className="list-decimal pl-6 mb-6 space-y-3 text-slate-700 text-[1.125rem] marker:text-brand-500">{children}</ol>,
  },
  marks: {
    link: ({children, value}) => {
      const rel = !value.href?.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a href={value.href} rel={rel} className="text-brand-600 font-medium hover:text-brand-700 underline decoration-brand-300 decoration-2 underline-offset-4 transition-colors">
          {children}
        </a>
      )
    },
  },
};

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "post" && slug.current == $slug][0] {
          title,
          "name": author->name,
          "authorImage": author->image,
          mainImage,
          publishedAt,
          body
        }`,
        { slug }
      )
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch(console.error);
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
    <article className="pt-24 pb-32">
      {/* Header */}
      <header className="site-container max-w-4xl text-center mb-16">
        <Link to="/blog" className="inline-flex items-center text-brand-600 hover:text-brand-700 mb-10 font-medium transition-colors">
          <FiArrowLeft className="mr-2" /> Back to Blog
        </Link>
        <p className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-5">
          {new Date(post.publishedAt).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-10">
          {post.title}
        </h1>
        {post.name && (
          <div className="flex items-center justify-center gap-4">
            {post.authorImage ? (
              <img 
                src={urlFor(post.authorImage).width(56).height(56).url()} 
                alt={post.name} 
                className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold text-xl shadow-inner">
                {post.name.charAt(0)}
              </div>
            )}
            <div className="text-left">
              <span className="block font-bold text-slate-900">{post.name}</span>
              <span className="block text-sm text-slate-500">Author</span>
            </div>
          </div>
        )}
      </header>

      {/* Main Image */}
      {post.mainImage && (
        <div className="site-container max-w-5xl mb-20">
          <div className="aspect-[21/9] w-full rounded-3xl overflow-hidden shadow-2xl ring-1 ring-slate-900/5">
            <img
              src={urlFor(post.mainImage).url()}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="site-container max-w-3xl mx-auto">
        <div className="prose-container">
          <PortableText value={post.body} components={ptComponents} />
        </div>
      </div>
    </article>
  );
}
