import {createSignal, Component, JSX, For} from "solid-js";
import { BsSortDownAlt } from "solid-icons/bs";
import { BsSortDown } from "solid-icons/bs";
import styles from "./Search.module.scss";


type TProps = {
  placeholder: string,
  items: Array<string>
}
export const Search: Component<TProps> = (props) => {
  const [value, setValue] = createSignal('')
  const [sortVariant, setSortVariant] = createSignal(true)
  const sortedItems = () => {
    const sorted = [...props.items].sort((a, b) =>
        sortVariant() ? a.localeCompare(b) : b.localeCompare(a)
    )
    return sorted.filter((item) => item.toLowerCase().includes(value().toLowerCase()));
  }
  const handleSortToggle = () => {
    setSortVariant(!sortVariant())
  }
  const handleSearchChange:JSX.EventHandlerUnion<HTMLInputElement, InputEvent> = (e) => {
    setValue(e.currentTarget.value)
  }

  return (
      <div class={styles.container}>
        <div class={styles.inputContainer}>
          <input
              type="search"
              class={styles.input}
              placeholder={props.placeholder}
              value={value()}
              onInput={handleSearchChange}
          />
          <button type="button" class={styles.button} onClick={handleSortToggle}>
            {sortVariant() ? <BsSortDownAlt size={24} /> : <BsSortDown size={24} />}
          </button>
        </div>
        <div class={styles.list}>
          <For each={sortedItems()}>
            {(item) => <div class={styles.item}>{item}</div>}
          </For>
        </div>
      </div>
  );
};