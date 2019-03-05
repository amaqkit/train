/**
 * C
 */
let Controller = function() {
    this.modal = new Modal();
    this.view = new View();
    this.trainList = new Array();
    this.refreshTimer;
    this.sendTrainTimer;

    // for debug
    window.modal = this.modal;
}

Controller.prototype = {
    init: function() {
        let map = this.modal.initMap();
        this.view.printMap(map, this.trainList);
    },
    start: function() {
        this.trainList.push(this.sendTrain());
        let _this = this;

        // 随机产生火车
        this.sendTrainTimer = setInterval(function() {
            if (Math.random() > 0.5) {
                _this.trainList.push(_this.sendTrain());
            }
        }, 1000)

        // 定期刷新
        this.refreshTimer = setInterval(function() {
            _this.update();
        }, 500);
    },
    bindEvent: function() {
        let nodes = document.getElementsByClassName('node');
        let _this = this;

        for (let i = 0; i < nodes.length; i++) {
            nodes[i].addEventListener('click', function() {
                let id = parseInt(this.getAttribute('id'));
                let stage = utils.findNode(_this.modal.getStage(), id);
                if (stage.type === TYPE.CHANGE) {
                    if (stage.currentDirection === stage.leftChildDirection) {
                        stage.currentDirection = stage.rightChildDirection;
                    } else {
                        stage.currentDirection = stage.leftChildDirection;
                    }
                }
            });
        }
    },
    update: function() {
        for (let i = 0; i < this.trainList.length; i++) {
            this.trainList[i].move();
        }
        this.view.printMap(this.modal.getMap(), this.trainList);

        // 重新绑定事件
        this.bindEvent();

        // 计算分数
        for (let i = this.trainList.length - 1; i >= 0; i--) {
            let train = this.trainList[i];
            let _this = this;

            if (train.isTripFinished) {
                let position = train.position;
                let anim;
                let isSuccess = false;

                // 成功和失败动画不一样
                if (train.isTripSuccess) {
                    anim = ' scale';
                    isSuccess = true;
                    this.modal.increaseScore();
                    this.view.updateScore(this.modal.getScore());
                } else {
                    anim = ' shake';
                    isSuccess = false;
                }

                // 进站动画
                let nodeView = document.getElementsByClassName('row')[position[0]].children[position[1]];
                let originClass = nodeView.className;

                nodeView.className += anim;
                setTimeout(function() {
                    nodeView.className = originClass;
                    if (!isSuccess) {
                        _this.gameOver();
                    }
                }, 500);

                // 移除小火车
                this.trainList.splice(i, 1);
            }
        }
    },
    sendTrain: function() {
        return new Train(COLOR.random(), this.modal.getStage());
    },
    gameOver: function() {
        if (this.sendTrainTimer != null) {
            clearInterval(this.sendTrainTimer);
            this.sendTrainTimer = null;
        }
        if (this.refreshTimer != null) {
            clearInterval(this.refreshTimer);
            this.refreshTimer = null;
        }
        this.view.gameOver();
    }
};