import { Mesh, Scene } from "babylonjs";
import { Form } from "./form";

export class NameForm extends Form {
  private readonly header: string;
  private mesh: Mesh;

  constructor(mesh: Mesh, scene: Scene, header: string) {
    super(mesh, scene);
    this.mesh = mesh;
    this.header = header;
    this.setupForm();
  }

  private setupForm() {
    const header = this.addHeader(this.header);
    header.color = "orange";
    this.panel.addControl(header);

    //configure panel
    this.setPanel(0, 100, 10);
  }
}
