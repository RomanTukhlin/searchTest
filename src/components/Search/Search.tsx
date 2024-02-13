import {createSignal, Component, JSX, createEffect, on, Show, For} from "solid-js";
import { BsSortDownAlt } from "solid-icons/bs";
import { BsSortDown } from "solid-icons/bs";
import styles from "./Search.module.scss";


type TProps = {
  placeholder: string,
  items: Array<string>
}
export const Search: Component<TProps> = (props) => {
  const [value, setValue] = createSignal('')
  const [filterItems, setFilterItems] = createSignal(props.items)
  const [sortVariant, setSortVariant] = createSignal(true)


  createEffect(() => {
    setFilterItems(() => searchFilter(value(), props.items))
    setFilterItems((current) => sortItems( sortVariant() ,current))
  })
  const sortItems = (rev: boolean, items: Array<string>) => {
    return [...items].sort((a, b) => (rev ? a.localeCompare(b) : b.localeCompare(a)))
  }
  const searchFilter = (value: string, items: Array<string>) => {
    return items.filter((item) => item.toLowerCase().includes(value))
  }
  return <div class={styles.container}>
    <div class={styles.inputContainer}>
      <input type="search" class={styles.input}
             placeholder={props.placeholder}
             onInput={(e) => setValue(e.target.value.toLowerCase())}
             value={value()}
      />
      <button
          type={'button'}
          class={styles.button}
          onClick={() => setSortVariant((current) => !current)}>
        {sortVariant() ? <BsSortDownAlt size={24}/> : <BsSortDown size={24}/>}
      </button>
    </div>
    <div class={styles.list}>
      <Show when={filterItems()}>
        <For each={filterItems()}>{item => <div class={styles.item}>{item}</div>}</For>
      </Show>
    </div>
  </div>;
};
