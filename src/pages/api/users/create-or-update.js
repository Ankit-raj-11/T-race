// pages/api/users/create-or-update.js

import { saveSession } from '../../../firebase-admin';
import dbConnect from '../../../lib/db';
import User from '../../../models/User';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { idToken } = req.body;
  if (!idToken) {
    return res.status(400).json({ message: 'Missing required fields: idToken' });
  }

  try {
    const payload = await saveSession(req, res, idToken);
    const { userId, displayName, photoURL, email } = payload;

    await dbConnect();

    // Check if user already exists
    let user = await User.findOne({ userId });

    if (user) {
      // Update existing user's login time
      user.lastLogin = Date.now();
      user.displayName = displayName;
      user.photoURL = photoURL;
      await user.save();
      return res.status(200).json({ message: 'User updated successfully', user });
    } else {
      // Create new user
      user = new User({ userId, email, displayName, photoURL, lastLogin: Date.now() });
      await user.save();
      return res.status(201).json({ message: 'User created successfully', user });
    }
  } catch (error) {
    // UPDATED: Added more detailed logging
    console.error('Error in create-or-update user:', error.message);
    console.error('Full error object:', error); // This will give us more details
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}
