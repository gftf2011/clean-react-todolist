import React from 'react'
import { CustomHeaderComponent } from '@/presentation/components/header'
import hero from '@/presentation/assets/hero-background.svg'

import '@/presentation/pages/home/style/style.scss'

export const HomePage: React.FC<any> = () => {
  return (<>
    <CustomHeaderComponent simplified={false} />
    <main className='vw-100 mv-6'>
      <section className='container flex-column flex-x-center flex-y-center ph-2'>
        <h2 className='mb-6'>Organize your daily basis with a simple and clean TODOLIST</h2>
        <img id='hero' src={hero} alt='image from a person checking their todolist tasks' />
      </section>
    </main>
  </>)
}