import { Mesh, MeshBuilder, Scene } from "babylonjs";
import { Form } from "../form";
import { Control } from "babylonjs-gui";

export class IcospherePropsForm extends Form {
  private sphere: Mesh;
  private sphereProps: {
    diameter: number;
    subDivision: number;
  };

  constructor(mesh: Mesh, scene: Scene) {
    super(mesh, scene);
    this.sphere = mesh;
    this.sphereProps = {
      diameter: 2,
      subDivision: 4,
    };
    this.setupForm();
  }

  private setupForm() {
    const header = this.addHeader("Sphere Props");
    header.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    this.panel.addControl(header);

    //radius
    const radiusTop = this.addPropsName("diameter");
    this.panel.addControl(radiusTop);
    const topRadiusSlider = this.createSlider(0.1, 2, 1, (value) => {
      this.sphereProps.diameter = value;
      this.updateCylinderProperties({ diameter: value });
    });
    this.panel.addControl(topRadiusSlider);

    //radius
    const radiusBottom = this.addPropsName("subDivisions");
    this.panel.addControl(radiusBottom);
    const bottomRadiusSlider = this.createSlider(1, 10, 4, (value) => {
      this.sphereProps.subDivision = value;
      this.updateCylinderProperties({ subDivision: value });
    });
    this.panel.addControl(bottomRadiusSlider);

    //configure panel
    this.setPanel(0, 250);
  }

  private updateCylinderProperties(options: {
    diameter?: number;
    subDivision?: number;
  }): void {
    const m4 = this.sphere.getWorldMatrix();
    this.sphere.dispose();

    this.sphere = MeshBuilder.CreateIcoSphere(
      "icosphere", // name of the cylinder mesh
      {
        radius: this.sphereProps.diameter / 2,
        subdivisions: this.sphereProps.subDivision,
      },
      this.scene,
    );

    this.sphere.setPreTransformMatrix(m4);
    this.resetLine(this.sphere);
  }
}
