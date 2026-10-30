/**
 * Build-time loader for content/*.md.
 *
 * Every piece of copy on the site comes from these files. Anything that can't be found
 * comes back as null (or an empty list) so the view renders a visible TODO instead of
 * inventing text.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/** Repo root, where content/ and public/ live: three levels up from about-me/src/lib/. */
const ROOT = fileURLToPath(new URL('../../../', import.meta.url));

export interface KeyValue {
  key: string;
  value: string;
}

export interface Bio {
  name: string | null;
  shortBio: string | null;
  skills: string[];
  gpa: KeyValue | null;
  lookingFor: string | null;
  /** Short status for the window title bar, derived from lookingFor. */
  status: string | null;
  photo: { src: string; alt: string | null } | null;
}

export interface School {
  name: string;
  period: string | null;
  details: KeyValue[];
}

export interface Education {
  title: string | null;
  schools: School[];
}

/** A content file that is a heading plus one Markdown table (organizations, competitions). */
export interface TableData {
  title: string | null;
  headers: string[];
  rows: string[][];
}

export interface ProjectIcon {
  /** Inline SVG markup, sized by CSS and hidden from assistive tech. */
  svg: string;
  /** True when the SVG hard-codes its own colors and needs recoloring to fit the palette. */
  recolor: boolean;
}

export interface Project {
  name: string;
  tagline: string | null;
  description: string | null;
  year: string | null;
  link: string | null;
  icon: ProjectIcon | null;
  /** Screenshot, or null when the project has no "Image:" line. */
  image: ProjectImage | null;
  /** Every other "Key: value" line (Category, Type, Role, Frameworks…), in content order. */
  details: KeyValue[];
  tags: string[];
}

export interface ProjectImage {
  /** URL under public/, or null when the listed file can't be found. */
  src: string | null;
  /** The path as written in content/projects.md. */
  ref: string;
  alt: string | null;
}

export interface Projects {
  title: string | null;
  items: Project[];
}

export interface Contact {
  label: string;
  value: string;
  href: string;
}

export interface Contacts {
  title: string | null;
  closing: string | null;
  email: Contact | null;
  links: Contact[];
}

export interface Site {
  bio: Bio;
  education: Education;
  organizations: TableData;
  competitions: TableData;
  projects: Projects;
  contacts: Contacts;
}

/*
 * content/projects.md asks for a relevant icon where none exists in public/icons/.
 * Keyed by lowercase project name. Point the project's "Icon:" line at a real file
 * in content/ and the entry here is no longer used.
 */
const ICON_FALLBACKS: Record<string, string> = {
  // Bootstrap Icons "person-bounding-box" (MIT): a person inside a detection box.
  'ppe surveilance': './public/icons/person-bounding-box.svg',
};

/* ---------- file + markdown helpers ---------- */

function readText(rel: string): string {
  return fs.readFileSync(path.join(ROOT, rel), 'utf8');
}

/** "./public/images/a.jpg" → "/images/a.jpg", or null when the file doesn't exist. */
function publicUrl(ref: string | undefined): string | null {
  if (!ref) return null;
  const rel = ref.trim().replace(/^\.?\//, '');
  if (!rel.startsWith('public/') || !fs.existsSync(path.join(ROOT, rel))) return null;
  return '/' + rel.slice('public/'.length);
}

/** Like publicUrl, but images live in public/images/, so fall back to the file name there. */
function imageUrl(ref: string): string | null {
  return publicUrl(ref) ?? publicUrl(`./public/images/${path.basename(ref.trim())}`);
}

function lines(md: string): string[] {
  return md.split(/\r?\n/);
}

/** Text of the first heading in the file, e.g. "# Projects" → "Projects". */
function headingTitle(md: string): string | null {
  return md.match(/^#{1,6}\s+(.+?)\s*$/m)?.[1] ?? null;
}

interface Section {
  heading: string;
  body: string;
}

/** Split a file into sections at headings of exactly `level` (2 → "## "). */
function sections(md: string, level: number): Section[] {
  const marker = '#'.repeat(level) + ' ';
  const out: Section[] = [];
  for (const line of lines(md)) {
    if (line.startsWith(marker)) out.push({ heading: line.slice(marker.length).trim(), body: '' });
    else if (out.length) out[out.length - 1].body += line + '\n';
  }
  return out.map((s) => ({ ...s, body: s.body.trim() }));
}

function findSection(list: Section[], prefix: string): Section | undefined {
  return list.find((s) => s.heading.toLowerCase().startsWith(prefix));
}

/** Collapse a paragraph's line breaks; empty → null. */
function paragraph(text: string | undefined): string | null {
  const flat = text?.replace(/\s*\n\s*/g, ' ').trim();
  return flat || null;
}

function bulletLines(body: string): string[] {
  return lines(body)
    .map((l) => l.match(/^\s*[-*+]\s+(.+)$/)?.[1].trim())
    .filter((l): l is string => Boolean(l));
}

/** "Key: value" → { key, value }. Splits on the first ": " so URLs stay intact. */
function splitKey(line: string): KeyValue {
  const i = line.indexOf(': ');
  return i === -1
    ? { key: '', value: line.trim() }
    : { key: line.slice(0, i).trim(), value: line.slice(i + 2).trim() };
}

function bulletFields(body: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const line of bulletLines(body)) {
    const { key, value } = splitKey(line);
    if (key) out[key.toLowerCase()] = value;
  }
  return out;
}

function commaList(value: string | undefined): string[] {
  return (value ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

interface NumberedItem {
  text: string;
  subs: string[];
}

/** "1. Title" items with indented "- sub" bullets underneath. */
function numberedItems(md: string): NumberedItem[] {
  const items: NumberedItem[] = [];
  for (const line of lines(md)) {
    const item = line.match(/^\d+[.)]\s+(.+)$/);
    if (item) {
      items.push({ text: item[1].trim(), subs: [] });
      continue;
    }
    const sub = line.match(/^\s+[-*+]\s+(.+)$/);
    if (sub && items.length) items[items.length - 1].subs.push(sub[1].trim());
  }
  return items;
}

/* ---------- loaders ---------- */

function statusFrom(lookingFor: string | null): string | null {
  const m = lookingFor?.match(/\blooking for (?:an? )?([^.,]+?)(?:\s+(?:as|at|in)\b|[.,]|$)/i);
  return m ? `looking for ${m[1].trim()}` : null;
}

function loadBio(): Bio {
  const secs = sections(readText('content/bio.md'), 2);
  const body = (prefix: string) => findSection(secs, prefix)?.body;

  const gpaText = paragraph(body('gpa'));
  const gpa = gpaText ? splitKey(gpaText) : null;
  const lookingFor = paragraph(body('what i'));

  const photoFields = bulletFields(body('photo') ?? '');
  const photoSrc = publicUrl(photoFields.files ?? photoFields.file);

  return {
    name: paragraph(body('name')),
    shortBio: paragraph(body('short bio')),
    skills: bulletLines(body('skills') ?? ''),
    gpa: gpa && !gpa.key ? { key: 'GPA', value: gpa.value } : gpa,
    lookingFor,
    status: statusFrom(lookingFor),
    photo: photoSrc ? { src: photoSrc, alt: photoFields.alt ?? photoFields['alt text'] ?? null } : null,
  };
}

function loadEducation(): Education {
  const md = readText('content/education.md');
  const schools = numberedItems(md).map(({ text, subs }) => {
    const withPeriod = text.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
    return {
      name: withPeriod ? withPeriod[1] : text,
      period: withPeriod ? withPeriod[2].trim() : null,
      details: subs.map(splitKey),
    };
  });
  return { title: headingTitle(md), schools };
}

/** Heading + the file's Markdown table. Other lines (e.g. "> notes") are ignored. */
function loadTable(file: string): TableData {
  const md = readText(file);
  const rows = lines(md)
    .map((l) => l.trim())
    .filter((l) => l.startsWith('|'))
    .map((l) =>
      l
        .replace(/^\|/, '')
        .replace(/\|$/, '')
        .split('|')
        .map((c) => c.trim()),
    )
    .filter((cells) => !cells.every((c) => /^:?-+:?$/.test(c)));
  const [headers = [], ...body] = rows;
  return { title: headingTitle(md), headers, rows: body };
}

function loadIcon(ref: string | undefined): ProjectIcon | null {
  const url = publicUrl(ref);
  if (!url || !url.toLowerCase().endsWith('.svg')) return null;
  const svg = readText(path.join('public', url))
    .replace(/<\?xml[\s\S]*?\?>/, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .trim()
    .replace(
      /<svg\b([^>]*)>/,
      (_, attrs: string) =>
        `<svg${attrs.replace(/\s(?:width|height|class)="[^"]*"/g, '')} aria-hidden="true" focusable="false">`,
    );
  return { svg, recolor: /\s(?:fill|stroke)="#/i.test(svg) };
}

/** Project fields with their own place on the card; any other key becomes a detail row. */
const PROJECT_FIELDS_SHOWN_ELSEWHERE = new Set([
  'description',
  'year',
  'link',
  'image',
  'alt',
  'image alt',
  'alt text',
  'icon',
  'tags',
]);

function loadProjects(): Projects {
  const md = readText('content/projects.md');
  const items = numberedItems(md).map(({ text, subs }) => {
    const title = splitKey(text);
    const name = title.key || title.value;
    const fields: Record<string, string> = {};
    const details: KeyValue[] = [];
    for (const sub of subs) {
      const { key, value } = splitKey(sub);
      if (!key) continue;
      fields[key.toLowerCase()] = value;
      if (!PROJECT_FIELDS_SHOWN_ELSEWHERE.has(key.toLowerCase())) details.push({ key, value });
    }
    return {
      name,
      tagline: title.key ? title.value : null,
      description: fields.description ?? null,
      year: fields.year ?? null,
      link: fields.link ?? null,
      icon: loadIcon(fields.icon) ?? loadIcon(ICON_FALLBACKS[name.toLowerCase()]),
      image: fields.image
        ? {
            src: imageUrl(fields.image),
            ref: fields.image,
            alt: fields.alt ?? fields['image alt'] ?? fields['alt text'] ?? null,
          }
        : null,
      details,
      tags: commaList(fields.tags),
    };
  });
  return { title: headingTitle(md), items };
}

function contactHref(label: string, value: string): string {
  if (/^https?:\/\//i.test(value)) return value;
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return `mailto:${value}`;
  const digits = value.replace(/\D/g, '');
  if (/whatsapp/i.test(label) && digits) return `https://wa.me/${digits}`;
  if (/^\+?[\d\s().-]{6,}$/.test(value)) return `tel:${value.startsWith('+') ? '+' : ''}${digits}`;
  return value;
}

function loadContacts(): Contacts {
  const md = readText('content/contacts.md');
  const secs = sections(md, 2);
  const all = bulletLines(findSection(secs, 'contact list')?.body ?? '')
    .map(splitKey)
    .filter((c) => c.key && c.value)
    .map(({ key, value }) => ({ label: key, value, href: contactHref(key, value) }));
  const email = all.find((c) => c.href.startsWith('mailto:')) ?? null;
  return {
    title: headingTitle(md),
    closing: paragraph(findSection(secs, 'brief')?.body),
    email,
    links: all.filter((c) => c !== email),
  };
}

export function loadSite(): Site {
  return {
    bio: loadBio(),
    education: loadEducation(),
    organizations: loadTable('content/organizations.md'),
    competitions: loadTable('content/competitions.md'),
    projects: loadProjects(),
    contacts: loadContacts(),
  };
}
