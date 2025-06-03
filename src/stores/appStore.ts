import { wait } from "@/utils";
import { makeAutoObservable, runInAction } from "mobx";

class AppStore {
  assetsLoaded = false;
  bootComplete = false;

  get isAppReady() {
    return this.assetsLoaded && this.bootComplete;
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

  constructor() {
    makeAutoObservable(this);
  }
}

export const appStore = new AppStore();
