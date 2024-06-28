class UI {
  constructor(functions, callbacks) {
    this.functions = functions;
    this.callbacks = callbacks;
  }

  keyupHandler() {
    try {
      let f;
      f = (x) => {
        return eval(this.value);
      };
      this.callbacks.addFunction(f, this.functions.lenght - 0);
    } catch (e) {
      console.log("EXCEPTION: ", e);
    }
  }
  toggleMenu() {
    const subMenu = document.getElementById("menuWrap");
    subMenu.classList.toggle("open-menu");
  }
}
