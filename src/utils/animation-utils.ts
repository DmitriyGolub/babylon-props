import { Scene, TransformNode } from "babylonjs";
import anime from "animejs";

export default class AnimationUtils {
  public static applySimpleBouncing = (
    node: TransformNode,
    duration: number,
  ) => {
    const animationGroup = anime.timeline({
      loop: true,
      easing: "easeOutBounce",
    });

    animationGroup.add({
      targets: node.position,
      y: 0,
      duration: duration,
    });
  };

  public static applyBouncing(
    node: TransformNode,
    amplitude: number,
    duration: number,
  ) {
    const scene: Scene = node.getScene();
    const bounces = 5; // Number of bounces
    const bounceDuration = duration / bounces; // Duration of each bounce
    let elapsed = 0;
    let currentBounce = 0;
    let currentAmplitude = amplitude;
    let startedPos = node.position.y;

    const animationFunction = () => {
      elapsed += scene.getEngine().getDeltaTime();

      if (elapsed <= duration) {
        const timeFraction = elapsed / bounceDuration;
        const timeInBounce = timeFraction - currentBounce;
        if (timeInBounce >= 1) {
          currentBounce++;
          currentAmplitude /= 2;
        }

        // simple lerp
        const lerpValue = 1 - Math.abs(timeInBounce - 0.5) * 2;
        const height = currentAmplitude * lerpValue;
        node.position.y = height;
      } else {
        node.position.y = 0; // Reset the position to the ground after the animation
        scene.onBeforeRenderObservable.remove(animationObserver);
      }
    };

    const animationObserver =
      scene.onBeforeRenderObservable.add(animationFunction);
  }
}
