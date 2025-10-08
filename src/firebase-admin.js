'server-only';
import admin from 'firebase-admin';
import * as cookie from 'cookie';

/**
 * To authenticate a service account and authorize it to access Firebase services,
 * you must generate a private key file in JSON format.
 *
 * To generate a private key file for your service account:
 *
 * 1. In the Firebase console, open Settings > Service Accounts.
 * 2. Click Generate New Private Key, then confirm by clicking Generate Key.
 * 3. Securely store the JSON file containing the key.
 *
 * Use the values inside the JSON file to set FIREBASE_ in .env
 */
const firebaseAdminConfig = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseAdminConfig)
    // databaseURL
  });
}

/**
 * Expose subset of properties within the decoded idToken
 */
function getIdTokenPayload(payload) {
  return {
    userId: payload.user_id,
    displayName: payload.name,
    photoURL: payload.picture,
    email: payload.email
  };
}

// Cookie Name of session token
const SESSION_TOKEN_NAME = 't-race-session_token';

/**
 * Verify the idToken, save it into a session cookie
 * and return the payload for the currently active session
 */
export async function saveSession(req, res, idToken) {
  const payload = await admin.auth().verifyIdToken(idToken);

  // Set session expiration to 5 days (in seconds).
  const maxAge = 60 * 60 * 24 * 5;
  const sessionCookie = await admin.auth().createSessionCookie(idToken, {
    // createSessionCookie expects expiresIn to be specified in ms
    expiresIn: maxAge * 1000
  });

  // Set cookie policy for session cookie.
  res.setHeader(
    'Set-Cookie',
    cookie.serialize(SESSION_TOKEN_NAME, sessionCookie, {
      httpOnly: true,
      // Use secure in production mode only
      secure: process.env.NODE_ENV === 'production',
      maxAge,
      path: '/',
      sameSite: 'Lax'
    })
  );

  return getIdTokenPayload(payload);
}

/**
 * Remove the session cookie
 */
export async function clearSession(req, res) {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize(SESSION_TOKEN_NAME, '', {
      httpOnly: true,
      // Use secure in production mode only
      secure: process.env.NODE_ENV === 'production',
      // A date in the past removes the cookie
      expires: new Date(1970, 0, 1),
      path: '/',
      sameSite: 'Lax'
    })
  );
}

/**
 * Retrieve session token from cookie, and verify it (refresh if
 * necessary) and return the payload for the currently active session
 */
export async function getSession(req, res) {
  const rawCookies = req.headers.cookie;
  if (rawCookies === undefined) {
    return res.end();
  }
  const parsedCookie = cookie.parse(rawCookies);
  const sessionCookie = parsedCookie[SESSION_TOKEN_NAME];
  const payload = await admin.auth().verifySessionCookie(
    sessionCookie,
    /** checkRevoked */
    true
  );
  return getIdTokenPayload(payload);
}
