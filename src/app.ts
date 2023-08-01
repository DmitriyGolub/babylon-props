import { HemisphericLight, MeshBuilder, Quaternion, Vector3 } from "babylonjs";
import { APPMANAGER } from "./managers/app-manager";
import { BoxPropsForm } from "./form/props/box-props-form";
import { CylinderPropsForm } from "./form/props/cylinder-props-form";
import { IcospherePropsForm } from "./form/props/icosphere-props-form";
import AnimationUtils from "./utils/animation-utils";
import { NameForm } from "./form/name-form";

export class App {
  prepareScene() {
    const scene = APPMANAGER.SCENE;

    // Light
    new HemisphericLight("light", new Vector3(0.5, 1, 0.8).normalize(), scene);

    // Objects
    const plane = MeshBuilder.CreateBox("Plane", {}, scene);
    plane.rotationQuaternion = Quaternion.FromEulerAngles(0, Math.PI, 0);
    new BoxPropsForm(plane, scene);

    const icosphere = MeshBuilder.CreateIcoSphere("IcoSphere", {}, scene);
    icosphere.position.set(-2, 0, 0);
    new IcospherePropsForm(icosphere, scene);

    const cylinder = MeshBuilder.CreateCylinder("Cylinder", {}, scene);
    cylinder.position.set(2, 0, 0);
    new CylinderPropsForm(cylinder, scene);

    const ball = MeshBuilder.CreateSphere("Sphere", {}, scene);
    ball.position.set(5, 5, -5);
    AnimationUtils.applySimpleBouncing(ball, 2000);
    new NameForm(ball, scene, "SimpleBouncing");

    const ball2 = MeshBuilder.CreateSphere("Sphere", {}, scene);
    ball2.position.set(0, 5, -5);
    new NameForm(ball2, scene, "Bouncing");

    setInterval(() => {
      AnimationUtils.applyBouncing(ball2, 4, 2000);
    }, 2300);
  }
}
