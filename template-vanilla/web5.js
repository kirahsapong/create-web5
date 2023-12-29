import Web5 from "@web5/api/browser";

// comment here
export async function setupWeb5() {
  const { web5, did } = await Web5.connect();
  console.log(web5, did)
}

export async function writeRecord() {
  const { records } = await web5.dwn.records.write({
    data: ""
  })
}

export async function readRecord() {
  const { records } = await web5.dwn.records.read({
    message: {
      filter: {
        recordId: "",
      }
    },
  })
}

export async function updateRecord(record, data) {
  await record.update(data)
}

export async function deleteRecord(record) {
  await record.delete()
}

export async function queryRecords() {
  const { records } = await web5.dwn.records.query({
    message: {
      filter: {},
    },
  })
}