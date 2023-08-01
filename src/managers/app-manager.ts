import { ArcRotateCamera, Engine, Scene, Vector3 } from "babylonjs";
import "babylonjs-loaders";

import { getCanvas } from "../utils/get-canvas";

class AppManager {
  private engine!: Engine;
  private scene!: Scene;
  private camera!: ArcRotateCamera;
  private canvas!: HTMLCanvasElement | null;

  get CANVAS() {
    return this.canvas;
  }

  get SCENE() {
    return this.scene;
  }

  get ENGINE() {
    return this.engine;
  }

  get CAMERA() {
    return this.camera;
  }

  public setupGameManager() {
    this.canvas = getCanvas();
    this.engine = this.setupEngine();
    this.scene = this.setupScene();
    this.camera = this.setupCamera();

    this.setupEvents();
  }

  private setupCamera = (): ArcRotateCamera => {
    const camera = new ArcRotateCamera(
      "camera",
      Math.PI / 2,
      Math.PI / 2.5,
      4,
      new Vector3(0, 0, 0),
      this.scene,
    );
    camera.attachControl(this.canvas, true);
    return camera;
  };

  private setupScene = (): Scene => {
    return new Scene(this.engine);
  };

  private setupEngine = (): Engine => {
    return new Engine(this.canvas, true);
  };

  private setupEvents = () => {
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });

    window.addEventListener("resize", () => {
      this.engine.resize();
    });
  };
}

export const APPMANAGER = new AppManager();
