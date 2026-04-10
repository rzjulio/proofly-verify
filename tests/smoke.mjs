import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const currentFilePath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(currentFilePath), '..');
const htmlPath = path.join(repoRoot, 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');

function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

const scriptMatch = html.match(/<script>([\s\S]*)<\/script>\s*<\/body>/);
assert(scriptMatch, 'Expected a single inline script block in index.html');

const script = scriptMatch[1];
new Function(script);

const requiredSnippets = [
    'function renderFileMode',
    'async function handleVerifyFile',
    'async function computeManifestEvidenceHash',
    'async function decryptArchiveMedia',
    'function normalizeShareKey',
    "supabaseUrl: '__SUPABASE_URL__'",
    "supabaseAnonKey: '__SUPABASE_ANON_KEY__'",
    'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js',
    'Arrastra un archivo .proofly aqu',
    'La verificación por token no está configurada en este deploy de GitHub Pages',
];

for (const snippet of requiredSnippets) {
    assert(html.includes(snippet), `Expected snippet not found: ${snippet}`);
}

console.log('Smoke test passed for proofly-verify');