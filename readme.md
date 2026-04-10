## Proofly Verify

Sitio estático para verificar archivos `.proofly` en el navegador. Soporta dos modos:

- Flujo recomendado: abrir `https://proofly.app/v#key=<share-key>` y subir el archivo `.proofly`.
- Flujo legacy: verificación por `?token=...` contra Supabase RPC, solo si el deploy inyecta la configuración correspondiente.

## Deploy con GitHub Pages

Este repositorio está preparado para publicar con GitHub Actions en GitHub Pages.

### Qué publica el workflow

- `/index.html` para abrir el verificador desde la raíz del sitio.
- `/v/index.html` para mantener compatibilidad con el enlace que genera la app: `https://proofly.app/v#key=...`.

### Configuración recomendada

1. En GitHub, ve a `Settings > Pages` y selecciona `GitHub Actions` como source.
2. Si `proofly.app` apunta a este repo de Pages, el workflow ya generará la ruta `/v` que usa la app.
3. Si `proofly.app` vive en otro sitio principal, publica este contenido dentro de ese Pages source bajo la carpeta `v/` o ajusta el `WEB_VERIFY_BASE_URL` de la app.

### Variables opcionales para modo token

El flujo con `#key` funciona sin backend. El flujo legacy con `?token=` solo funcionará si defines estos secretos o variables del repositorio antes del deploy:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

Si no están definidos, el sitio seguirá funcionando para verificación local del archivo, pero mostrará un error claro si alguien intenta usar el modo token.

## Smoke test

La prueba `tests/smoke.mjs` valida que:

- el HTML siga compilando como script válido;
- existan las funciones críticas del verificador (`handleVerifyFile`, `computeManifestEvidenceHash`, `decryptArchiveMedia`, `renderFileMode`);
- el deploy siga teniendo los placeholders/config esperados para GitHub Pages.

Puedes correrla localmente con:

```bash
cd /Volumes/Datos/Repos/proofly-verify
node tests/smoke.mjs
```

## Deploy manual

Si quieres disparar el deploy sin hacer push, usa `Run workflow` sobre `Deploy GitHub Pages`.

