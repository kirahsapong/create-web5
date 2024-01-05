import { 
  ProtocolsConfigureRequest,
  ProtocolsQueryRequest,
  Record, 
  RecordUpdateOptions, 
  RecordsCreateRequest, 
  RecordsDeleteRequest, 
  RecordsQueryRequest, 
  RecordsReadRequest } from "@web5/api";
import { web5 } from '../web5-config';

export async function createRecord(request: RecordsCreateRequest) {
  try {
    const { record, status } = await web5.dwn.records.create(request)
    return { record, status }
  } catch (e: any) {
    throw Error(e)
  }
}

export async function readRecord(request: RecordsReadRequest) {
  try {
    const { record, status } = await web5.dwn.records.read(request)
    return { record, status }
  } catch (e: any) {
    throw Error(e)
  }
}

export async function updateRecord(record: Record, options: RecordUpdateOptions) {
  try {
    const { status } =  await record.update(options);
    return { status }
  } catch (e: any) {
    throw Error(e)
  }
}

export async function deleteRecord(request: RecordsDeleteRequest) {
  try {
    const { status } = await web5.dwn.records.delete(request)
    return { status }
  } catch (e: any) {
    throw Error(e)
  }
}

export async function queryRecords(request: RecordsQueryRequest) {
  try {
    const { records } = await web5.dwn.records.query(request)
    return records
  } catch (e: any) {
    throw Error(e)
  }
}

export async function configureProtocol(request: ProtocolsConfigureRequest) {
  try {
    const { protocol } = await web5.dwn.protocols.configure(request)
    return protocol
  } catch (e: any) {
    throw Error(e)
  }
}

export async function queryProtocols(request: ProtocolsQueryRequest) {
  try {
    const { protocols } = await web5.dwn.protocols.query(request)
    return protocols
  } catch (e: any) {
    throw Error(e)
  }
}