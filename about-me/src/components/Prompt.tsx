import './Prompt.css';

interface Props {
  user: string;
  command?: string;
  /** Show a blinking block cursor after the command. */
  cursor?: boolean;
}

/** Decorative shell prompt line that introduces each section. Hidden from assistive tech. */
export default function Prompt({ user, command, cursor = false }: Props) {
  return (
    <p className="prompt" aria-hidden="true">
      <span className="prompt__user">{user}@portfolio</span>
      <span className="prompt__sep">:</span>
      <span className="prompt__path">~</span>
      <span className="prompt__sigil">$</span>
      {command && <span className="prompt__cmd"> {command}</span>}
      {cursor && <span className="cursor" />}
    </p>
  );
}
