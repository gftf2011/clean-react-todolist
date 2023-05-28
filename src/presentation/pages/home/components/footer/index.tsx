import styled from 'styled-components'

const Footer = styled.footer`
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  min-height: 48px;
  background-color: #1ca4c9;
`

const FooterSection = styled.section`
  padding: 4px 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1280px;
`

const Paragraph = styled.p`
  color: #ffffff;
  font-family: 'Shadows Into Light', cursive;
`

const Anchor = styled.a`
  color: #ffffff;
  &:hover {
    color: #232323;
  }
`

export const FooterComponent: React.FC = () => (
  <Footer>
    <FooterSection>
      <Paragraph>Made with lots of love 😍 by <Anchor href='https://www.linkedin.com/in/gabriel-ferrari-tarallo-ferraz'>Gabriel Ferrari Tarallo Ferraz</Anchor></Paragraph>
    </FooterSection>
  </Footer>
)
