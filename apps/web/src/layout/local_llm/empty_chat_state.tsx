import * as styles from "./empty_chat_state.css";

interface EmptyChatStateProps {
  description?: string;
}

export function EmptyChatState({ description }: Readonly<EmptyChatStateProps>) {
  return (
    <div className={styles.wrap}>
      <span className={styles.sparkle} aria-hidden="true">
        auto_awesome
      </span>
      <h3 className={styles.heading}>Start a conversation</h3>
      {description ? <p className={styles.description}>{description}</p> : null}
    </div>
  );
}
