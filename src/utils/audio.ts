/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// A secure, lightweight synth sound generator using native Web Audio API
class AudioSynthService {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private initContext() {
    if (!this.ctx) {
      // Lazy initialize on first interaction to comply with modern browser autoplay policies
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMute(muted: boolean) {
    this.isMuted = muted;
    if (!muted) {
      this.initContext();
    }
  }

  public getMuteStatus(): boolean {
    return this.isMuted;
  }

  private playTone(
    freqs: number[],
    durations: number[],
    type: OscillatorType = 'sine',
    gains: number[] = [0.1, 0.01]
  ) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    let timeAccumulator = now;

    freqs.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, timeAccumulator);

      // Smooth gain envelope (Attack & Decay)
      gainNode.gain.setValueAtTime(0, timeAccumulator);
      gainNode.gain.linearRampToValueAtTime(gains[0] || 0.1, timeAccumulator + 0.02);
      
      const duration = durations[idx] || 0.1;
      const decayTime = timeAccumulator + duration;
      gainNode.gain.exponentialRampToValueAtTime(gains[1] || 0.001, decayTime);

      osc.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      osc.start(timeAccumulator);
      osc.stop(decayTime);

      timeAccumulator += duration - 0.02; // Small overlap for portamento/chords feel
    });
  }

  /**
   * Sound cue for selecting a pokemon element archetype
   */
  public cueSelection() {
    // Elegant dual rising synth note
    this.playTone([330, 440], [0.08, 0.12], 'sine', [0.08, 0.001]);
  }

  /**
   * Cue triggered when active matchup comparison countdown resolves
   */
  public cueMatchupProgress() {
    // Subtle typewriter click tone for progress step
    this.playTone([600], [0.04], 'triangle', [0.03, 0.001]);
  }

  /**
   * Cue triggered when countdown resolves and victory celebration begins
   */
  public cueVictory() {
    // Beautiful major arpeggio cascade
    this.playTone(
      [261.63, 329.63, 392.00, 523.25, 659.25], 
      [0.08, 0.08, 0.08, 0.12, 0.25],
      'triangle',
      [0.12, 0.001]
    );
  }

  /**
   * Cue triggered when player suffers standard system matchup defeat
   */
  public cueDefeat() {
    // Melancholy descending industrial tones
    this.playTone(
      [311.13, 277.18, 233.08, 196.00],
      [0.12, 0.12, 0.15, 0.35],
      'sawtooth',
      [0.06, 0.001]
    );
  }

  /**
   * Cue triggered on session termination / goodbye
   */
  public cueExit() {
    // Retro power-down sweep
    this.playTone([520, 260], [0.15, 0.35], 'sine', [0.05, 0.001]);
  }
}

export const audioSynth = new AudioSynthService();
