# Publicar HyperSex en Vercel

1. Sube el proyecto a GitHub.
2. Importa el repositorio en Vercel como proyecto Node.
3. En **Settings > Environment Variables**, agrega:
   - `KEYAUTH_NAME`: `hypersex`
   - `KEYAUTH_OWNERID`: `YmAfMJLZpB`
   - `KEYAUTH_VERSION`: `1.0`
   - `KEYAUTH_SECRET`: el App Secret real
4. Haz clic en **Deploy**.
5. Abre la URL entregada por Vercel.

Vercel ejecuta `/api/keyauth.js` como funcion serverless. La pagina no depende de que tu PC permanezca encendido. Las funciones pueden activarse al recibir la primera solicitud, pero no mantienen un proceso Node permanente.
