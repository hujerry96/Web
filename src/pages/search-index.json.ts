import { getCollection } from 'astro:content';
import { parseId, postSlug } from '../lib/content';
import { withBase } from '../consts';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const posts = await getCollection('post', ({ data }) => !data.draft);
  const out = posts.map((p) => {
    const { locale, category } = parseId(p.id);
    return {
      locale,
      category,
      title: p.data.title,
      description: p.data.description,
      tags: p.data.tags,
      date: p.data.date.toISOString(),
      url: withBase(`/${locale}/${category}/${postSlug(p)}`),
    };
  });
  return new Response(JSON.stringify(out), {
    headers: { 'Content-Type': 'application/json' },
  });
};
