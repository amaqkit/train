let createNode = function(node) {
    let ele = document.createElement('div');

    if (node.isEmpty()) {
        ele.className = 'node empty';
    } else {
        getNodeView(node, ele);
    }
    return ele;
}

let getDirectionArrow = function(direction) {
    if (direction === DIRECTION.TOP) {
        text = '↑';
    }  else if (direction === DIRECTION.LEFT) {
        text = '←';
    } else if (direction === DIRECTION.BOTTOM) {
        text = '↓';
    } else {
        text = '→';
    }
    return text;
}

let getNodeView = function(node, ele) {
    let text = '';
    let colorClass = '';

    switch (node.info.type) {
        case TYPE.MOUNTIAN: {
            text = '⛰';
            break;
        }
        case TYPE.RAILWAY: {
            if (node.info.direction === DIRECTION.BOTTOM || node.info.direction === DIRECTION.TOP) {
                text = '||';
            } else {
                text = '==';
            }
            break;
        }
        case TYPE.RAILWAY_NODE: {
            text = getDirectionArrow(node.info.direction);
            break;
        }
        case TYPE.CHANGE: {
            text = getDirectionArrow(node.info.currentDirection);
            break;
        }
        case TYPE.STATION: {
            text = '🏫';
            colorClass = getClassColorByTrain(node.info.color);
            break;
        }
    }

    ele.innerText = text;
    ele.className = 'node ' + colorClass;
    ele.setAttribute('id', node.info.id);
}

let getClassColorByTrain = function(trainColor) {
    switch (trainColor) {
        case COLOR.RED: {
            return "red";
        }
        case COLOR.PURPLE: {
            return 'purple';
        }
        case COLOR.BLACK: {
            return 'black';
        }
        case COLOR.GREEN: {
            return 'green';
        }
        default:
            return "";
    }
}

/**
 * V
 */
let View = function() {

}

let printMap = function(matrix, trainList) {
    // 打印地图
    let $cont = document.getElementById('cont');
    $cont.innerHTML = '';

    for (let i = 0; i < HEIGHT; i++) {
        let row = document.createElement('div');
        row.className = 'row';

        for (let j = 0; j < WIDTH; j++) {
            row.appendChild(createNode(matrix[i][j]));
        }
        $cont.appendChild(row);
    }

    if (trainList != null) {
        for (let i = 0; i < trainList.length; i++) {
            let train = trainList[i];
            let position = train.position;
            let nodeView = document.getElementsByClassName('row')[position[0]].children[position[1]];
            nodeView.className = 'node ' + getClassColorByTrain(train.color);
        }
    }
}

View.prototype = {
    printMap: printMap,
    updateScore: function(scoreNum) {
        document.getElementById('score-num').innerText = scoreNum;
    },
    gameOver: function() {
        document.getElementById('game-over').style.visibility = 'visible';
    }
}