import {BaseEntity,Entity,Column,Id,JoinColumn,ManyToOne,OneToMany,EntityProxy} from 'relaen';
import {NfDefProcess} from './nfdefprocess';
import {NfNode} from './nfnode';

@Entity('NF_PROCESS')
export class NfProcess extends BaseEntity{
	@Id()
	@Column({
		name:'PROCESS_ID',
		type:'int',
		nullable:false
	})
	public processId:number;

	@ManyToOne({entity:'NfDefProcess'})
	@JoinColumn({
		name:'PROCESS_DEF_ID',
		refName:'PROCESS_DEF_ID',
		nullable:true
	})
	public nfDefProcess:NfDefProcess;

	@Column({
		name:'PROCESS_NAME',
		type:'string',
		nullable:true,
		length:64
	})
	public processName:string;

	@Column({
		name:'USER_ID',
		type:'number',
		nullable:true
	})
	public userId:number;

	@Column({
		name:'START_TIME',
		type:'int',
		nullable:true
	})
	public startTime:number;

	@Column({
		name:'END_TIME',
		type:'int',
		nullable:true
	})
	public endTime:number;

	@Column({
		name:'HANDLE_TIME',
		type:'int',
		nullable:true
	})
	public handleTime:number;

	@Column({
		name:'CREATE_TIME',
		type:'int',
		nullable:true
	})
	public createTime:number;

	@Column({
		name:'DELETE_TIME',
		type:'int',
		nullable:true
	})
	public deleteTime:number;

	@Column({
		name:'DELETE_REASON',
		type:'string',
		nullable:true,
		length:2048
	})
	public deleteReason:string;

	@Column({
		name:'DUE_TIME',
		type:'int',
		nullable:true
	})
	public dueTime:number;

	@Column({
		name:'CURRENT_ID',
		type:'string',
		nullable:true,
		length:255
	})
	public currentId:string;

	@Column({
		name:'VARIABLES',
		type:'string',
		nullable:true,
		length:4000
	})
	public variables:string;



	@Column({
		name:'VER',
		type:'int',
		nullable:true
	})
	public ver:number;

	@OneToMany({
		entity:'NfNode',
		mappedBy:'nfProcess'
	})
	public nfNodes:Array<NfNode>;

	constructor(idValue?:number){
		super();
		this.processId = idValue;
	}
	public async getNfDefProcess():Promise<NfDefProcess>{
		return this['nfDefProcess']?this['nfDefProcess']:await EntityProxy.get(this,'nfDefProcess');
	}
	public async getNfNodes():Promise<Array<NfNode>>{
		return this['nfNodes']?this['nfNodes']:await EntityProxy.get(this,'nfNodes');
	}
}