import {
  AdvancedDynamicTexture,
  Control,
  Line,
  Rectangle,
  Slider,
  StackPanel,
  TextBlock,
} from "babylonjs-gui";
import { Mesh, Scene, Vector2 } from "babylonjs";

export class Form {
  protected panel: StackPanel;
  protected scene: Scene;
  private containerSize = new Vector2(0, 0);
  private readonly container: Rectangle;
  private guiControl: AdvancedDynamicTexture;
  private line: Line;
  private activeObject: Mesh | null = null;

  constructor(
    private object: Mesh,
    scene: Scene,
  ) {
    this.scene = scene;
    this.line = new Line();
    this.guiControl = AdvancedDynamicTexture.CreateFullscreenUI("UI");
    this.container = new Rectangle();
    this.panel = new StackPanel();
    this.container.addControl(this.panel);
    this.panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
    this.panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    this.container.thickness = 2;

    this.container.background = "grey";
    this.container.cornerRadius = 30;
    this.guiControl.addControl(this.container);
  }

  protected addHeader(text: string): TextBlock {
    const header = new TextBlock();
    header.text = text;
    header.height = "50px";
    this.incrementContainerSize(text.length * 12, 50);
    header.color = "white";
    header.fontSize = 26;
    return header;
  }

  protected addPropsName(text: string): TextBlock {
    const header = new TextBlock();
    header.text = text;
    header.height = "30px";
    header.color = "white";
    header.fontSize = 20;
    this.incrementContainerSize(text.length * 5, 30);
    return header;
  }

  protected createSlider(
    min: number,
    max: number,
    initialValue: number,
    callback: (value: number) => void,
  ): Slider {
    const slider = new Slider();
    slider.minimum = min;
    slider.maximum = max;
    slider.value = initialValue;
    slider.height = "15px";
    slider.width = "150px";
    slider.color = "orange";
    this.incrementContainerSize(150, 15);
    slider.onValueChangedObservable.add(callback);
    return slider;
  }

  protected setPanel(linkOffsetX = 250, linkOffsetY = -250, baseHeight = 50) {
    this.container.width = `${this.containerSize.x + 30}px`;
    this.container.height = `${this.containerSize.y + baseHeight}px`;
    this.container.linkOffsetX = `${linkOffsetX}px`;
    this.container.linkOffsetY = `${linkOffsetY}px`;
    this.container.linkWithMesh(this.object);
    this.addLine(this.object);
  }

  protected resetLine(object: Mesh) {
    this.line.dispose();
    this.addLine(object);
  }

  private incrementContainerSize(x: number, y: number) {
    if (this.containerSize.x < x) this.containerSize.x = x;
    this.containerSize.y += y;
  }

  private addLine(object: Mesh): void {
    this.line = new Line();
    this.line.lineWidth = 2;
    this.line.color = "Orange";
    this.line.zIndex = -1;
    this.guiControl.addControl(this.line);
    this.line.linkWithMesh(object);
    this.line.connectedControl = this.container;
  }
}
