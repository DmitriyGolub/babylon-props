import { Mesh, MeshBuilder, Scene } from "babylonjs";
import { Form } from "../form";
import { Control } from "babylonjs-gui";

export class CylinderPropsForm extends Form {
  private cylinder: Mesh;
  private cylinderProps: {
    height: number;
    diameterTop: number;
    diameterBottom: number;
    tessellation: number;
  };

  constructor(mesh: Mesh, scene: Scene) {
    super(mesh, scene);
    this.cylinder = mesh;
    this.cylinderProps = {
      height: this.cylinder.scaling.y,
      diameterTop: this.cylinder.scaling.x,
      diameterBottom: this.cylinder.scaling.z,
      tessellation: 24,
    };
    this.setupForm();
  }

  private setupForm() {
    const header = this.addHeader("Cylinder Props");
    header.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    this.panel.addControl(header);

    //radius top
    const radiusTop = this.addPropsName("diameterTop");
    this.panel.addControl(radiusTop);
    const topRadiusSlider = this.createSlider(0.1, 2, 1, (value) => {
      this.cylinderProps.diameterTop = value;
      this.updateCylinderProperties({ diameterTop: value });
    });
    this.panel.addControl(topRadiusSlider);

    //radius
    const radiusBottom = this.addPropsName("diameterBot");
    this.panel.addControl(radiusBottom);
    const bottomRadiusSlider = this.createSlider(0.1, 2, 1, (value) => {
      this.cylinderProps.diameterBottom = value;
      this.updateCylinderProperties({ diameterBottom: value });
    });
    this.panel.addControl(bottomRadiusSlider);

    //height
    const height = this.addPropsName("height");
    this.panel.addControl(height);
    const heightSlider = this.createSlider(0.1, 2, 2, (value) => {
      this.cylinderProps.height = value;
      this.updateCylinderProperties({ height: value });
    });
    this.panel.addControl(heightSlider);

    //configure panel
    this.setPanel();
  }

  private updateCylinderProperties(options: {
    height?: number;
    diameterTop?: number;
    diameterBottom?: number;
    tessellation?: number;
  }): void {
    const m4 = this.cylinder.getWorldMatrix();
    this.cylinder.dispose();

    // Create a new cylinder with the updated properties
    this.cylinder = MeshBuilder.CreateCylinder(
      "cylinder",
      this.cylinderProps,
      this.scene,
    );
    this.cylinder.setPreTransformMatrix(m4);
    this.resetLine(this.cylinder);
  }
}
