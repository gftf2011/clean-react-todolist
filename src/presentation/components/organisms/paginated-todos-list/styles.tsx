import styled from 'styled-components'

export const ListWrapper = styled.ul`
  list-style: none;

  width: 100%;

  max-height: 480px;

  overflow: scroll;
`

export const ListItem = styled.li`
  width: 100%;

  border-radius: 0.25rem;

  background-color: #fafafa;

  padding: 0.5rem;
  margin-bottom: 0.5rem;

  &:last-child {
    margin-bottom: 1rem;
  }
`
