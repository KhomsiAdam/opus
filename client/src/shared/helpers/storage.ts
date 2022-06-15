const set = (key: string, value: string) => localStorage.setItem(key, value)
const get = (key: string) => localStorage.getItem(key)
const remove = (key: string) => localStorage.removeItem(key)
const clear = () => localStorage.clear()

const storage = {
  set,
  get,
  remove,
  clear,
}

export default storage
