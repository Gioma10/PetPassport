import Input from './Input';

export default function Register({selectIsLogin}){
    return (
        <div className='flex flex-col justify-center items-center gap-10 '>
            <div className='flex justify-center items-center flex-col gap-2'>
                <h2 className='text-4xl'>Benvenuto</h2>
                <p className='text-sm'>Registriamoci insieme e realizza il tuo passaporto !!!</p>
            </div>
            <form action="">
                <div className='flex flex-col gap-10'>
                    <div className='flex flex-col gap-4'>
                        <div className='flex justify-center gap-2'>
                            <Input 
                            label='Nome utente'
                            type='text'
                            />
                            <Input 
                            label='Email'
                            type='email'
                            />
                        </div>
                        <div className='flex justify-center gap-2'>
                            <Input 
                            label='Password'
                            type='password'
                            />
                            <Input 
                            label='Conferma Password'
                            type='password'
                            />
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <button className='border border-[#6B4F4F] px-2 py-1 rounded-xl' type='submit'>Registrati</button>
                    </div>
                    <div className='text-sm flex gap-2'>
                        <p>Sei già registrato?</p>
                        <button 
                            type='button'
                            onClick={selectIsLogin}
                            className='border-b-2 border-transparent hover:border-[#6B4F4F]'>Accedi</button>
                    </div>
                </div>
            </form>
        </div>
    )
}