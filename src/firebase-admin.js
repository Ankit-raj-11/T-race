'server-only';
import admin from 'firebase-admin';
import * as cookie from 'cookie';

/**
 * Your service account credentials should be stored in environment variables
 * without the NEXT_PUBLIC_ prefix for server-side code.
 */
const firebaseAdminConfig = {
  // CORRECTED: Removed NEXT_PUBLIC_ prefix
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  // CORRECTED: Replaces escaped newlines in the private key
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseAdminConfig),
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
    email: payload.email,
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

  // Set session expiration to 1 days (in seconds).
  const maxAge = 60 * 60 * 24 * 1;
  const sessionCookie = await admin.auth().createSessionCookie(idToken, {
    // createSessionCookie expects expiresIn to be specified in ms
    expiresIn: maxAge * 1000,
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
      sameSite: 'Lax',
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
      sameSite: 'Lax',
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