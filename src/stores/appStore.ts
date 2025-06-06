import { NAV_ITEMS } from "@/constants/nav-items";
import { wait } from "@/utils";
import { makeAutoObservable, runInAction } from "mobx";
import { soundStore } from "./soundStore";

class AppStore {
  assetsLoaded = false;
  bootComplete = false;
  currentSection = NAV_ITEMS[0];

  get isAppReady() {
    return this.assetsLoaded && this.bootComplete;
  }
  constructor() {
    makeAutoObservable(this);
  }

  async preloadResources() {
    await wait(1000);
    runInAction(() => {
      this.assetsLoaded = true;
    });
  }

  completeBoot() {
    this.bootComplete = true;
  }

  changeSection(nav: string) {
    if (nav === this.currentSection) return;

    this.currentSection = nav;
    soundStore.playSound("tabTransition");
  }
}

export const appStore = new AppStore();
