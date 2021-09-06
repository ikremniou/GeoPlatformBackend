function gql(string) {
  return string.raw[0];
}

export const playgroundQuery = gql`
query Worker_GetAll {
  workers {
    id
    firstName
    middleName
    lastName
	}
}

query Worker_GetById {
  worker(id: 1) {
    id
    firstName
    middleName
    lastName
  }
}

mutation Worker_CreateNew {
  createWorker(createWorkerInput: {
    firstName: "Ilya"
    middleName: "Kremniou"
    lastName: "Alexandrovich"
  }) {
    firstName
  }
}
`