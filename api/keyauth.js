const KEYAUTH_ENDPOINT = "https://keyauth.win/api/1.2/";

module.exports = async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ success: false, message: "Metodo no permitido." });
  }

  const action = request.query.action;
  if (action !== "init" && action !== "login") {
    return response.status(400).json({ success: false, message: "Accion KeyAuth invalida." });
  }

  const secret = process.env.KEYAUTH_SECRET;
  if (!secret) {
    return response.status(500).json({ success: false, message: "KEYAUTH_SECRET no configurado." });
  }

  const fields = request.body && typeof request.body === "object"
    ? request.body
    : Object.fromEntries(new URLSearchParams(request.body || ""));

  const body = new URLSearchParams({
    name: process.env.KEYAUTH_NAME || "hypersex",
    ownerid: process.env.KEYAUTH_OWNERID || "YmAfMJLZpB",
    type: action,
    ver: process.env.KEYAUTH_VERSION || "1.0",
    secret,
    ...(action === "login"
      ? {
          username: fields.username || "",
          pass: fields.password || "",
          sessionid: fields.sessionid || ""
        }
      : {})
  });

  try {
    const keyauthResponse = await fetch(KEYAUTH_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString()
    });
    const result = await keyauthResponse.text();
    let parsed;
    try {
      parsed = JSON.parse(result);
    } catch {
      parsed = { success: false, message: result || "Respuesta invalida de KeyAuth." };
    }
    return response.status(keyauthResponse.ok ? 200 : 502).json(parsed);
  } catch (error) {
    return response.status(502).json({ success: false, message: error.message });
  }
};
