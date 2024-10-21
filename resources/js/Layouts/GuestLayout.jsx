import ApplicationLogo from '@/Components/ApplicationLogo';
import WebNav from '@/Components/WebNav';
import { Link ,usePage} from '@inertiajs/react';

export default function Guest({ children }) {
    
    const requestedUrl = usePage().url;
    
    return (
        <>
            <header>
                <WebNav></WebNav>
            </header>
            {
                (requestedUrl === '/') ? ( 
                    <div> {children}</div>
                ) :(
                    <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
                        <div>
                            <Link href="/">
                                <ApplicationLogo className="w-20 fill-current text-gray-500" />
                            </Link>
                        </div> 
                        <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                            {children}
                        </div>
                   </div>
                )
            }
       
        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
            Laravel ...
        </footer>
    </>
    );
}
