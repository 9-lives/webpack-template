import axios from 'axios'

async function get({
  params,
  url,
}) {
  return await axios.get(url, {
    params,
  })
}

async function post({
  params,
  url,
}) {
  return await axios.post(url, params)
}

export const ajax = {
  get,
  post,
}
