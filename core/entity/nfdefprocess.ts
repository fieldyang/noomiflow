import {BaseEntity,Entity,Column,Id,OneToMany,EntityProxy} from 'relaen';
import {NfProcess} from './nfprocess';

@Entity('NF_DEF_PROCESS')
export class NfDefProcess extends BaseEntity{
	@Id()
	@Column({
		name:'PROCESS_DEF_ID',
		type:'int',
		nullable:false
	})
	public processDefId:number;

	@Column({
		name:'DEF_NAME',
		type:'string',
		nullable:true,
		length:255
	})
	public defName:string;

	@Column({
		name:'KEYWORDS',
		type:'string',
		nullable:true,
		length:256
	})
	public kEYWORDS:string;

	@Column({
		name:'DEF_TYPE',
		type:'string',
		nullable:true,
		length:256
	})
	public defType:string;

	@Column({
		name:'CREATE_TIME',
		type:'int',
		nullable:true
	})
	public createTime:number;

	@Column({
		name:'UPD_TIME',
		type:'int',
		nullable:true
	})
	public updTime:number;

	@Column({
		name:'CFG_STR',
		type:'string',
		nullable:true,
		length:4000
	})
	public cfgStr:string;

	@Column({
		name:'DUE_TIME',
		type:'int',
		nullable:true
	})
	public dueTime:number;

	@Column({
		name:'VER',
		type:'int',
		nullable:true
	})
	public ver:number;

	@OneToMany({
		entity:'NfProcess',
		mappedBy:'nfDefProcess'
	})
	public nfProcesses:Array<NfProcess>;

	constructor(idValue?:number){
		super();
		this.processDefId = idValue;
	}
	public async getNfProcesses():Promise<Array<NfProcess>>{
		return this['nfProcesses']?this['nfProcesses']:await EntityProxy.get(this,'nfProcesses');
	}
}