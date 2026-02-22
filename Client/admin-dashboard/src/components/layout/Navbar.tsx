import {Menu} from 'lucide-react'
 

interface NavbarProps{
    openSidebar: ()=> void
}

const Navbar=({openSidebar}: NavbarProps)=>{
 
 
    return(
         <header className='flex items-center justify-between    px-4 py-3'>
<button onClick={openSidebar} className='md:hidden'>
    <Menu/>
</button>
<div className="ml-auto flex items-center gap-4">
         

      
      </div>
         </header>
    )

}

export default Navbar