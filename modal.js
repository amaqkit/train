

let fillMap = function(matrix, map, position) {
    if (map == null) {
        throw Error('map为空');
    }
    // 填充自身节点
    let node = new Node(map);

    if (position == null) {
        position = node.info.position;
    }
    matrix[position[0]][position[1]] = node;

    // 填充子节点
    let leftChild = map.leftChild;
    if (leftChild != null) {
        fillMap(matrix, leftChild, node.extendPosition(position, EXTEND_DIREACTION.LEFT));

        let rightChild = map.rightChild;
        if (rightChild != null) {
            fillMap(matrix, rightChild, node.extendPosition(position, EXTEND_DIREACTION.RIGHT));
        }
    }
}

let initMap = function() {
    // 初始化数组
    let matrix = new Array();
    for (let i = 0; i < HEIGHT; i++) {
        let column = new Array();
        for (let j = 0; j < WIDTH; j++) {
            column[j] = new Node(EMPTY_NODE);
        }
        matrix[i] = column;
    }

    // 填充地图
    fillMap(matrix, this.stage);

    this.map = matrix;
    return matrix;
}

let Modal = function() {
    this.map = null;
    this.stage = stage1;
    this.score = 0;
}

Modal.prototype = {
    initMap: initMap,
    getMap: function() {
        return this.map;
    },
    getStage: function() {
        return this.stage;
    },
    increaseScore: function() {
        this.score++;
    },
    getScore: function() {
        return this.score;
    }
}