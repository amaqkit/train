/**
 * 地图宽
 */
const WIDTH = 9;

/**
 * 地图高
 */
const HEIGHT = 13;

/**
 * 节点类型
 */
let TYPE = {
    BLANK: 0, // 空地
    MOUNTIAN: 1, // 山洞
    RAILWAY: 2, // 轨道
    RAILWAY_NODE: 3, // 轨道节点
    CHANGE: 4, // 变轨
    STATION: 5, // 车站
};

/**
 * 方向
 */
let DIRECTION = {
    NONE: 0,
    TOP: 1,
    RIGHT: 2,
    BOTTOM: 3,
    LEFT: 4,
    TOP_RIGHT: 5,
    TOP_LEFT: 6,
    RIGHT_TOP: 7,
    RIGHT_BOTTOM: 8,
    LEFT_TOP: 9,
    LEFT_BOTTOM: 10,
    BOTTOM_LEFT: 11,
    BOTTOM_RIGHT: 12
};

/**
 * 颜色
 */
let COLOR = {
    RED: 1,
    PURPLE: 2,
    BLACK: 3,
    GREEN: 4,
    random: function() {
        return Math.ceil(Math.random() * 4);
    }
}

/**
 * 关卡地图
 */
let stage1 = {
    // 山洞
    id: 1,
    type: TYPE.MOUNTIAN,
    position: [1, 1],
    direction: DIRECTION.BOTTOM,
    leftChild: {
        // 轨道
        id: 2,
        type: TYPE.RAILWAY,
        direction: DIRECTION.BOTTOM,
        leftChild: {
            // 轨道节点
            id: 3,
            type: TYPE.RAILWAY_NODE,
            direction: DIRECTION.BOTTOM,
            leftChild: {
                // 轨道
                id: 4,
                type: TYPE.RAILWAY,
                direction: DIRECTION.BOTTOM,
                leftChild: {
                    // 轨道节点
                    id: 5,
                    type: TYPE.RAILWAY_NODE,
                    direction: DIRECTION.BOTTOM,
                    leftChild: {
                        // 轨道
                        id: 6,
                        type: TYPE.RAILWAY,
                        direction: DIRECTION.BOTTOM,
                        leftChild: {
                            // 变轨
                            id: 7,
                            type: TYPE.CHANGE,
                            in: DIRECTION.TOP,
                            leftChildDirection: DIRECTION.RIGHT,
                            rightChildDirection: DIRECTION.BOTTOM,
                            currentDirection: DIRECTION.BOTTOM,
                            leftChild: {
                                // 轨道
                                id: 9,
                                type: TYPE.RAILWAY,
                                direction: DIRECTION.RIGHT,
                                leftChild: {
                                    // 变轨
                                    id: 10,
                                    type: TYPE.CHANGE,
                                    in: DIRECTION.LEFT,
                                    leftChildDirection: DIRECTION.TOP,
                                    rightChildDirection: DIRECTION.RIGHT,
                                    currentDirection: DIRECTION.RIGHT,
                                    leftChild: {
                                        // 轨道
                                        id: 11,
                                        type: TYPE.RAILWAY,
                                        direction: DIRECTION.TOP,
                                        leftChild: {
                                            // 轨道
                                            id: 12,
                                            type: TYPE.CHANGE,
                                            in: DIRECTION.BOTTOM,
                                            leftChildDirection: DIRECTION.TOP,
                                            rightChildDirection: DIRECTION.RIGHT,
                                            currentDirection: DIRECTION.TOP,
                                            leftChild: {
                                                // 车站
                                                id: 13,
                                                type: TYPE.STATION,
                                                direction: DIRECTION.BOTTOM,
                                                color: COLOR.GREEN,
                                            },
                                            rightChild: {
                                                // 轨道
                                                id: 14,
                                                type: TYPE.RAILWAY,
                                                direction: DIRECTION.RIGHT,
                                                leftChild: {
                                                    // 车站
                                                    id: 15,
                                                    type: TYPE.STATION,
                                                    direction: DIRECTION.LEFT,
                                                    color: COLOR.BLACK,
                                                }
                                            }
                                        }
                                    },
                                    rightChild: {
                                        // 车站
                                        id: 16,
                                        type: TYPE.STATION,
                                        direction: DIRECTION.LEFT,
                                        color: COLOR.PURPLE,
                                    }
                                }
                            },
                            rightChild: {
                                // 轨道
                                id: 17,
                                type: TYPE.RAILWAY,
                                direction: DIRECTION.BOTTOM,
                                leftChild: {
                                    // 车站
                                    id: 18,
                                    type: TYPE.STATION,
                                    direction: DIRECTION.TOP,
                                    color: COLOR.RED,
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

/**
 * 空节点
 */
const EMPTY_NODE = {
    type: TYPE.BLANK,
    direction: DIRECTION.NONE
}

/**
 * 延伸方向
 */
const EXTEND_DIREACTION = {
    AUTO : 0,
    LEFT: 1,
    RIGHT: 2
}