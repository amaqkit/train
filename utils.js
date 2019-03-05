
let Utils = function() {

}

Utils.prototype = {
    // 寻找二叉树节点，深度优先
    findNode: function(stage, targetId) {
        if (stage == null) {
            return null;
        }
        if (stage.id === targetId) {
            return stage;
        } else {
            let node = this.findNode(stage.leftChild, targetId);
            if (node != null) {
                return node;
            } else {
                return this.findNode(stage.rightChild, targetId);
            }
        }
    }
}