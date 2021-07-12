"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onCreateNode = exports.sourceNodes = void 0;
const ptu_1 = __importDefault(require("./ptu"));
const nodeCreator_1 = __importDefault(require("./ptu/nodeCreator"));
const invoker_1 = __importDefault(require("./ptu/invoker"));
const sourceNodes = async (sourceNodesArgs, { login, password, apiURL }) => {
    try {
        const ptu = new ptu_1.default(apiURL, sourceNodesArgs.reporter);
        await ptu.init(login, password);
        const PTUData = await ptu.fetchPTUData();
        await new nodeCreator_1.default(sourceNodesArgs).createNodes(PTUData);
    }
    catch (err) {
        return sourceNodesArgs.reporter.panic(err.message);
    }
};
exports.sourceNodes = sourceNodes;
const onCreateNode = async (createNode) => {
    const nodeInvoker = new invoker_1.default(createNode);
    await nodeInvoker.invoke(createNode.node, createNode.node.internal.type);
};
exports.onCreateNode = onCreateNode;
