import {
  LinkedInLink,
  GithubLink,
  TwitterLink,
  InstagramLink,
} from '@/presentation/components/molecules'

import './styles.scss'

export const Footer: React.FC = () => {
  return (
    <footer>
      <div className='footer-wrapper'>
        <p>Developed by Gabriel Ferrari Tarallo Ferraz</p>
        <ul>
          <li key='footer:list_item:social_media:linkedin'>
            <LinkedInLink />
          </li>
          <li key='footer:list_item:social_media:github'>
            <GithubLink />
          </li>
          <li key='footer:list_item:social_media:twitter'>
            <TwitterLink />
          </li>
          <li key='footer:list_item:social_media:instagram'>
            <InstagramLink />
          </li>
        </ul>
      </div>
    </footer>
  )
}