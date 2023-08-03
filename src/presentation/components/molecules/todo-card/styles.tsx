import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  font-family: 'Shadows Into Light', cursive;
  color: #212121;

  div {
    &:hover {
      opacity: 0.5;
    }

    &.shrink {
      width: calc(100% - 6rem);
    }

    cursor: pointer;

    width: calc(100% - 3rem);

    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

export const CheckboxWrapper = styled.span`
  padding: 0 1rem;

  div {
    width: 1rem;
  }
`;

export const ActionWrapper = styled.span`
  margin-top: 0.5rem;

  padding: 0 0.75rem;
`;
