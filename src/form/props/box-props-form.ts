import { Mesh, Scene } from "babylonjs";
import { Form } from "../form";
import { Control } from "babylonjs-gui";

export class BoxPropsForm extends Form {
  private box: Mesh;

  constructor(mesh: Mesh, scene: Scene) {
    super(mesh, scene);
    this.box = mesh;
    this.setupForm();
  }

  private setupForm() {
    const header = this.addHeader("Box Props");
    header.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    this.panel.addControl(header);

    //width
    const width = this.addPropsName("width");
    this.panel.addControl(width);
    const widthSlider = this.createSlider(0.1, 2, 1, (value) => {
      this.box.scaling.x = value;
    });
    this.panel.addControl(widthSlider);

    //height
    const height = this.addPropsName("height");
    this.panel.addControl(height);
    const heightSlider = this.createSlider(0.1, 2, 1, (value) => {
      this.box.scaling.y = value;
    });
    this.panel.addControl(heightSlider);

    //depth
    const depth = this.addPropsName("depth");
    this.panel.addControl(depth);
    const depthSlider = this.createSlider(0.1, 2, 1, (value) => {
      this.box.scaling.z = value;
    });
    this.panel.addControl(depthSlider);

    //configure panel
    this.setPanel();
  }
}
