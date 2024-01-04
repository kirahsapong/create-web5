import { Web5 } from "@web5/api/browser";

export let web5, did;

export async function setupWeb5() {
  try {
    ({web5, did} = await Web5.connect());
  } catch (e) {
    throw Error(e)
  }
}

export async function createRecord() {
  try {
    const { record } = await web5.dwn.records.create({
      data: ""
    })
    return record
  } catch (e) {
    throw Error(e)
  }
}

export async function readRecord() {
  try {
    const { record } = await web5.dwn.records.read({
      message: {
        filter: {
          recordId: ""
        }
      },
    })
    return record
  } catch (e) {
    throw Error(e)
  }
}

export async function updateRecord(record, data) {
  try {
    return await record.update(data)
  } catch (e) {
    throw Error(e)
  }
}

export async function deleteRecord(record) {
  try {
    return await record.delete()
  } catch (e) {
    throw Error(e)
  }
}

export async function queryRecords() {
  try {
    const { records } = await web5.dwn.records.query({
      message: {
        filter: {
          dataFormat: "application/json"
        },
      },
    })
    return records
  } catch (e) {
    throw Error(e)
  }
}

export async function configureProtocol() {
  try {
    const { records } = await web5.dwn.protocols.configure({
      message: {
        protocolDefinition: {}
      },
    })
    return records
  } catch (e) {
    throw Error(e)
  }
}

export async function queryProtocols() {
  try {
    const { protocols } = await web5.dwn.protocols.query({
      message: {
        filter: {},
      },
    })
    return protocols
  } catch (e) {
    throw Error(e)
  }
}