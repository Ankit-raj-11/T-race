// Sound effects utility for countdown animation
// Uses Web Audio API to generate simple beep sounds

class SoundEffects {
  constructor() {
    this.audioContext = null;
    this.isEnabled = true;
    this.initAudioContext();
  }

  initAudioContext() {
    try {
      // Create audio context only when needed
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
      this.isEnabled = false;
    }
  }

  async ensureAudioContext() {
    if (!this.audioContext || !this.isEnabled) return false;
    
    // Resume audio context if it's suspended (required by browser policies)
    if (this.audioContext.state === 'suspended') {
      try {
        await this.audioContext.resume();
      } catch (error) {
        console.warn('Could not resume audio context:', error);
        return false;
      }
    }
    
    return true;
  }

  async playCountdownBeep(count) {
    if (!await this.ensureAudioContext()) return;

    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      // Connect nodes
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      // Configure sound based on countdown number
      if (count > 0) {
        // Higher pitch for countdown numbers (3, 2, 1)
        oscillator.frequency.setValueAtTime(800 + (count * 100), this.audioContext.currentTime);
        oscillator.type = 'sine';
        
        // Short beep
        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.2);
      } else {
        // Special "GO!" sound - lower pitch, longer duration
        oscillator.frequency.setValueAtTime(400, this.audioContext.currentTime);
        oscillator.type = 'square';
        
        // Longer, more prominent sound for "GO!"
        gainNode.gain.setValueAtTime(0.4, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.5);
      }
    } catch (error) {
      console.warn('Error playing countdown sound:', error);
    }
  }

  async playStartSound() {
    // Play the "GO!" sound
    await this.playCountdownBeep(0);
  }

  setEnabled(enabled) {
    this.isEnabled = enabled;
  }

  isAudioSupported() {
    return !!(window.AudioContext || window.webkitAudioContext);
  }
}

// Create a singleton instance
const soundEffects = new SoundEffects();

export default soundEffects;
