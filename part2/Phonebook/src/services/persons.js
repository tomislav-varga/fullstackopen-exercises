import axios from "axios";

const baseURL = '/api/persons'

const getAll = () => {
    const promise = axios.get(baseURL)
    return promise.then(response => response.data)
  }

const create = newObject => {
    const promise = axios.post(baseURL,newObject)
    return promise.then(response => response.data)
}

const deletePerson = id => {
    const promise = axios.delete(`${baseURL}/${id}`)
    return promise.then(response => response.data)
}

const updateNumber = (id, newNumber) => {
    const promise = axios.put(`${baseURL}/${id}`,newNumber)
    return promise.then(response => response.data)
}

export default {
    getAll,
    create,
    deletePerson,
    updateNumber
}