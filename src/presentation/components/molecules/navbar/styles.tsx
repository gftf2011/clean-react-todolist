import styled from 'styled-components';

export const NavigationWrapper = styled.nav`
  width: 100%;
  display: block;

  ul {
    width: 100%;
    list-style: none;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    li {
      width: 100%;
      padding: 0 0.25rem 0 0.25rem;

      &:first-child {
        padding: 0 0.25rem 0 0.5rem;
      }

      &:last-child {
        padding: 0 0.5rem 0 0.25rem;
      }
    }

    &.row {
      flex-direction: row;

      li {
        &:first-child {
          padding: 0 0.25rem 0 0.5rem;
        }

        &:last-child {
          padding: 0 0.5rem 0 0.25rem;
        }
      }
    }

    &.column {
      flex-direction: column;

      li {
        padding: 0.25rem 0.25rem 0.25rem 0.25rem;

        &:first-child {
          padding: 0.5rem 0.25rem 0.25rem 0.25rem;
        }

        &:last-child {
          padding: 0.25rem 0.25rem 0.5rem 0.25rem;
        }
      }
    }
  }
`;
