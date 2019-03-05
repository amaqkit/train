let utils = new Utils();

let controller = new Controller();
controller.init();

document.getElementById('start').addEventListener('click', function() {
    controller.start();
    this.style.visibility = 'hidden';
});
