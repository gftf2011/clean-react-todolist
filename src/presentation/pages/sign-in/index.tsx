import React from 'react'
import { CustomLogoComponent } from '@/presentation/components/logo'


import '@/presentation/pages/sign-in/style/style.scss'

export const SignInPage: React.FC<any> = () => {
  return (<>
    <main className='vw-100 vh-100 flex-column flex-x-center flex-y-center pv-6'>
      <div className='form-container w-auto w-auto flex-column flex-x-center flex-y-center p-4'>
        <CustomLogoComponent className='mv-6' />
        <form className='w-auto flex-column flex-x-center flex-y-center'>
          <div className='form-group mv-3'>
            <label className='col-form-label mb-1'>E-mail</label>
            <input className='form-control form-control-md' type='email' placeholder='example@mail.com' />
          </div>
          <div className='form-group mv-3'>
            <label className='col-form-label mb-1'>Password</label>
            <input className='form-control form-control-md' type='password' placeholder='123456' />
          </div>
          <button className='w-auto btn-primary txt-c-light pv-1 mt-3'>Submit</button>
        </form>
      </div>
    </main>
  </>)
}