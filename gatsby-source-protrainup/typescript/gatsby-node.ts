import {
  GatsbyNode,
  SourceNodesArgs,
  PluginOptions,
  CreateNodeArgs,
} from "gatsby";
import PTU from "./ptu";
import PTUNodeCreator from "./ptu/nodeCreator";
import Invoker from "./ptu/invoker";

export const sourceNodes: GatsbyNode["sourceNodes"] = async (
  sourceNodesArgs: SourceNodesArgs,
  { login, password, apiURL }: PluginOptions
) => {
  try {
    const ptu = new PTU(apiURL as string, sourceNodesArgs.reporter);
    await ptu.init(login as string, password as string);
    const PTUData = await ptu.fetchPTUData();

    await new PTUNodeCreator(sourceNodesArgs).createNodes(PTUData);
  } catch (err) {
    return sourceNodesArgs.reporter.panic(err.message);
  }
};

export const onCreateNode: GatsbyNode["onCreateNode"] = async (
  createNode: CreateNodeArgs
) => {
  const nodeInvoker = new Invoker(createNode);
  await nodeInvoker.invoke(createNode.node, createNode.node.internal.type);
};
