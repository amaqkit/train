/**
 * 火车
 */
let Train = function(color, stage) {
    this.color = color;
    this.stage = stage;
    this.stageId = stage.id;
    this.position = [stage.position[0], stage.position[1]];
    this.isTripFinished = false; // 是否已进站
    this.isTripSuccess = false; // 是否进入正确车站
};

Train.prototype = {
    move: function() {
        // 找到逻辑节点
        let currentNode = utils.findNode(this.stage, this.stageId);

        // 计算下一个节点
        let node = new Node(currentNode);

        // 修改position
        this.position = node.extendPosition(this.position, EXTEND_DIREACTION.AUTO);

        // 修改stageId
        let nextNode = node.getAutoNextNode();
        this.stageId = nextNode.id;

        // 计算进站状态
        if (nextNode.type === TYPE.STATION) {
            this.isTripFinished = true;

            if (nextNode.color === this.color) {
                this.isTripSuccess = true;
            }
        }
    }
}