import { RelaenManager } from "relaen";
import { NFEngine } from "../core/nfengine";
import { NFUserManager } from "../core/nfusermanager";
import { NEndNode } from "../core/node/nendnode";
import { NUserTaskNode } from "../core/node/nusertasknode";
import { RelaenConfig } from "./relaenconfig";

/**
 * 定义流程
 */
async function defineProcess(){
    const path = require('path').resolve('./examples/flows/flow1.json');
    const str = require('fs').readFileSync(path);
    const json = JSON.parse(str);
    await NFEngine.defineProcess(json);
}

/**
 * 创建流程
 */
async function createProcess(){
    await NFEngine.createProcess('测试流程2','测试流程2-管理员提交-20221010',1);
}

/**
 * 测试
 */
(async function(){
    RelaenManager.init(RelaenConfig);
    // await defineProcess();
    // await createProcess();
    //获取流程实例
    const proc = await NFEngine.getInstance(8);
    // proc.start();
    // 取用户的未处理流程
    // const nodes = await NFUserManager.getUnHandleNodes(1);
    // console.log(nodes);
    // 执行节点，根据参数直接end
    // const proc = await NFEngine.getInstance(nodes.rows[2].nfProcess.processId);
    proc.setParam('data',1);
    await proc.next({userId:1});
    //根据参数跳转到task2
    // const proc = await NFEngine.getInstance(nodes.rows[2].nfProcess.processId);
    // proc.setParam('data',2);
    // await proc.next({userId:1});
    //task2审核不通过
    // const nodes = await NFUserManager.getUnHandleNodes(2);
    // const proc = await NFEngine.getInstance(nodes.rows[0].nfProcess.processId);
    // proc.setParam('agree',0);
    // await proc.next({userId:2,agree:0,reason:'资料不齐'});
    //task2 审核通过，结束
    // const nodes = await NFUserManager.getUnHandleNodes(2);
    // const proc = await NFEngine.getInstance(nodes.rows[0].nfProcess.processId);
    // proc.setParam('agree',1);
    // await proc.next({userId:2,agree:1,reason:'审核通过'});
})();