import React from 'react'

export const InputButton: React.FunctionComponent<{
  label: string
  title?: string
  primary?: boolean
  onClick?: () => void
}> = (props) => {
  return (
    <button
      type='button'
      className={`btn ${props.primary ? 'btn-dark' : 'btn-outline-dark'} btn-sm`}
      onClick={props.onClick}
      title={props.title} // TODO: mudar, renderizar uma nova box no :hover para aparecer imediatamente esse texto, definir essa box com um dark blur background; (background-color: rgba(245,245,247,0.72); backdrop-filter: saturate(180%) blur(20px); (https://css-tricks.com/almanac/properties/b/backdrop-filter/) (https://v5.getbootstrap.com/docs/5.0/components/tooltips/)
    >
      {props.label || 'no label'}
    </button>
  )
}

/*
// TODO: melhor primary version
const Button = styled.button<{ primary: boolean }>`
  user-select: none;
  text-decoration: none;
  text-align: center;
  font-size: 1em;
  padding: 0.35em 1.2em;
  margin: 0.5em 0.2em;
  border-radius: 0.4em;
  color: ${(props) => (props.primary ? '#fff' : 'var(--text-color)')};
  background-color: ${(props) =>
    props.primary ? '#000' : 'var(--foreground)'};
  border: 0.05em solid var(--foreground-accent);

  &:focus {
    outline: 0;
  }

  &:hover {
    background-color: var(--foreground-hover);
  }
`
*/
