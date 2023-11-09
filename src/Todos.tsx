import { createSignal } from "solid-js"

export default function Todos() {
  const [todos, setTodos] = createSignal<
    { id: string; text: string; done: boolean }[]
  >([])

  const [inputText, setInputText] = createSignal("")

  function addTodo(text: string) {
    const _text = text.trim()
    if (_text.length === 0) return false
    setTodos(v =>
      v.concat({ id: Date.now().toString(), text: _text, done: false })
    )
    return true
  }

  return (
    <>
      <h1>Todos</h1>
      <div>
        <input
          type="text"
          value={inputText()}
          onInput={e => {
            setInputText(e.currentTarget.value)
          }}
          placeholder="What needs to be done?"
          onKeyDown={e => {
            if (e.key === "Enter") {
              if (addTodo(e.currentTarget.value)) {
                setInputText("")
              }
            }
          }}
        />
      </div>

      <div>
        <ul>
          {todos().map((todo, index) => (
            <li id={todo.id}>
              <input
                type="checkbox"
                checked={todo.done}
              />
              <span>{todo.text}</span>
              <button
                onClick={() => {
                  setTodos(todos => todos.filter((_, idx) => idx !== index))
                }}
              >
                del
              </button>
            </li>
          ))}
        </ul>
      </div>

      {todos().length > 0 && (
        <div>
          <span>{todos().filter(i => !i.done).length} items left </span>
        </div>
      )}
    </>
  )
}
