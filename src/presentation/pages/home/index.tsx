import React from 'react'
import { useSelector } from 'react-redux'
import { CustomHeaderComponent } from '@/presentation/components/header'
import hero from '@/presentation/assets/hero-background.svg'

import '@/presentation/pages/home/style/style.scss'

export const HomePage: React.FC<any> = () => {
  const isActive: boolean = useSelector((state: any) => state.dropdownMenu.isActive);

  return (<>
    <CustomHeaderComponent />
    <main className={`flex-column flex-x-center flex-y-center vw-100 pv-6 ${isActive ? 'navigation-expanded' : ''}`}>
      <section className='container v-auto flex-column flex-x-center flex-y-center ph-2'>
        <img className='v-auto' src={hero} alt='image from a person checking their todolist tasks' />
      </section>
    </main>
  </>)
}