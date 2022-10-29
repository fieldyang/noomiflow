import { NfDefProcess } from "./entity/nfdefprocess";
import { NfProcess } from "./entity/nfprocess";
import { NfNode } from "./entity/nfnode";
import { NFProcess } from "./nfprocess";
import { EntityManager, getEntityManager, Query } from "relaen";
/**
 * 流程引擎
 */
export class NFEngine{
    /**
     * 流程map
     */
    static processMap:Map<number,NFProcess> = new Map();

    /**
     * 定义流程
     * @param name      流程名
     * @param cfgStr    流程定义串 
     */
    static async defineProcess(cfg){
        const defP:NfDefProcess = new NfDefProcess();
        defP.defName = cfg.name;
        defP.createTime = new Date().getTime();
        defP.dueTime = cfg.dueTime;
        defP.cfgStr = JSON.stringify(cfg.nodes);
        await defP.save();
    }

    /**
     * 创建流程实例
     * @param defName   流程定义名
     * @param instName  流程实例名  
     * @returns     流程实例
     */
    static async createProcess(defName:string,instName:string,userId?:number):Promise<NFProcess>{
        const defP = <NfDefProcess>await NfDefProcess.findOne({defName:defName});
        if(!defP || !defP.cfgStr){
            return;
        }
        let cfg;
        try{
            cfg = JSON.parse(defP.cfgStr);
        }catch(e){
            throw "流程定义错误!";
        }
        const process = new NFProcess(cfg);
        //保存流程实例
        process.instance = await this.saveInstance(defP,instName,userId);
        //返回流程对象
        return process;
    }

    /**
     * 关闭流程
     * @param processId     流程id
     * @param reason        关闭理由
     */
    static async closeProcess(processId:number,reason?:string){
        const proc = <NfProcess>await NfProcess.find(processId);
        if(!proc){
            return;
        }
        proc.deleteReason = reason;
        proc.deleteTime = new Date().getTime();
        await proc.save();
        return true;
    }

    /**
     * 获取流程实例
     * @param procId    流程实例id
     * @returns         流程对象
     */
    static async getInstance(procId:number):Promise<NFProcess>{
        const em:EntityManager = await getEntityManager();
        const query:Query = em.createQuery(NfProcess.name);
        const proc:NfProcess = await query.select(['*','nfDefProcess.cfgStr']).where({processId:procId}).getResult();
        let cfg;
        try{
            cfg = JSON.parse(proc.nfDefProcess.cfgStr);
        }catch(e){
            throw "流程定义错误!";
        }
        const process = new NFProcess(cfg);
        process.instance = proc;
        await em.close();
        return process;
    }


    /**
     * 保存流程实例
     * @param defProc   流程定义
     * @param name      流程实例名
     * @param userId    用户id
     */
    public static async saveInstance(defProc:NfDefProcess,name:string,userId:number){
        let proc:NfProcess = new NfProcess();
        proc.createTime = new Date().getTime();
        proc.processName = name;
        proc.userId = userId;
        if(defProc.dueTime){
            proc.dueTime = proc.createTime + defProc.dueTime;
        }
        proc.nfDefProcess = defProc;
        proc = <NfProcess>await proc.save();
        return proc;
    }
}