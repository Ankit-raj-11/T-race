import dbConnect from '../../../lib/db';
import User from '../../../models/User';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();

    const { userId, email, displayName, photoURL } = req.body;

    if (!userId || !email || !displayName) {
      return res.status(400).json({ 
        message: 'Missing required fields: userId, email, displayName' 
      });
    }

    // Check if user already exists
    let user = await User.findOne({ userId });

    if (user) {
      // Update existing user's login time
      user.lastLogin = Date.now();
      user.displayName = displayName;
      user.photoURL = photoURL;
      await user.save();
      
      return res.status(200).json({
        message: 'User updated successfully',
        user: {
          userId: user.userId,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          gameName: user.gameName,
          highestScore: user.highestScore,
          totalGamesPlayed: user.totalGamesPlayed,
          lastLogin: user.lastLogin,
        }
      });
    } else {
      // Create new user
      user = new User({
        userId,
        email,
        displayName,
        photoURL,
        lastLogin: Date.now(),
      });

      await user.save();

      return res.status(201).json({
        message: 'User created successfully',
        user: {
          userId: user.userId,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          gameName: user.gameName,
          highestScore: user.highestScore,
          totalGamesPlayed: user.totalGamesPlayed,
          lastLogin: user.lastLogin,
        }
      });
    }
  } catch (error) {
    console.error('Error in create-or-update user:', error);
    return res.status(500).json({ 
      message: 'Internal server error',
      error: error.message 
    });
  }
}
