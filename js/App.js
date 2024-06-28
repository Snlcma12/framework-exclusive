// HOMEWORK:
// class UI has to be implemented with Components.
// Add Essay Page (initial project)

class App extends Component {
  constructor(props) {
    super(props);
    this.header = new Header({
      id: "header",
      parent: this.id,
      template: template.headerTemplate,
      callbacks: { showPage: (name) => this.showPage(name) },
    });
    this.shooting = new Shooting({
      id: "shooting",
      parent: this.id,
      template: template.shootingTemplate,
    });
    this.simulator = new StudentSimulator({
      id: "simulator",
      parent: this.id,
      template: template.studentSimulatorTemplate,
    });
    this.calculator = new UCalculator({
      id: "calculator",
      parent: this.id,
      template: template.ucalculatorTemplate,
    });
    // this.graphRenderer = new GraphRenderer({
    //   id: "graphRenderer",
    //   parent: this.id,
    //   template: template.graphRendererTemplate
    // });

    this.graphics3D = new Graphics3D({
      id: "graphics3D",
      parent: this.id,
      template: template.graphics3DTemplate,
    });

    this.showPage("graphics3D");
  }

  showPage(name) {
    // Show one, hide others.
    this.shooting.hide();
    this.simulator.hide();
    this.calculator.hide();
    //this.graphRenderer.hide();
    this.graphics3D.hide();

    if (this[name]?.show) {
      this[name].show();
    }
  }
}
