let Node = function(config) {
    this.info = config;
}

Node.prototype = {
    isEmpty: function() {
        return this.info.type === TYPE.BLANK;
    },
    isStation: function() {
        return this.info.type === TYPE.STATION;
    },
    isRailway: function() {
        return this.info.type === TYPE.RAILWAY;
    },
    isRailwayNode: function() {
        return this.info.type === TYPE.RAILWAY_NODE;
    },
    isChange: function() {
        return this.info.type === TYPE.CHANGE;
    },
    getInfo: function() {
        return this.info;
    },
    getAutoNextNode: function() {
        if (this.info.currentDirection === this.info.leftChildDirection) {
            return this.info.leftChild;
        }
        if (this.info.currentDirection === this.info.rightChildDirection) {
            return this.info.rightChild;
        }
    },
    // 延伸铁轨方向，type 1: left; 2 right; 0 auto（延当前指向） 
    extendPosition: function(position, type) {
        let nextPosition = [position[0], position[1]];
        let direction;

        // 变轨需要区分方向
        if (this.isChange()) {
            switch (type) {
                case EXTEND_DIREACTION.AUTO: {
                    direction = this.info.currentDirection;
                    break;
                }
                case EXTEND_DIREACTION.LEFT: {
                    direction = this.info.leftChildDirection;
                    break;
                }
                case EXTEND_DIREACTION.RIGHT: {
                    direction = this.info.rightChildDirection;
                    break;
                }
            }
        } else {
            direction = this.info.direction
        }

        switch (direction) {
            case DIRECTION.TOP: {
                nextPosition[0] -= 1;
                break;
            }
            case DIRECTION.RIGHT: {
                nextPosition[1] += 1;
                break;
            }
            case DIRECTION.BOTTOM: {
                nextPosition[0] += 1;
                break;
            }
            case DIRECTION.LEFT: {
                nextPosition[1] -= 1;
                break;
            }
            default: {
                throw Error('地图错误：节点方向不正确', this.info);
            }
        }
        if (nextPosition[0] < 0 || nextPosition[0] >= HEIGHT || nextPosition[1] < 0 || nextPosition[1] >= WIDTH) {
            throw Error('地图错误：节点超出地图范围', this.info);
        }
        return nextPosition;
    }
}