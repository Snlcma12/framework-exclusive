class Header extends Component {
  addEventListeners() {
    document
      .getElementById("showShooting")
      .addEventListener("click", () => this.callbacks.showPage("shooting"));
    document
      .getElementById("showSimulator")
      .addEventListener("click", () => this.callbacks.showPage("simulator"));
    document
      .getElementById("showCalculator")
      .addEventListener("click", () => this.callbacks.showPage("calculator"));
    document
      .getElementById("showGraphRenderer")
      .addEventListener("click", () =>
        this.callbacks.showPage("graphRenderer")
      );
    document
      .getElementById("showGraphics3D")
      .addEventListener("click", () => this.callbacks.showPage("graphics3D"));
  }
}
