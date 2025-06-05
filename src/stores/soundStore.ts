import { makeAutoObservable } from "mobx";
import { Howl, Howler } from "howler";

class SoundStore {
  private musicLib = [
    new Howl({ src: "/assets/audio/i_dont.mp3" }),
    new Howl({ src: "/assets/audio/maybe.mp3" }),
  ];
  private sfxLib = {
    type1: new Howl({ src: "/assets/audio/sfx/charsingle-1.wav" }),
    type2: new Howl({ src: "/assets/audio/sfx/charsingle-2.wav" }),
    type3: new Howl({ src: "/assets/audio/sfx/charsingle-3.wav" }),
    type4: new Howl({ src: "/assets/audio/sfx/charsingle-4.wav" }),
    type5: new Howl({ src: "/assets/audio/sfx/charsingle-5.wav" }),
    type6: new Howl({ src: "/assets/audio/sfx/charsingle-6.wav" }),
    beep: new Howl({ src: "/assets/audio/sfx/beep.wav" }),
    click: new Howl({ src: "/assets/audio/sfx/click.wav" }),
    menuIn: new Howl({ src: "/assets/audio/sfx/menu-fly-in.wav" }),
    menuOut: new Howl({ src: "/assets/audio/sfx/menu-fly-out.wav" }),
    modalShow: new Howl({ src: "/assets/audio/sfx/modal-show.wav" }),
    tabTransition: new Howl({ src: "/assets/audio/sfx/tab-transition.wav" }),
    glitch: new Howl({ src: "/assets/audio/sfx/glitch.mp3" }),
  };

  private soundLevel = 0.15;
  private fadeDuration = 5000;
  muted = false;
  currentTrackIndex = 0;
  currentBackgroundTrack: Howl | null = null;

  constructor() {
    makeAutoObservable(this);

    this.musicLib.forEach((track) => {
      track.on("end", () => {
        this.nextTrack();
      });
    });

    Howler.volume(this.soundLevel);
  }

  init() {
    this.playBackgroundMusic();
    window.addEventListener("blur", () => this.pause());
    window.addEventListener("focus", () => this.resume());
  }

  playBackgroundMusic() {
    if (this.muted) return;

    this.stopCurrent(() => {
      const track = this.musicLib[this.currentTrackIndex];
      track.play();
      track.fade(0, this.soundLevel, this.fadeDuration);
      this.currentBackgroundTrack = track;
    });
  }

  pause() {
    this.currentBackgroundTrack?.pause();
  }

  resume() {
    this.currentBackgroundTrack?.play();
  }

  stopCurrent(callback?: () => void) {
    if (this.currentBackgroundTrack) {
      const track = this.currentBackgroundTrack;
      track.fade(track.volume(), 0, this.fadeDuration);

      setTimeout(() => {
        track.stop();
        if (callback) callback();
      }, this.fadeDuration);
    } else if (callback) {
      callback();
    }
  }

  nextTrack() {
    this.currentTrackIndex =
      (this.currentTrackIndex + 1) % this.musicLib.length;
    this.playBackgroundMusic();
  }

  prevTrack() {
    this.currentTrackIndex =
      (this.currentTrackIndex - 1 + this.musicLib.length) %
      this.musicLib.length;
    this.playBackgroundMusic();
  }

  playSound(name: keyof typeof this.sfxLib) {
    if (this.muted) return;

    const sfx = this.sfxLib[name];

    if (sfx) {
      sfx.volume(0.2);
      sfx.play();
    } else {
      console.error(`Sound effect "${name}" not found.`);
    }
  }

  playRandomTypeSound() {
    if (this.muted) return;

    const typeKeys = Object.keys(this.sfxLib).filter((key) =>
      key.startsWith("type")
    );

    if (typeKeys.length === 0) {
      console.warn("No 'type' sounds found.");
      return;
    }

    const randomKey = typeKeys[Math.floor(Math.random() * typeKeys.length)];
    const sfx = this.sfxLib[randomKey as keyof typeof this.sfxLib];
    sfx.play();
  }

  toggleSound() {
    this.muted = !this.muted;
    Howler.mute(this.muted);
  }
}

export const soundStore = new SoundStore();
